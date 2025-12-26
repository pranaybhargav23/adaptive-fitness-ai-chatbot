import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.emoji}>🤖</Text>
        <Text style={styles.title}>Your Adaptive Fitness Companion</Text>
        

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
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2937",
    textAlign: "center",
   marginVertical:20,
    lineHeight: 34,
  },
  emoji: {
    fontSize: 30,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 20,
    marginHorizontal: 16,
  },
  warning: {
    fontSize: 14,
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 32,
    fontStyle: "italic",
    marginHorizontal: 16,
  },
  button: {
    backgroundColor: "#FF8A00",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: "#FF8A00",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});