import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { StyleSheet, Text, View,useWindowDimensions } from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFont,
} from "../utlis/responsive.js";


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
      <LottieView 
        source={require("../assets/animations/Chat.json")}
        autoPlay
        loop
        style={styles.logo}
      />
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
      fontSize: responsiveFont(2.8),
    fontWeight: "bold",
    color: "#1F2937",
  },
  subtitle: {
    marginTop: 8,
    fontSize: responsiveFont(1.6),
    color: "#1F2937",
  },
  logo:{
    width: responsiveWidth(60),
    height: responsiveHeight(25),
  }
});
