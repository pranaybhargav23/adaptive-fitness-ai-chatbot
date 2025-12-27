import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatStore } from "../store/useChatStore";

const HistoryScreen = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const { history, fetchChatHistory } = useChatStore();

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchChatHistory();
    setRefreshing(false);
  };

  const renderChatItem = ({ item }) => (
    <View style={styles.chatItem}>
      <Text style={styles.chatText} numberOfLines={2}>
        {item.userMessage}
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        No chat history available.
      </Text>
      <TouchableOpacity 
        style={styles.startChatButton}
        onPress={() => router.push("/chat")}
      >
        <Text style={styles.startChatText}>Start First Chat</Text>
      </TouchableOpacity>
    </View>
  );

  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#FF8A00", "#FFB703"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color="#1F2937" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Chat History</Text>

        <View style={styles.headerButton} />
      </LinearGradient>
      <FlatList
        data={history || []}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FF8A00']}
            tintColor={'#FF8A00'}
          />
        }
      />
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    letterSpacing: 1,
  },
  listContainer: {
    padding: 16,
  },
  chatItem: {
    backgroundColor: "#DBEAFE",
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 60,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: "center",
  },
  chatText: {
    color: "#1E3A8A",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    textAlign: "left",
    textAlignVertical: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
  },
  startChatButton: {
    backgroundColor: "#FF8A00",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  startChatText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
