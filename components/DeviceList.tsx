import React, { useEffect, useRef } from "react";

import { deviceType } from "@/types/deviceType";
import { Animated, StyleSheet, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { DeviceItem } from "./DeviceItem";
import { EmptyList } from "./EmptyList";
import { ListHiddenItem } from "./ListHiddenItem";

type Props = {
  devices: deviceType[];
  handleDelete: (id: number) => void;
  containerHeight: number;
};

export const DeviceList = ({
  devices,
  handleDelete,
  containerHeight,
}: Props) => {
  const emptyOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(emptyOpacity, {
      toValue: devices.length === 0 ? 1 : 0,
      duration: devices.length === 0 ? 300 : 200,
      useNativeDriver: true,
    }).start();
  }, [devices, emptyOpacity]);

  return (
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
          ? { padding: 16, marginTop: containerHeight / 2 - 100 }
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
  );
};

export const styles = StyleSheet.create({
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
