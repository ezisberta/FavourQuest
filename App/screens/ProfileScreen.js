import React from "react";
import {
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";

import colors from "../config/colors";

function ProfileScreen(props) {
  const backbutton = () => {
    console.log("Back Button Pressed");
  };

  return (
    <ImageBackground
      source={require("../assets/images/Pixel1.png")}
      style={styles.background}
    >
      <SafeAreaView>
        <Pressable onPress={backbutton} style={styles.BackButtonBorder}>
          <Text style={styles.BackArrow}>⇤</Text>
        </Pressable>
      </SafeAreaView>
      <Text style={styles.ProfileText}>Profile</Text>
      <View style={styles.ProfileOuterCard}>
        {/* <Image source={require("../assets/images/SkeleAva.png")} /> */}
        <Text style={styles.ProfileCard}>Username</Text>
        <Text style={styles.ProfileCardContent}>Ghoul666</Text>
        <Text style={styles.ProfileCard}>Current Level</Text>
        <Text style={styles.ProfileCardContent}>4</Text>
        <Text style={styles.ProfileCard}>Exp needed to next level</Text>
        <Text style={styles.ProfileCardContent}>150xp</Text>
      </View>
      <View style={styles.Edit}>
        <Text style={styles.EditText}>Edit Details</Text>
        <Text style={styles.ChangePasswordText}>Change Password</Text>
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
    height: 200,
    paddingLeft: 25,
    backgroundColor: colors.secondary,
  },
  ProfileCard: {
    fontFamily: "Minecraft-Regular",
  },
  BackArrow: {
    color: colors.white,
    fontSize: 50,
    textAlign: "center",
    margin: -7,
  },
  BackButtonBorder: {
    margin: 25,
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
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
    textShadowColor: colors.black,
    textShadowRadius: "10",
    textAlign: "center",
    color: colors.white,
    fontSize: 40,
    fontFamily: "Minecraft-Bold",
  },
});

export default ProfileScreen;
