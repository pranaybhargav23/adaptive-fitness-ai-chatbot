import { Image, StyleSheet, Text, View } from "react-native";
import { responsiveWidth, responsiveHeight, responsiveFont } from "../utlis/responsive.js";

export default function ChatBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <View style={[
      styles.messageContainer,
      isUser ? styles.userMessageContainer : styles.botMessageContainer
    ]}>
      {!isUser && (
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4712/4712027.png' }} 
          style={styles.avatar} 
        />
      )}

      <View style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.botBubble
      ]}>
        <Text style={[
          styles.text,
          isUser ? styles.userText : styles.botText
        ]}>
          {message.text}
        </Text>
      </View>

      {isUser && (
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
          style={styles.avatar} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: responsiveHeight(0.6),
    marginHorizontal: responsiveWidth(2),
  },

  userMessageContainer: {
    justifyContent: "flex-end",
  },

  botMessageContainer: {
    justifyContent: "flex-start",
  },

  avatar: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    borderRadius: responsiveWidth(4),
    marginHorizontal: responsiveWidth(2),
  },

  bubble: {
    maxWidth: "70%",
    paddingVertical: responsiveHeight(1.2),
    paddingHorizontal: responsiveWidth(3),
    borderRadius: responsiveWidth(4.5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },

  userBubble: {
    backgroundColor: "#FF8C00",
    borderBottomRightRadius: responsiveWidth(1),
  },

  botBubble: {
    backgroundColor: "#F7E8D3",
    borderBottomLeftRadius: responsiveWidth(1),
  },

  text: {
    fontSize: responsiveFont(1.8),
    lineHeight: responsiveFont(2.4),
  },

  userText: {
    color: "#FFFFFF",
  },

  botText: {
    color: "#000000",
  },
});
