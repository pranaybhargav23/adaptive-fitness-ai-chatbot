import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/welcomeScreen");
    }, 2000); // after 2 second it will navigate to Welcome Screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🤖</Text>
      <Text style={styles.title}>FitBuddy AI</Text>
      <Text style={styles.subtitle}>Your Adaptive Fitness Companion</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
  },  
  logo: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0000",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#000",
  },
});
