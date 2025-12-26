import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import { useState } from "react";

const InputBar = ({ onSend }) => {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Ask something about fitness..."
        style={styles.input}
      />
      <Pressable
        style={styles.sendButton}
        onPress={() => {
          onSend(text);
          setText("");
        }}
      >
        <Text style={styles.sendText}>Send</Text>
      </Pressable>
    </View>
  );
};

export default InputBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: "center",
  },
  sendText: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
