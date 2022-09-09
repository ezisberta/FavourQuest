import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  SafeAreaView,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import LoadingPage from "./LoadingPage";
import colors from "../config/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function QuestInput({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Minecraft-Bold": require("../assets/fonts/minecraft-font/Minecraft-Bold.otf"),
    "Minecraft-Regular": require("../assets/fonts/minecraft-font/Minecraft-Regular.otf"),
    "Minecraft-Italic": require("../assets/fonts/minecraft-font/Minecraft-Italic.otf"),
    "Minecraft-BoldItalic": require("../assets/fonts/minecraft-font/Minecraft-BoldItalic.otf"),
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(12);

  if (!fontsLoaded) {
    return <LoadingPage />;
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/Pixel1.png")}
    >
      <SafeAreaView>
        <Image
          style={styles.scroll}
          source={require("../assets/images/scroll.jpg")}
        ></Image>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.navigate("Map");
            }}
            style={styles.BackButtonBorder}
          >
            <Text style={styles.BackArrow}>⇤</Text>
          </Pressable>
        </View>
        <Text style={styles.QuestHeader}>Quest:</Text>
        <TextInput
          maxLength={50}
          placeholder="Title"
          style={styles.QuestText}
          onChange={(text) => {
            setTitle(text);
          }}
        />
        <TextInput
          maxLength={50}
          placeholder="Location"
          style={styles.QuestLocation}
          //???????????
        />
        <TextInput
          maxLength={250}
          placeholder="Description"
          style={styles.QuestDescription}
          onChange={(text) => {
            setDescription(text);
          }}
        />
        <TextInput maxLength={50} placeholder="Time" style={styles.QuestTime} />
        <TextInput
          maxLength={150}
          placeholder="Link"
          style={styles.QuestLink}
          onChange={(text) => {
            setTime(text);
          }}
        />
        <Pressable
          onPress={() => {
            navigation.navigate("Map");
          }}
          style={styles.Submit}
        >
          <Text style={styles.SubmitText}>Submit</Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    height: windowHeight,
    width: windowWidth,
  },
  QuestHeader: {
    position: "absolute",
    left: 125,
    top: 100,
    fontFamily: "Minecraft-Regular",
    textShadowColor: "black",
    textShadowRadius: "10",
    textAlign: "center",
    paddingBottom: 300,
    color: "black",
    fontSize: 40,
  },
  QuestText: {
    position: "absolute",
    left: 60,
    top: 160,
    fontFamily: "Minecraft-Regular",
    textShadowColor: "black",
    textShadowRadius: "10",
    textAlign: "center",
    paddingBottom: 300,
    color: "black",
    fontSize: 20,
  },
  scroll: {
    height: 500,
    width: null,
    alignItems: "stretch",
  },
  QuestLocation: {
    position: "absolute",
    left: 60,
    top: 190,
    fontFamily: "Minecraft-Regular",
    textShadowColor: "black",
    textShadowRadius: "10",
    textAlign: "center",
    paddingBottom: 300,
    color: "black",
    fontSize: 20,
  },
  QuestDescription: {
    position: "absolute",
    left: 60,
    top: 220,
    fontFamily: "Minecraft-Regular",
    textShadowColor: "black",
    textShadowRadius: "10",
    textAlign: "center",
    paddingBottom: 300,
    color: "black",
    fontSize: 20,
  },
  QuestTime: {
    position: "absolute",
    left: 60,
    top: 280,
    fontFamily: "Minecraft-Regular",
    textShadowColor: "black",
    textShadowRadius: "10",
    textAlign: "center",
    paddingBottom: 300,
    color: "black",
    fontSize: 20,
  },
  QuestLink: {
    position: "absolute",
    left: 60,
    top: 310,
    fontFamily: "Minecraft-Regular",
    textShadowColor: "black",
    textShadowRadius: "10",
    textAlign: "center",
    paddingBottom: 300,
    color: "black",
    fontSize: 20,
  },
  Submit: {
    marginLeft: 130,
    width: 70,
    height: 40,
    backgroundColor: colors.primary,
  },
  SubmitText: {
    color: colors.black,
    fontFamily: "Minecraft-Bold",
    textAlign: "center",
    marginTop: 10,
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
    position: "absolute",
    marginTop: 80,
    marginLeft: 20,
  },
});
