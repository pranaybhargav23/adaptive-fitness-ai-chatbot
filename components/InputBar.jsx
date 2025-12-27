import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFont,
} from "../utlis/responsive.js";

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
    alignItems: "center",

    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),

    backgroundColor: "#FFF7ED",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",

  
    width: "100%",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: responsiveWidth(5),

    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.2),

    backgroundColor: "#FFFFFF",
    fontSize: responsiveFont(1.8),
  },

  sendButton: {
    marginLeft: responsiveWidth(3),
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.2),

    backgroundColor: "#FF8A00",
    borderRadius: responsiveWidth(5),
  },

  sendText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: responsiveFont(1.8),
  },
});

