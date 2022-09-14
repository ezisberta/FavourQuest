import React from "react";
import {
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";

import colors from "../config/colors";
import LoadingPage from "./LoadingPage";
function EditDetails({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Minecraft-Bold": require("../assets/fonts/minecraft-font/Minecraft-Bold.otf"),
    "Minecraft-Regular": require("../assets/fonts/minecraft-font/Minecraft-Regular.otf"),
    "Minecraft-Italic": require("../assets/fonts/minecraft-font/Minecraft-Italic.otf"),
    "Minecraft-BoldItalic": require("../assets/fonts/minecraft-font/Minecraft-BoldItalic.otf"),
  });

  if (!fontsLoaded) {
    return <LoadingPage />;
  }
  return (
    <ImageBackground
      source={require("../assets/images/Pixel1.png")}
      style={styles.background}
    >
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
            style={styles.BackButtonBorder}
          >
            <Text style={styles.BackArrow}>⇤</Text>
          </TouchableOpacity>
          <Text style={styles.DetailsText}>Edit Details</Text>
        </View>
        <View style={styles.ProfileOuterCard}>
          <Text style={styles.ProfileCard}>Change Username</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="username"
          ></TextInput>
          <Text style={styles.ProfileCard}>Change Password</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="password"
          ></TextInput>
        </View>
        <View style={styles.Edit}>
          <Text style={styles.EditText}>Edit Details</Text>
        </View>
        <TouchableOpacity
          style={styles.Submit}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.SubmitText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
    height: "50%",
    backgroundColor: colors.secondary,
  },
  ProfileCard: {
    marginTop: 20,
    marginLeft: 30,
    fontFamily: "Minecraft-Regular",
  },
  TextInput: {
    color: colors.black,
    height: 40,
    borderWidth: 2,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    fontFamily: "Minecraft-Regular",
  },

  background: { flex: 1 },

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
  DetailsText: {
    marginTop: 20,
    textShadowColor: colors.black,
    textShadowRadius: "10",
    textAlign: "center",
    color: colors.white,
    fontSize: 40,
    fontFamily: "Minecraft-Bold",
  },
  Submit: {
    height: 60,
    backgroundColor: colors.primary,
    margin: 25,
  },
  SubmitText: {
    paddingTop: 10,
    color: colors.white,
    fontSize: 35,
    textAlign: "center",
    fontFamily: "Minecraft-Regular",
  },
  BackArrow: {
    color: colors.white,
    fontSize: 40,
    textAlign: "center",
    margin: -6,
  },
  BackButtonBorder: {
    margin: 25,
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: "row",
  },
});

export default EditDetails;
