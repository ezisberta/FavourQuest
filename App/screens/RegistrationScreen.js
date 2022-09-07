import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";

import colors from "../config/colors";

function RegistrationScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Minecraft-Bold": require("../assets/fonts/minecraft-font/Minecraft-Bold.otf"),
    "Minecraft-Regular": require("../assets/fonts/minecraft-font/Minecraft-Regular.otf"),
    "Minecraft-Italic": require("../assets/fonts/minecraft-font/Minecraft-Italic.otf"),
    "Minecraft-BoldItalic": require("../assets/fonts/minecraft-font/Minecraft-BoldItalic.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const pressHandler = () => {
    navigation.navigate("Profile");
  };

  return (
    <ImageBackground
      source={require("../assets/images/Pixel1.png")}
      style={styles.background}
    >
      <Text style={styles.RegisterText}>Register</Text>
      <Text style={styles.RegisterSubText}>
        Enter your details below to begin your quest!
      </Text>
      <View style={styles.ViewForm}>
        <TextInput
          style={styles.TextInput}
          placeholder="First Name"
        ></TextInput>
        <TextInput style={styles.TextInput} placeholder="Surname"></TextInput>
        <TextInput style={styles.TextInput} placeholder="Username"></TextInput>
        <TextInput style={styles.TextInput} placeholder="Email"></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          secureTextEntry={true}
        ></TextInput>
      </View>
      <View style={styles.Submit}>
        <Text style={styles.SubmitText} onPress={pressHandler}>
          Submit
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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

  background: { flex: 1 },

  ViewForm: {
    paddingTop: "5%",
  },

  TextInput: {
    color: colors.black,
    textAlign: "center",
    height: 40,
    margin: 20,
    borderWidth: 2,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    fontFamily: "Minecraft-Regular",
  },
  RegisterText: {
    marginTop: 50,
    textShadowColor: colors.black,
    // textShadowRadius: "10",
    textAlign: "center",
    color: colors.white,
    fontSize: 40,
    fontFamily: "Minecraft-Bold",
  },
  RegisterSubText: {
    textAlign: "center",
    paddingTop: 15,
    fontFamily: "Minecraft-Regular",
    fontSize: "15%",
    color: colors.black,
    textShadowColor: colors.white,
    // textShadowRadius: "10",
  },
});

export default RegistrationScreen;
