import React, { useState, useContext } from "react";
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
import { auth, db } from "../../firebase";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { googleKey } from "../secretkey/secretKey";
import { QuestContext } from "../../App";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function QuestInput({ navigation }) {
  const { quest, setQuest } = useContext(QuestContext);

  const [fontsLoaded] = useFonts({
    "Minecraft-Bold": require("../assets/fonts/minecraft-font/Minecraft-Bold.otf"),
    "Minecraft-Regular": require("../assets/fonts/minecraft-font/Minecraft-Regular.otf"),
    "Minecraft-Italic": require("../assets/fonts/minecraft-font/Minecraft-Italic.otf"),
    "Minecraft-BoldItalic": require("../assets/fonts/minecraft-font/Minecraft-BoldItalic.otf"),
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(12);
  const [location, setLocation] = useState({});

  if (!fontsLoaded) {
    return <LoadingPage />;
  }

  const handleSubmit = () => {
    auth.onAuthStateChanged(({ uid }) => {
      db.collection("Quests")
        .add({
          uid,
          title,
          description,
          hour,
          minute,
          location,
          questCompleted: false,
          questAccepted: false,
          questAcceptedBy: "",
        })
        .then((result) => {
          setQuest(result.id);
          navigation.navigate("Quest");
        })
        .catch((err) => {
          console.log(err);
        });
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
            <Pressable
              onPress={() => {
                navigation.navigate("Map");
              }}
              style={styles.BackButtonBorder}
            >
              <Text style={styles.BackArrow}>⇤</Text>
            </Pressable>
          </View>
          <Image
            style={styles.scroll}
            source={require("../assets/images/scroll.jpg")}
          ></Image>

          <Text style={styles.QuestHeader}>Quest:</Text>
          <TextInput
            maxLength={50}
            placeholder="Title"
            style={styles.QuestText}
            onChangeText={(text) => {
              setTitle(text);
            }}
          />

          <GooglePlacesAutocomplete
            placeholder="Where will it be?"
            fetchDetails={true}
            types={["(regions)"]}
            onPress={(data, details = null) =>
              setLocation(details.geometry.location)
            }
            textInputProps={{
              errorStyle: { color: "red" },
            }}
            GooglePlacesSearchQuery={{ rankby: "distance" }}
            query={{
              key: googleKey,
              language: "en",
              components: "country:uk",
              radius: 3000,
            }}
            styles={{ container: { ...styles.searchContainer } }}
          />

          <TextInput
            maxLength={250}
            placeholder="Description"
            style={styles.QuestDescription}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
          <TextInput
            maxLength={2}
            placeholder="Hour"
            style={styles.QuestHour}
            onChangeText={(text) => {
              setHour(text);
            }}
          />
          <TextInput
            maxLength={2}
            placeholder="Minute"
            style={styles.QuestMinute}
            onChangeText={(text) => {
              setMinute(text);
            }}
          />
          <Pressable onPress={handleSubmit} style={styles.Submit}>
            <Text style={styles.SubmitText}>Submit</Text>
          </Pressable>
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
  searchContainer: {
    position: "absolute",
    width: "70%",
    zIndex: 1,
    left: 60,
    top: 180,
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
    top: 240,
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
    top: 280,
    fontFamily: "Minecraft-Regular",
    textShadowColor: "black",
    textShadowRadius: "10",
    textAlign: "center",
    paddingBottom: 300,
    color: "black",
    fontSize: 20,
  },
  QuestHour: {
    position: "absolute",
    left: 60,
    top: 330,
    fontFamily: "Minecraft-Regular",
    textShadowColor: "black",
    textShadowRadius: "10",
    textAlign: "center",
    paddingBottom: 300,
    color: "black",
    fontSize: 20,
  },
  QuestMinute: {
    position: "absolute",
    left: 120,
    top: 330,
    fontFamily: "Minecraft-Regular",
    textShadowColor: "black",
    textShadowRadius: "10",
    textAlign: "center",
    paddingBottom: 300,
    color: "black",
    fontSize: 20,
  },

  Submit: {
    marginLeft: 140,
    marginTop: 390,
    position: "absolute",
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
    marginLeft: 25,
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
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
