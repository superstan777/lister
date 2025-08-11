import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type RoundButtonType = "scan" | "export" | "close";

type Placement = "left" | "right" | "mid";

type RoundButtonProps = {
  type: RoundButtonType;
  placement: Placement; // obowiązkowy prop
  onPress?: (event: GestureResponderEvent) => void;
};

type IconName = "barcode-outline" | "share-outline" | "close-outline";

export const RoundButton = ({ type, placement, onPress }: RoundButtonProps) => {
  let iconName: IconName;

  switch (type) {
    case "scan":
      iconName = "barcode-outline";
      break;
    case "export":
      iconName = "share-outline";
      break;
    case "close":
      iconName = "close-outline";
      break;
    default:
      iconName = "barcode-outline";
  }

  let placementStyle: ViewStyle;

  if (placement === "right") {
    placementStyle = { position: "absolute", right: 30, bottom: 30 };
  } else if (placement === "left") {
    placementStyle = { position: "absolute", left: 30, bottom: 30 };
  } else {
    // mid
    placementStyle = {
      position: "absolute",
      left: "50%",
      marginLeft: -35,
      bottom: 30,
    };
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, placementStyle]}>
      <Ionicons name={iconName} size={28} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    width: 70,
    height: 70,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
