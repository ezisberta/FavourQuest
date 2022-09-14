import {
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import colors from "../config/colors";
import Mapview, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { db } from "../../firebase";
import { UserContext, QuestContext } from "../../App";

export default function Map({ navigation }) {
  const { user } = useContext(UserContext);
  const { quest, setQuest } = useContext(QuestContext);

  const [pinPoint, setPinPoint] = useState({
    latitude: 54.1361346,
    longitude: -1.6229181,
  });
  const [region, setRegion] = useState({
    latitude: pinPoint.latitude,
    longitude: pinPoint.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
      } catch (error) {
        console.log(error);
      }

      let location = await Location.getCurrentPositionAsync({});
      setPinPoint({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);
  db.collection("Quests")
    .where("questAccepted", "==", false)
    .get()
    .then((querySnapshot) => {
      setMarkers(
        querySnapshot.docs.map((doc) => {
          console.log("LOOPINGGGSSSS");
          return (
            <Marker
              key={doc.id}
              pinColor={user === doc.data().uid ? "purple" : "blue"}
              coordinate={{
                latitude: doc.data().location.lat,
                longitude: doc.data().location.lng,
              }}
              onPress={handleQuestMarkerPress}
            >
              <Image
                source={
                  user === doc.data().uid
                    ? require("../assets/images/userExclamationMark.png")
                    : require("../assets/images/exclamationMark.png")
                }
                resizeMode="contain"
                style={{ width: 80, height: 80 }}
              ></Image>
            </Marker>
          );
        })
      );
    });

  const handleQuestMarkerPress = (event) => {
    const questKey =
      event.target._internalFiberInstanceHandleDEV._debugOwner.key;
    console.log(questKey, "<<<<<EVENT");
    setQuest(questKey);
    navigation.navigate("Quest");
  };

  return (
    <SafeAreaView style={styles.View}>
      <Mapview region={region} style={styles.Map} provider={PROVIDER_GOOGLE}>
        <Marker
          // pinColor={colors.white}

          // icon={require("../assets/images/SkeleAva.png")}

          coordinate={pinPoint}
          draggable={true}
          style={styles.Marker}
        >
          <Image
            source={require("../assets/images/SkeleAva.png")}
            resizeMode="contain"
            style={{ width: 100, height: 100 }}
          ></Image>
        </Marker>
        {markers}
        <Pressable
          onPress={() => {
            navigation.navigate("Profile");
          }}
          style={styles.BackButtonBorder}
        >
          <Text style={styles.BackArrow}>⇤</Text>
        </Pressable>
        <Text style={styles.MapText}></Text>
      </Mapview>
      <View style={styles.Menu}>
        <Text
          onPress={() => {
            navigation.navigate("Profile");
          }}
          style={styles.NavButton}
        >
          Profile
        </Text>
        <Text
          onPress={() => {
            navigation.navigate("Quest Log");
          }}
          style={styles.NavButton}
        >
          Quest Log
        </Text>
        <Text
          onPress={() => {
            navigation.navigate("Create Quest");
          }}
          style={styles.NavButton}
        >
          Create Quest
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ProfileIcon: {
    width: 50,
  },
  Menu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: 70,
    backgroundColor: colors.primary,
  },
  Map: {
    flex: 8,
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
  },
  Marker: {},
  MapText: {
    textShadowColor: colors.black,
    textShadowRadius: "10",
    textAlign: "center",
    color: colors.white,
    fontSize: 40,
    fontFamily: "Minecraft-Bold",
  },
  BackArrow: {
    marginLeft: 32,
    marginTop: 18,
    color: colors.white,
    fontSize: 40,
    textAlign: "center",
    margin: -15,
  },
  BackButtonBorder: {
    margin: 25,
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    alignContent: "center",
    justifyContent: "center",
  },
  View: {
    flex: 1,
  },
  NavButton: {
    marginTop: 20,
    fontSize: 15,
    fontFamily: "Minecraft-Regular",
  },
});
