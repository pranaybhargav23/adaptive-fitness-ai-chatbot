import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useChatStore } from "../store/useChatStore.js";
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from "../utlis/responsive.js";

const Header = ({ title = "AIBOT", onSettingsPress, onClearChat }) => {
  const router = useRouter();

  const { rewardCoins } = useChatStore();
  const [showModal, setShowModal] = useState(false);

  const handleMenuPress = () => {
    setShowModal(!showModal);
  };

  const handleMenuItemPress = (action) => {
    setShowModal(false);
    if (action === "history") {
      router.push("/history");
    } else if (action === "clear" && onClearChat) {
      onClearChat();
    }
  };

  return (
    <View>
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

        <Text style={styles.headerTitle}>{title}</Text>

        <TouchableOpacity style={styles.headerButton} onPress={handleMenuPress}>
          <Ionicons name="ellipsis-vertical" size={20} color="#1F2937" />
        </TouchableOpacity>
      </LinearGradient>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => handleMenuItemPress("coins")}
            >
              <Text style={styles.coinEmoji}>🪙</Text>
              <Text style={styles.modalText}>Coins : {rewardCoins}</Text>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => handleMenuItemPress("history")}
            >
              <Ionicons name="time-outline" size={18} color="#1F2937" />
              <Text style={styles.modalText}>History</Text>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => handleMenuItemPress("clear")}
            >
              <Ionicons name="trash-outline" size={18} color="#1F2937" />
              <Text style={styles.modalText}>Clear Chat</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.8),

    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  headerButton: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    justifyContent: "center",
    alignItems: "center",
  },

  backArrow: {
    fontSize: responsiveFont(2),
    color: "#374151",
    fontWeight: "bold",
  },

  headerTitle: {
    fontSize: responsiveFont(2),
    fontWeight: "bold",
    color: "#1F2937",
    letterSpacing: responsiveWidth(0.3),
  },

  settingsIcon: {
    fontSize: responsiveFont(1.8),
    color: "#374151",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },

  modalContent: {
    position: "absolute",
    top: responsiveHeight(6.5),
    right: responsiveWidth(4),
    backgroundColor: "#FFFFFF",
    borderRadius: responsiveWidth(3),
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    minWidth: responsiveWidth(45),
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(3),
  },

  modalText: {
    fontSize: responsiveFont(1.6),
    color: "#1F2937",
    marginLeft: responsiveWidth(3),
    fontWeight: "500",
    flex: 1,
  },

  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: responsiveWidth(2),
  },

  coinEmoji: {
    fontSize: 18,
  },
});

export default Header;
