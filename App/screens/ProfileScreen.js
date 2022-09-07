import AppLoading from "expo-app-loading";
import React from "react";
import { Text, ImageBackground, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";

import colors from "../config/colors";

function ProfileScreen(props) {
  const [fontsLoaded] = useFonts({
    "Minecraft-Bold": require("../assets/fonts/minecraft-font/Minecraft-Bold.otf"),
    "Minecraft-Regular": require("../assets/fonts/minecraft-font/Minecraft-Regular.otf"),
    "Minecraft-Italic": require("../assets/fonts/minecraft-font/Minecraft-Italic.otf"),
    "Minecraft-BoldItalic": require("../assets/fonts/minecraft-font/Minecraft-BoldItalic.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground
      source={require("../assets/images/Pixel1.png")}
      style={styles.background}
    >
      {/* <Image source={require("../assets/images/SkeleAva.png")}  */}
      <Text style={styles.ProfileText}>Profile</Text>
      <View style={styles.ProfileOuterCard}>
        <Text style={styles.ProfileCard}>Username</Text>
        <Text style={styles.ProfileCardContent}>Ghoul666</Text>
        <Text style={styles.ProfileCard}>Current Level</Text>
        <Text style={styles.ProfileCardContent}>4</Text>
        <Text style={styles.ProfileCard}>Exp needed to next level</Text>
        <Text style={styles.ProfileCardContent}>150xp</Text>
      </View>
      <View style={styles.Edit}>
        <Text style={styles.EditText}>Edit Details</Text>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  ProfileCardContent: {
    fontSize: "20",
    fontFamily: "Minecraft-Bold",
    color: colors.primary,
  },
  ProfileOuterCard: {
    margin: 25,
    height: 170,
    paddingLeft: 25,
    backgroundColor: colors.secondary,
  },
  ProfileCard: {
    marginTop: 10,
    fontFamily: "Minecraft-Regular",
  },

  Edit: {
    height: 80,
    backgroundColor: colors.primary,
    margin: 25,
  },
  EditText: {
    paddingTop: 18,
    color: colors.white,
    fontSize: 35,
    textAlign: "center",
    fontFamily: "Minecraft-Regular",
  },

  background: { flex: 1 },

  ViewForm: {
    paddingTop: "10%",
  },

  TextInput: {
    color: colors.black,
    textAlign: "center",
    height: 40,
    margin: 25,
    borderWidth: 2,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    fontFamily: "Minecraft-Regular",
  },
  ProfileText: {
    marginTop: 50,
    textShadowColor: colors.black,
    // textShadowRadius: "10",
    textAlign: "center",
    color: colors.white,
    fontSize: 40,
    fontFamily: "Minecraft-Bold",
  },
});

export default ProfileScreen;
