import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type HeaderButtonType = "back" | "add" | "close";

type HeaderButtonProps = {
  type: HeaderButtonType;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
};

export const HeaderButton = ({ type, onPress, style }: HeaderButtonProps) => {
  let iconName: "arrow-back-outline" | "add-outline" | "close-outline";

  switch (type) {
    case "back":
      iconName = "arrow-back-outline";
      break;
    case "add":
      iconName = "add-outline";
      break;
    case "close":
      iconName = "close-outline";
      break;
    default:
      iconName = "arrow-back-outline";
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Ionicons name={iconName} size={20} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
