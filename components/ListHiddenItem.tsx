import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type HiddenDeleteButtonProps = {
  onDelete: () => void;
};

export const ListHiddenItem = ({ onDelete }: HiddenDeleteButtonProps) => {
  return (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Ionicons
          style={styles.deleteText}
          name="trash-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingRight: 0,
    marginLeft: 15,
    backgroundColor: "red",
    borderRadius: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 16,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});
