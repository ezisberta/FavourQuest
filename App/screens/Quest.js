import React, { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import LoadingPage from "./LoadingPage";
import colors from "../config/colors";
import { db } from "../../firebase";
import { QuestContext, UserContext } from "../../App";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Quest({ navigation }) {
  const [questArr, setQuestArr] = useState([]);
  const { user } = useContext(UserContext);
  const { quest } = useContext(QuestContext);

  const [fontsLoaded] = useFonts({
    "Minecraft-Bold": require("../assets/fonts/minecraft-font/Minecraft-Bold.otf"),
    "Minecraft-Regular": require("../assets/fonts/minecraft-font/Minecraft-Regular.otf"),
    "Minecraft-Italic": require("../assets/fonts/minecraft-font/Minecraft-Italic.otf"),
    "Minecraft-BoldItalic": require("../assets/fonts/minecraft-font/Minecraft-BoldItalic.otf"),
  });

  const questRef = db.collection("Quests");

  useEffect(() => {
    questRef
      .doc(quest)
      .get()
      .then((querySnapshot) => {
        const questData = querySnapshot.data();
        setQuestArr(questData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const acceptQuest = () => {
    questRef
      .doc(quest)
      .update({
        questAccepted: true,
        questAcceptedBy: user,
      })
      .then(() => {
        navigation.navigate("Map");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const abandonQuest = () => {
    questRef
      .doc(quest)
      .update({
        questAccepted: false,
        questAcceptedBy: "",
      })
      .then(() => {
        navigation.navigate("Quest Log");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!fontsLoaded) {
    return <LoadingPage />;
  }

  const completeQuest = () => {
    questRef
      .doc(quest)
      .update({
        questCompleted: true,
      })
      .then(() => {
        navigation.navigate("Map");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelQuest = () => {
    questRef
      .doc(quest)
      .delete()
      .then(() => {
        navigation.navigate("Quest Log");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/Pixel1.png")}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 10 }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Map");
              }}
              style={styles.BackButtonBorder}
            >
              <Text style={styles.BackArrow}>⇤</Text>
            </TouchableOpacity>
          </View>
          <Image
            style={styles.scroll}
            source={require("../assets/images/scroll.jpg")}
          ></Image>
          <Text style={styles.QuestHeader}>Quest:</Text>
          <Text style={styles.QuestText}>{questArr.title}</Text>
          <Text style={styles.QuestDescription}>{questArr.description}</Text>
          <Text style={styles.QuestTime}>
            Time: {questArr.hour}:{questArr.minute}
          </Text>
          {user === questArr.uid ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  completeQuest();
                }}
                style={styles.CompleteButtonBorder}
              >
                <Text style={styles.Complete}>Complete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  cancelQuest();
                }}
                style={styles.CancelButtonBorder}
              >
                <Text style={styles.Cancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : questArr.questAcceptedBy === user &&
            questArr.questCompleted === false ? (
            <TouchableOpacity
              onPress={() => {
                abandonQuest();
              }}
              style={styles.AbandonButtonBorder}
            >
              <Text style={styles.Accept}>Abandon</Text>
            </TouchableOpacity>
          ) : questArr.questCompleted === false ? (
            <TouchableOpacity
              onPress={() => {
                acceptQuest();
              }}
              style={styles.AcceptButtonBorder}
            >
              <Text style={styles.Accept}>Accept</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.QuestComplete}>Quest Complete</Text>
          )}
        </View>
        <View style={styles.Menu}>
          <View style={styles.NavButtonBorder}>
            <Text
              onPress={() => {
                navigation.navigate("Profile");
              }}
              style={styles.NavButton}
            >
              Profile
            </Text>
          </View>
          <View style={styles.NavButtonBorder}>
            <Text
              onPress={() => {
                navigation.navigate("Quest Log");
              }}
              style={styles.NavButton}
            >
              Quest Log
            </Text>
          </View>
          <View style={styles.NavButtonBorder}>
            <Text
              onPress={() => {
                navigation.navigate("Create Quest");
              }}
              style={styles.NavButton}
            >
              Create Quest
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  QuestComplete: {
    fontSize: "25",
    position: "absolute",
    fontFamily: "Minecraft-Bold",
    color: colors.secondary,
    margin: 25,
    width: "100%",
    height: 40,
    left: "9%",
    bottom: 100,
  },
  BackArrow: {
    color: colors.white,
    fontSize: 40,
    textAlign: "center",
    margin: -6,
  },
  BackButtonBorder: {
    marginLeft: 25,
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
    top: 120,
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
    top: 180,
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
  QuestDescription: {
    position: "absolute",
    left: 60,
    top: 240,
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
    top: 320,
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
    left: "28%",
    bottom: 100,
    position: "absolute",
    borderRadius: "5%",
    shadowOpacity: "5%",
  },
  AbandonButtonBorder: {
    backgroundColor: colors.secondary,
    margin: 25,
    width: 95,
    height: 40,
    left: "26%",
    bottom: 100,
    position: "absolute",
    borderRadius: "5%",
    shadowOpacity: "5%",
  },
  Complete: {
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
  CompleteButtonBorder: {
    backgroundColor: colors.secondary,
    margin: 25,
    width: 100,
    height: 40,
    left: "10%",
    bottom: 100,
    position: "absolute",
    borderRadius: "5%",
    shadowOpacity: "5%",
  },
  Cancel: {
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
  CancelButtonBorder: {
    backgroundColor: colors.primary,
    margin: 25,
    width: 80,
    height: 40,
    left: "45%",
    bottom: 100,
    position: "absolute",
    borderRadius: "5%",
    shadowOpacity: "5%",
  },
  Menu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: 70,
    backgroundColor: colors.primary,
  },
  NavButton: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 13,
    fontFamily: "Minecraft-Regular",
  },
  NavButtonBorder: {
    backgroundColor: colors.secondary,
    margin: 25,
    width: 100,
    height: 40,
    bottom: 10,
    borderRadius: "5%",
    shadowOpacity: "5%",
  },
});
