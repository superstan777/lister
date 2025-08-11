import { deviceType } from "@/types/deviceType";
import { formatDate } from "@/utility/formatDate";
import { StyleSheet, Text, View } from "react-native";

type DeviceProps = {
  device: deviceType;
};

export const DeviceItem = ({ device }: DeviceProps) => {
  const dateObj = new Date(device.created_at);
  const formattedDate = formatDate(dateObj);

  return (
    <View style={styles.container}>
      <Text style={styles.serial}>{device.serial}</Text>
      {device.created_at && <Text style={styles.date}>{formattedDate}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 15,
  },
  serial: {
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});
