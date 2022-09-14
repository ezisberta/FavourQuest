import React from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";
export default function LoadingPage() {
  const [fontsLoaded] = useFonts({
    "Minecraft-Bold": require("../assets/fonts/minecraft-font/Minecraft-Bold.otf"),
    "Minecraft-Regular": require("../assets/fonts/minecraft-font/Minecraft-Regular.otf"),
    "Minecraft-Italic": require("../assets/fonts/minecraft-font/Minecraft-Italic.otf"),
    "Minecraft-BoldItalic": require("../assets/fonts/minecraft-font/Minecraft-BoldItalic.otf"),
  });

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
  background: { flex: 1, justifyContent: "flex-end" },
  welcometext: {
    fontFamily: "Minecraft-Bold",
    textShadowColor: "black",
    textShadowRadius: "10",
    textAlign: "center",
    paddingBottom: 300,
    color: "white",
    fontSize: 40,
  },
});
