import { EmptyList } from "@/components/EmptyList";
import { ListHiddenItem } from "@/components/ListHiddenItem";
import { ListItem } from "@/components/ListItem";
import { deleteList, getLists } from "@/database/dbFunctions";
import { listType } from "@/types/listType";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

export default function Index() {
  const [lists, setLists] = useState<listType[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);
  const emptyOpacity = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      const result = await getLists();
      setLists(result);
    } catch (error) {
      console.error("Error loading lists:", error);
      setLists([]);
    }
  };

  useEffect(() => {
    if (lists.length === 0) {
      Animated.timing(emptyOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(emptyOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [lists, emptyOpacity]);

  const handleDelete = async (id: number) => {
    await deleteList(id);
    loadData();
  };

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      <SwipeListView
        contentInsetAdjustmentBehavior="automatic"
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListItem list={item} />}
        renderHiddenItem={({ item }) => (
          <ListHiddenItem onDelete={() => handleDelete(item.id)} />
        )}
        rightOpenValue={-80}
        disableRightSwipe
        contentContainerStyle={
          lists.length === 0
            ? [
                styles.emptyListContainer,
                { marginTop: containerHeight / 2 - 200 },
              ]
            : styles.listContainer
        }
        ListEmptyComponent={
          <Animated.View pointerEvents="none" style={{ opacity: emptyOpacity }}>
            <EmptyList
              text="No Lists"
              bottomText="Tap the button in the top right to create one"
            />
          </Animated.View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyListContainer: {
    padding: 16,
  },
  listContainer: {
    padding: 16,
    gap: 8,
  },
});
