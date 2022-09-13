import { useEffect, useState } from "react";
import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import colors from "../config/colors";
import LoadingPage from "./LoadingPage";
import { auth, db } from "../../firebase";

function QuestLog({ navigation }) {
  const [username, setUsername] = useState("");

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
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.navigate("Map");
          }}
          style={styles.BackButtonBorder}
        >
          <Text style={styles.BackArrow}>⇤</Text>
        </Pressable>
        <Text style={styles.QuestLog}>Quest Log</Text>
      </View>
      <View style={styles.QuestCard}>
        <Text style={styles.QuestType}>Your Quests:</Text>
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
  QuestCard: {
    position: "absolute",
    marginTop: 150,
    margin: 25,
    width: "85%",
    height: "60%",
    backgroundColor: colors.secondary,
  },
  QuestType: {
    margin: 25,
    fontSize: "20",
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
  QuestLog: {
    marginTop: 60,
    marginLeft: -10,
    textShadowColor: colors.black,
    textShadowRadius: "10",
    textAlign: "center",
    color: colors.white,
    fontSize: 40,
    fontFamily: "Minecraft-Bold",
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

export default QuestLog;
