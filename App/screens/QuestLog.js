import { useState, useContext, useCallback } from "react";
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
import {  db } from "../../firebase";
import { UserContext, QuestContext } from "../../App";
import { useFocusEffect } from "@react-navigation/native";

function QuestLog({ navigation }) {
  const [myQuests, setMyQuests] = useState([]);
  const { user } = useContext(UserContext);
  const { setQuest } = useContext(QuestContext);

  useFocusEffect (
    useCallback(() => {
      db.collection("Quests")
        .where("questAcceptedBy", "==", user)
        .where("questCompleted", "==", false)
        .get()
        .then((querySnapshot) => {
          setMyQuests(
            querySnapshot.docs.map((doc) => {
              return (
                <Pressable
                  key={doc.id}
                  onPress={() => {
                    setQuest(doc.id);
                    navigation.navigate("Quest");
                  }}
                >
                  <Text>{doc.data().title}</Text>
                </Pressable>
              );
            })
          );
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }, [])
  );

  const [fontsLoaded] = useFonts({
    "Minecraft-Bold": require("../assets/fonts/minecraft-font/Minecraft-Bold.otf"),
    "Minecraft-Regular": require("../assets/fonts/minecraft-font/Minecraft-Regular.otf"),
    "Minecraft-Italic": require("../assets/fonts/minecraft-font/Minecraft-Italic.otf"),
    "Minecraft-BoldItalic": require("../assets/fonts/minecraft-font/Minecraft-BoldItalic.otf"),
  });

  if (!fontsLoaded) {
    return <LoadingPage />;
  }

  const handleAccepted = () => {
    db.collection("Quests")
      .where("questAcceptedBy", "==", user)
      .where("questCompleted", "==", false)
      .get()
      .then((querySnapshot) => {
        setMyQuests(
          querySnapshot.docs.map((doc) => {
            return (
              <Pressable
                onPress={() => {
                  setQuest(doc.id);
                  navigation.navigate("Quest");
                }}
              >
                <Text key={doc.id}>{doc.data().title}</Text>
              </Pressable>
            );
          })
        );
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const handleCreated = () => {
    db.collection("Quests")
      .where("uid", "==", user)
      .get()
      .then((querySnapshot) => {
        setMyQuests(
          querySnapshot.docs.map((doc) => {
            return (
              <Pressable
                onPress={() => {
                  setQuest(doc.id);
                  navigation.navigate("Quest");
                }}
              >
                <Text key={doc.id}>{doc.data().title}</Text>
              </Pressable>
            );
          })
        );
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const handleCompleted = () => {
    db.collection("Quests")
      .where("questAcceptedBy", "==", user)
      .where("questCompleted", "==", true)
      .get()
      .then((querySnapshot) => {
        setMyQuests(
          querySnapshot.docs.map((doc) => {
            return (
              <Pressable
                onPress={() => {
                  setQuest(doc.id);
                  navigation.navigate("Quest");
                }}
              >
                <Text key={doc.id}>{doc.data().title}</Text>
              </Pressable>
            );
          })
        );
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  return (
    <ImageBackground
      source={require("../assets/images/Pixel1.png")}
      style={styles.background}
    >
      <View style={styles.container}>
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
          {myQuests}
        </View>
        <View style={styles.Menu}>
          <Text onPress={handleAccepted} style={styles.NavButton}>
            Accepted
          </Text>
          <Text onPress={handleCreated} style={styles.NavButton}>
            Created
          </Text>
          <Text onPress={handleCompleted} style={styles.NavButton}>
            Completed
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Menu: {
    marginTop: "159%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: 70,
    backgroundColor: colors.primary,
  },
  NavButton: {
    marginTop: 20,
    fontSize: 15,
    fontFamily: "Minecraft-Regular",
  },
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
