import React from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";

function WelcomeScreen(props) {
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
  welcometext: { textAlign: "center", paddingTop: "80%" },
});

export default WelcomeScreen;
