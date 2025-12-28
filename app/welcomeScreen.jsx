import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFont,
} from "../utlis/responsive.js";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#fff" />
      <View style={styles.container}>
        
        <Text style={styles.emoji}>🤖</Text>
        <Text style={styles.title}>FitBuddy AI</Text>
        

        <Text style={styles.text}>
          I can help you with workouts, fitness routines, and staying consistent — 
          all tailored to your goals and progress.
        </Text>

        <Text style={styles.warning}>
          ⚠️ I cannot provide medical advice, injury treatment, or medication guidance.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/chat")}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Start Chat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(4),
    backgroundColor: "#FFF7ED",
  },

  emoji: {
    fontSize: responsiveFont(3.5), 
    marginBottom: responsiveHeight(1),
  },

  title: {
    fontSize: responsiveFont(2.8),
    fontWeight: "800",
    color: "#1F2937",
    textAlign: "center",
    marginVertical: responsiveHeight(2.5),
    lineHeight: responsiveFont(3.4),
  },

  text: {
    fontSize: responsiveFont(1.8),
    lineHeight: responsiveFont(2.6),
    color: "#4B5563",
    textAlign: "center",
    marginBottom: responsiveHeight(2.5),
    marginHorizontal: responsiveWidth(4),
  },

  warning: {
    fontSize: responsiveFont(1.6),
    color: "#EF4444",
    textAlign: "center",
    marginBottom: responsiveHeight(4),
    fontStyle: "italic",
    marginHorizontal: responsiveWidth(4),
  },

  button: {
    backgroundColor: "#FF8A00",
    paddingHorizontal: responsiveWidth(8),
    paddingVertical: responsiveHeight(2.2),
    borderRadius: responsiveWidth(3),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: responsiveFont(2),
    fontWeight: "700",
    textAlign: "center",
  },
});
