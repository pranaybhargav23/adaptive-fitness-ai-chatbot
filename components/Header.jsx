import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from "../utlis/responsive.js";

const Header = ({ title = "AIBOT", onSettingsPress }) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMenuPress = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMenuItemPress = (action) => {
    setShowDropdown(false);
    if (action === "coins") {
      // Handle coins action
      console.log("Coins clicked");
    } else if (action === "history") {
      router.push("/history");
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

      {showDropdown && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => handleMenuItemPress("coins")}
          >
            <Text style={styles.coinEmoji}>🪙</Text>
            <Text style={styles.dropdownText}>Coins</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => handleMenuItemPress("history")}
          >
            <Ionicons name="time-outline" size={18} color="#1F2937" />
            <Text style={styles.dropdownText}>History</Text>
          </TouchableOpacity>
        </View>
      )}
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

  dropdown: {
    position: "absolute",
    top: responsiveHeight(6.5),
    right: responsiveWidth(4),
    backgroundColor: "#FFFFFF",
    borderRadius: responsiveWidth(2),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: responsiveWidth(35),
    paddingVertical: responsiveHeight(1),
    zIndex: 1000,
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
  },

  dropdownText: {
    fontSize: responsiveFont(1.8),
    color: "#1F2937",
    marginLeft: responsiveWidth(3),
    fontWeight: "500",
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
