import { DeviceItem } from "@/components/DeviceItem";
import { EmptyList } from "@/components/EmptyList";
import { ListHiddenItem } from "@/components/ListHiddenItem";
import { RoundButton } from "@/components/RoundButton";
import { deleteDevice, getDevices } from "@/database/dbFunctions";
import { deviceType } from "@/types/deviceType";
import { setQrData } from "@/utility/qrCache";
import { Link, Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

export default function ListScreen() {
  const { listId: listIdParam, name } = useLocalSearchParams();
  const listId = Number(listIdParam);
  const [devices, setDevices] = useState<deviceType[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);

  const emptyOpacity = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      if (listId) loadData();
    }, [listId])
  );
  const loadData = async () => {
    try {
      const result = await getDevices(listId);
      setDevices(result);
    } catch (error) {
      console.error("Error loading devices:", error);
      setDevices([]);
    }
  };

  useEffect(() => {
    if (devices.length === 0) {
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
  }, [devices, emptyOpacity]);

  const handleDelete = async (id: number) => {
    await deleteDevice(id);
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  const handleExport = () => {
    if (devices.length === 0) {
      setQrData("");
      return;
    }

    const data = `${name}:\n${devices.map((d) => d.serial).join("\n")}`;
    setQrData(data);
  };

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      <Stack.Screen
        options={{ headerTitle: typeof name === "string" ? name : "Devices" }}
      />

      <SwipeListView
        data={devices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DeviceItem device={item} />}
        renderHiddenItem={({ item }) => (
          <ListHiddenItem onDelete={() => handleDelete(item.id)} />
        )}
        rightOpenValue={-80}
        disableRightSwipe
        ListHeaderComponent={
          devices.length > 0 ? (
            <View style={styles.headerInfo}>
              <Text style={styles.headerText}>
                {devices.length} {devices.length === 1 ? "item" : "items"}
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
        contentContainerStyle={
          devices.length === 0
            ? {
                padding: 16,
                marginTop: containerHeight / 2 - 100,
              }
            : { padding: 16, gap: 8 }
        }
        ListEmptyComponent={
          <Animated.View pointerEvents="none" style={{ opacity: emptyOpacity }}>
            <EmptyList
              text="No Devices"
              bottomText="Scan code to add device to the list"
            />
          </Animated.View>
        }
      />

      <Link
        href={{
          pathname: "/cameraScreen",
          params: { listId },
        }}
        asChild
      >
        <RoundButton type="scan" placement="right" />
      </Link>

      <Link
        href={{
          pathname: "/exportScreen",
        }}
        asChild
      >
        <RoundButton type="export" onPress={handleExport} placement="left" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  headerInfo: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#f2f2f7",
    borderRadius: 8,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#777",
  },
});
