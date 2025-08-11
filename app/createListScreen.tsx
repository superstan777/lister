import { addList } from "@/database/dbFunctions";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function CreateListScreen() {
  const [name, setName] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardHeight(e.endCoordinates.height);
      }
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardHeight(0);
      }
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) {
      alert("List name is empty");
      return;
    }

    try {
      addList(name);
      router.back();
    } catch (error) {
      alert("Failed to create list.");
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { marginBottom: keyboardHeight }]}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>List Name</Text>
          <TextInput
            ref={inputRef}
            placeholder="Enter list name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            returnKeyType="done"
            onSubmitEditing={handleCreate}
            blurOnSubmit={false}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
