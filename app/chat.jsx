import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatBubble from "../components/ChatBubble";
import InputBar from "../components/InputBar";
import QuickSuggestions from "../components/QuickSuggestions";

import { sendChatMessage } from "../services/api";
import { useChatStore } from "../store/useChatStore";
import LottieView from "lottie-react-native";

const ChatScreen = () => {
  const flatListRef = useRef(null);
  
  const {
    messages,
    addMessage,
    loading,
    setLoading,
    personality,
    usageDays,
    lifestyle,
  } = useChatStore();

  // Auto-scroll when messages change
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, loading]);

  const handleSend = async (text) => {
    if (!text) return;

    addMessage({ role: "user", text });
    setLoading(true);

    try {
      const response = await sendChatMessage({
        personality,
        usageDays,
        lifestyle,
        question: text,
      });

      addMessage({ role: "ai", text: response.reply });
    } catch {
      Alert.alert("Error", "Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  // Create data array that includes typing indicator when loading
  const chatData = loading
    ? [...messages, { role: "typing", text: "" }]
    : messages;

  const renderChatItem = ({ item }) => {
    if (item.role === "typing") {
      return (
        <View style={styles.messageContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/4712/4712027.png",
            }}
            style={styles.avatar}
          />
          <View style={styles.bubble}>
            <LottieView
              source={require("../assets/animations/Typing.json")}
              autoPlay
              loop
              style={{
                width: 80,
                height: 50,
                transform: [{ scale: 1.9 }],
              }}
            />
          </View>
        </View>
      );
    }
    return <ChatBubble message={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {messages.length === 0 && !loading && (
          <QuickSuggestions onSelect={handleSend} />
        )}
        <FlatList
          ref={flatListRef}
          data={chatData}
          keyExtractor={(item, index) =>
            item.role === "typing" ? "typing" : index.toString()
          }
          renderItem={renderChatItem}
          contentContainerStyle={styles.list}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        <InputBar onSend={handleSend} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  keyboardView: {
    flex: 1,
  },
  list: {
    padding: 12,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 4,
    marginHorizontal: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  bubble: {
    backgroundColor: "#F7E8D3",
    borderRadius: 16,
    maxWidth: "75%",
  },
});
