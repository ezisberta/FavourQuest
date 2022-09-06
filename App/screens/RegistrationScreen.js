import React from "react";
import {
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  View,
  Button,
} from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

function RegistrationScreen(props) {
  let [fontsLoaded] = useFonts({
    "Minecraft-Regular": require("../assets/fonts/minecraft-font/Minecraft-Regular.otf"),
    "Minecraft-Bold": require("../assets/fonts/minecraft-font/Minecraft-Bold.otf"),
    "Minecraft-BoldItalic": require("../assets/fonts/minecraft-font/Minecraft-BoldItalic.otf"),
    "Minecraft-Italic": require("../assets/fonts/minecraft-font/Minecraft-Italic.otf"),
  });
  if (!fontsLoaded) {
    <AppLoading />;
  }

  const backbutton = () => {
    console.log("Turkey");
  };
  return (
    <ImageBackground
      source={require("../assets/images/Pixel1.png")}
      style={styles.background}
    >
      <Button title="Back" style={styles.BackButton} onPress={backbutton} />
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
        <Text style={styles.SubmitText}>Submit</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  BackButton: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    justifyContent: "center",
  },
  Submit: {
    height: 80,
    backgroundColor: "#fc5c65",
    margin: 25,
  },
  SubmitText: {
    paddingTop: 18,
    color: "white",
    fontSize: 35,
    textAlign: "center",
    fontFamily: "Minecraft-Regular",
  },

  background: { flex: 1 },

  ViewForm: {
    paddingTop: "10%",
  },

  TextInput: {
    color: "black",
    textAlign: "center",
    height: 40,
    margin: 25,
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "#fc5c65",
    fontFamily: "Minecraft-Regular",
  },
  RegisterText: {
    paddingTop: "26%",
    fontFamily: "Minecraft-Bold",
    textShadowColor: "black",
    textShadowRadius: "10",
    textAlign: "center",
    color: "white",
    fontSize: 40,
  },
  RegisterSubText: {
    textAlign: "center",
    paddingTop: 15,
    fontFamily: "Minecraft-Regular",
    fontSize: "15%",
    color: "black",
    textShadowColor: "white",
    textShadowRadius: "10",
  },
});

export default RegistrationScreen;
