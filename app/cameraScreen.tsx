import { RoundButton } from "@/components/RoundButton";
import { addDevice, getDevices } from "@/database/dbFunctions";
import { deviceType } from "@/types/deviceType";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type ToastMessage = {
  type: "success" | "error";
  text1: string;
  text2: string;
};

export default function CameraScreen() {
  const { top } = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const scannedSet = useRef<Set<string>>(new Set());
  const lastScanTime = useRef<number | null>(null);
  const navigation = useNavigation();
  const { listId } = useLocalSearchParams<{ listId: string }>();

  const [toastQueue, setToastQueue] = useState<ToastMessage[]>([]);
  const isToastShowing = useRef(false);

  useEffect(() => {
    if (!listId) return;

    (async () => {
      try {
        const existingDevices = (await getDevices(
          Number(listId)
        )) as deviceType[];
        scannedSet.current = new Set(existingDevices.map((d) => d.serial));
      } catch (error) {
        console.error("Error loading devices:", error);
      }
    })();
  }, [listId]);

  useEffect(() => {
    if (toastQueue.length > 0 && !isToastShowing.current) {
      isToastShowing.current = true;
      const { type, text1, text2 } = toastQueue[0];
      Toast.show({
        type,
        text1,
        text2,
        onHide: () => {
          isToastShowing.current = false;
          setToastQueue((prev) => prev.slice(1));
        },
        visibilityTime: 1500,
      });
    }
  }, [toastQueue]);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>
          We need your permission to access the camera.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const enqueueToast = (message: ToastMessage) => {
    setToastQueue((prev) => [...prev, message]);
  };

  const handleCodeScanned = async ({ data }: { data: string }) => {
    const now = Date.now();

    if (lastScanTime.current && now - lastScanTime.current < 1000) {
      return;
    }
    lastScanTime.current = now;

    if (scannedSet.current.has(data)) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      enqueueToast({
        type: "error",
        text1: "Code is alredy in database",
        text2: data,
      });
      return;
    }

    try {
      await addDevice(Number(listId), data);
      scannedSet.current.add(data);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      enqueueToast({
        type: "success",
        text1: "Code has been added",
        text2: data,
      });
    } catch (error) {
      console.error("Error saving device:", error);
      enqueueToast({
        type: "error",
        text1: "Error",
        text2: "Failed to save device",
      });
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "code128",
            "code39",
            "ean13",
            "ean8",
            "upc_a",
            "upc_e",
            "code93",
            "datamatrix",
          ],
        }}
        onBarcodeScanned={handleCodeScanned}
      />

      <RoundButton
        type="close"
        onPress={() => navigation.goBack()}
        placement="mid"
      />

      <Toast
        position="top"
        topOffset={top + 10} // dajemy 10 px odstępu pod notch
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  message: { textAlign: "center", paddingBottom: 10 },
  camera: { flex: 1 },
});
