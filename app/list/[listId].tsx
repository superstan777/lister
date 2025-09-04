import { DeviceList } from "@/components/DeviceList";
import { RoundButton } from "@/components/RoundButton";
import { useDevices } from "@/hooks/useDevices";
import { setQrData } from "@/utility/qrCache";
import { Link, Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { View } from "react-native";

export default function ListScreen() {
  const { listId: listIdParam, name } = useLocalSearchParams();
  const listId = Number(listIdParam);
  const [containerHeight, setContainerHeight] = useState(0);

  const { devices, loadData, handleDelete } = useDevices(listId);

  useFocusEffect(
    useCallback(() => {
      if (listId) loadData();
    }, [listId, loadData])
  );

  const handleExport = () => {
    if (devices.length === 0) {
      setQrData("");
      return;
    }
    const data = `${name} :\n${devices.map((d) => d.serial).join("\n")}`;
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

      <DeviceList
        devices={devices}
        handleDelete={handleDelete}
        containerHeight={containerHeight}
      />

      <Link href={{ pathname: "/cameraScreen", params: { listId } }} asChild>
        <RoundButton type="scan" placement="right" />
      </Link>

      <Link href={{ pathname: "/exportScreen" }} asChild>
        <RoundButton type="export" onPress={handleExport} placement="left" />
      </Link>
    </View>
  );
}
