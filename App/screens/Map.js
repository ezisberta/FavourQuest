import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import colors from "../config/colors";
import Mapview, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { db } from "../../firebase";

export default function Map({ navigation }) {
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
    db.collection("Quests")
      .get()
      .then((querySnapshot) => {
        setMarkers(
          querySnapshot.docs.map((doc) => {
            return (
              <Marker
                key={doc.id}
                pinColor="blue"
                coordinate={{
                  latitude: doc.data().location.lat,
                  longitude: doc.data().location.lng,
                }}
              ></Marker>
            );
          })
        );
      });
  }, []);

  return (
    <View style={styles.View}>
      <Mapview region={region} style={styles.Map} provider={PROVIDER_GOOGLE}>
        <Marker
          pinColor={colors.white}
          coordinate={pinPoint}
          draggable={true}
          style={styles.Marker}
        ></Marker>
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
      </Mapview>
    </View>
  );
}

const styles = StyleSheet.create({
  ProfileIcon: {
    width: 50,
  },
  Menu: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 500,
    width: "100%",
    height: 70,
    backgroundColor: colors.primary,
  },
  Map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
  View: {
    flex: 1,
  },
  NavButton: {
    fontSize: 15,
    height: 50,
    margin: 10,
    fontFamily: "Minecraft-Regular",
  },
});
