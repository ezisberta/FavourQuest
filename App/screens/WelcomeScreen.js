import React from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

function WelcomeScreen(props) {
  let [fontsLoaded] = useFonts({
    "Minecraft-Regular": require("../assets/fonts/minecraft-font/Minecraft-Regular.otf"),
    "Minecraft-Bold": require("../assets/fonts/minecraft-font/Minecraft-Bold.otf"),
    "Minecraft-BoldItalic": require("../assets/fonts/minecraft-font/Minecraft-BoldItalic.otf"),
    "Minecraft-Italic": require("../assets/fonts/minecraft-font/Minecraft-Italic.otf"),
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/Pixel1.png")}
    >
      <Text style={styles.welcometext}>FavourQuest</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  welcometext: {
    fontFamily: "Minecraft-Regular",
    textAlign: "center",
    paddingTop: "90%",
    fontSize: 40,
    textShadowRadius: "10%",
  },
});

export default WelcomeScreen;
