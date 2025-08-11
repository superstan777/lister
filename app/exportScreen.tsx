import { RoundButton } from "@/components/RoundButton";
import { getQrData } from "@/utility/qrCache";
import * as React from "react";
import { Alert, Share, StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function ExportScreen() {
  const qrData = getQrData();
  console.log(qrData?.length);
  const handleShare = async () => {
    if (!qrData) {
      Alert.alert("No data to share", "Please scan codes first.");
      return;
    }

    try {
      await Share.share({
        message: qrData,
        title: "My exported code list",
      });
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      {qrData ? (
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Share your list</Text>
          <Text style={styles.subHeaderText}>
            This code contains your list as plain text.{"\n"}
            Scan it to get the data.
          </Text>

          <View style={styles.qrContainer}>
            <QRCode value={qrData} size={250} />
          </View>

          <Text style={styles.orText}>or send data directly</Text>

          <RoundButton type="export" onPress={handleShare} placement="mid" />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.mainText}>No data to export</Text>
          <Text style={styles.bottomText}>
            Scan codes to create export QR code
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  qrContainer: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 30,
  },
  orText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#777",
    marginBottom: 16,
    letterSpacing: 1,
    textAlign: "center",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  bottomText: {
    marginTop: 8,
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});
