import { useEffect, useRef } from "react";
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatBubble from "../components/ChatBubble";
import Header from "../components/Header";
import InputBar from "../components/InputBar";
import QuickSuggestions from "../components/QuickSuggestions";

import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { sendChatMessage } from "../services/api";
import { useChatStore } from "../store/useChatStore";
import { responsiveHeight, responsiveWidth } from "../utlis/responsive.js";

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
    fetchChatHistory,
    clearMessages,
    fetchCurrentCoinCount
  } = useChatStore();

  // Auto-scroll when messages change
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, loading]);

   useEffect(() => {
    fetchChatHistory();
    fetchCurrentCoinCount()
   }, []);

   const handleClearChat = () => {
     Alert.alert(
       "Clear Chat",
       "Are you sure you want to clear all messages?",
       [
         {
           text: "Cancel",
           style: "cancel",
         },
         {
           text: "Clear",
           style: "destructive",
           onPress: () => {
             clearMessages();
           },
         },
       ]
     );
   };

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

  // Created data array that includes typing indicator when loading
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
                width: 70,
                height: 40,
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
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <SafeAreaView style={styles.safeAreaTop} edges={['top']}>
        <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="#fff" />
        <Header onClearChat={handleClearChat} />

        <View style={styles.contentContainer}>
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
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        </View>

        <InputBar onSend={handleSend} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  safeAreaTop: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  contentContainer: {
    flex: 1,
  },

  list: {
    flexGrow: 1,
    padding: responsiveWidth(3),
  },

  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: responsiveHeight(0.6),
    marginHorizontal: responsiveWidth(2),
  },

  avatar: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    borderRadius: responsiveWidth(4),
    marginRight: responsiveWidth(2),
  },

  bubble: {
    backgroundColor: "#F7E8D3",
    borderRadius: responsiveWidth(4),
    maxWidth: "75%",
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(3),
  },
});
