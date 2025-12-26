import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatBubble from "../components/ChatBubble";
import InputBar from "../components/InputBar";
import QuickSuggestions from "../components/QuickSuggestions";
import { sendChatMessage } from "../services/api";
import { useChatStore } from "../store/useChatStore";

const ChatScreen = () => {
  const {
    messages,
    addMessage,
    loading,
    setLoading,
    personality,
    usageDays,
    lifestyle,
  } = useChatStore();

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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {messages.length === 0 && <QuickSuggestions onSelect={handleSend} />}
        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <ChatBubble message={item} />}
          contentContainerStyle={styles.list}
          
        />
        {loading && <ActivityIndicator style={{ marginBottom: 8 }} />}
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
});
