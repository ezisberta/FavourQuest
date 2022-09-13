import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import LoadingPage from "./LoadingPage";
import colors from "../config/colors";
import { db } from "../../firebase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Quest({ navigation }) {
  const [quest, setQuest] = useState([]);

  const [fontsLoaded] = useFonts({
    "Minecraft-Bold": require("../assets/fonts/minecraft-font/Minecraft-Bold.otf"),
    "Minecraft-Regular": require("../assets/fonts/minecraft-font/Minecraft-Regular.otf"),
    "Minecraft-Italic": require("../assets/fonts/minecraft-font/Minecraft-Italic.otf"),
    "Minecraft-BoldItalic": require("../assets/fonts/minecraft-font/Minecraft-BoldItalic.otf"),
  });

  if (!fontsLoaded) {
    return <LoadingPage />;
  }

  const questRef = db.collection("Quests");

  questRef
    .doc("p8EO2l6K9u53qJZ2VMtR")
    // .where("uid", "==", "744eXBn3kBdnkd8npZiMHTQsxP13")
    .get()
    .then((querySnapshot) => {
      const questData = querySnapshot.data();
      setQuest(questData);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/Pixel1.png")}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("Map");
        }}
        style={styles.BackButtonBorder}
      >
        <Text style={styles.BackArrow}>⇤</Text>
      </Pressable>
      <SafeAreaView>
        <Image
          style={styles.scroll}
          source={require("../assets/images/scroll.jpg")}
        ></Image>
        <Text style={styles.QuestHeader}>Quest:</Text>
        <Text style={styles.QuestText}>{quest.title}</Text>

        <Text style={styles.QuestDescription}>{quest.description}</Text>

        <Text style={styles.QuestTime}>
          Time: {quest.hour}:{quest.minute}
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Map");
          }}
          style={styles.AcceptButtonBorder}
        >
          <Text style={styles.Accept}>Accept</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("Map");
          }}
          style={styles.DeclineButtonBorder}
        >
          <Text style={styles.Decline}>Decline</Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
  DeclineButtonBorder: {
    backgroundColor: colors.primary,
    margin: 25,
    width: 80,
    height: 40,
    right: 70,
    bottom: 100,
    position: "absolute",
    borderRadius: "5%",
    shadowOpacity: "5%",
  },
  Decline: {
    position: "absolute",
    color: "black",
    right: 10,
    bottom: 10,
    fontFamily: "Minecraft-Regular",
    textAlign: "center",
    textShadowColor: colors.black,
    textShadowRadius: "1",
    fontSize: 18,
  },
  Accept: {
    color: "black",
    position: "absolute",
    left: 10,
    bottom: 10,
    fontFamily: "Minecraft-Regular",
    textAlign: "center",
    textShadowColor: colors.black,
    textShadowRadius: "1",
    fontSize: 18,
  },
  AcceptButtonBorder: {
    backgroundColor: colors.secondary,
    margin: 25,
    width: 80,
    height: 40,
    left: 30,
    bottom: 100,
    position: "absolute",
    borderRadius: "5%",
    shadowOpacity: "5%",
  },
});
