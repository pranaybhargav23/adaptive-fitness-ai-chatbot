import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#FFF7ED",
   borderRadius: 50,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 12,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FF8A00",
    borderRadius: 20,
  },
  sendText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
