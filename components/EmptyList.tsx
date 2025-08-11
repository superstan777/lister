import React from "react";
import { StyleSheet, Text, View } from "react-native";

type EmptyListProps = {
  text: string;
  bottomText?: string;
};

export const EmptyList = ({ text, bottomText }: EmptyListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>{text}</Text>
      {bottomText && <Text style={styles.bottomText}>{bottomText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
