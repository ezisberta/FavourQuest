import { useState, useContext, useCallback } from "react";
import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import colors from "../config/colors";
import LoadingPage from "./LoadingPage";
import { db } from "../../firebase";
import { UserContext, QuestContext } from "../../App";
import { useFocusEffect } from "@react-navigation/native";

function QuestLog({ navigation }) {
  const [myQuests, setMyQuests] = useState([]);
  const [questType, setQuestType] = useState("Accepted");
  const { user } = useContext(UserContext);
  const { setQuest } = useContext(QuestContext);

  useFocusEffect(
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
                  <Text style={styles.QuestText}>{doc.data().title}</Text>
                </Pressable>
              );
            })
          );
        })
        .catch((err) => {
          console.log(err);
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
                key={doc.id}
                onPress={() => {
                  setQuest(doc.id);
                  navigation.navigate("Quest");
                }}
              >
                <Text style={styles.QuestText} key={doc.id}>
                  {doc.data().title}
                </Text>
              </Pressable>
            );
          })
        );
        setQuestType("Accepted");
      })
      .catch((err) => {
        console.log(err);
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
                key={doc.id}
                onPress={() => {
                  setQuest(doc.id);
                  navigation.navigate("Quest");
                }}
              >
                <Text style={styles.QuestText} key={doc.id}>
                  {doc.data().title}
                </Text>
              </Pressable>
            );
          })
        );
        setQuestType("Created");
      })
      .catch((err) => {
        console.log(err);
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
                key={doc.id}
                onPress={() => {
                  setQuest(doc.id);
                  navigation.navigate("Quest");
                }}
              >
                <Text style={styles.QuestText} key={doc.id}>
                  {doc.data().title}
                </Text>
              </Pressable>
            );
          })
        );
        setQuestType("Completed");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/images/Pixel1.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 8 }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Map");
              }}
              style={styles.BackButtonBorder}
            >
              <Text style={styles.BackArrow}>⇤</Text>
            </TouchableOpacity>
            <Text style={styles.QuestLog}>Quest Log</Text>
          </View>
          <View style={styles.QuestCard}>
            <View style={styles.TypeContainer}>
              <Text style={styles.QuestType}>{questType}</Text>
            </View>

            {myQuests}
          </View>
        </View>
        <View style={styles.Menu}>
          <TouchableOpacity
            style={styles.NavButtonBorder}
            onPress={handleAccepted}
          >
            <Text style={styles.NavButton}>Accepted</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NavButtonBorder}
            onPress={handleCreated}
          >
            <Text style={styles.NavButton}>Created</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NavButtonBorder}
            onPress={handleCompleted}
          >
            <Text style={styles.NavButton}>Completed</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Menu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: 70,
    backgroundColor: colors.primary,
  },
  NavButtonBorder: {
    justifyContent: "center",
    backgroundColor: colors.secondary,
    marginTop: 27,
    width: 100,
    height: 40,
    bottom: 10,
    borderRadius: "5%",
    shadowOpacity: 0.5,
  },
  NavButton: {
    fontSize: 13,
    fontFamily: "Minecraft-Regular",
    textAlign: "center",
  },
  ProfileCardContent: {
    fontSize: "20",
    fontFamily: "Minecraft-Bold",
    color: colors.primary,
  },
  QuestCard: {
    position: "absolute",
    marginTop: 120,
    margin: 25,
    width: "85%",
    height: "65%",
    backgroundColor: colors.secondary,
  },

  TypeContainer: { justifyContent: "center", alignContent: "center" },
  QuestType: {
    marginLeft: 101,
    fontSize: "20",
    marginTop: 10,
    fontFamily: "Minecraft-Bold",
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
    marginTop: 20,
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
  QuestText: {
    fontSize: 20,
    fontFamily: "Minecraft-Regular",
    marginLeft: 20,
    marginTop: 20,
  },
});

export default QuestLog;
