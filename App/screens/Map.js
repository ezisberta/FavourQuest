import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import colors from "../config/colors";
import Mapview, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

export default function Map({ navigation }) {
  const [pinPoint, setPinPoint] = useState({
    latitude: 33.8087146,
    longitude: -1.6229181,
  });

  const [region, setRegion] = useState({
    latitude: pinPoint.latitude,
    longitude: pinPoint.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
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

  return (
    <View style={styles.View}>
      <Mapview region={region} style={styles.Map} provider={PROVIDER_GOOGLE}>
        <Marker
          coordinate={pinPoint}
          draggable={true}
          icon={require("../assets/images/SkeleAva.png")}
          style={styles.Marker}
        ></Marker>
        <Pressable
          onPress={() => {
            navigation.navigate("Profile");
          }}
          style={styles.BackButtonBorder}
        >
          <Text style={styles.BackArrow}>⇤</Text>
        </Pressable>
        <Text style={styles.MapText}>Map</Text>
        <View style={styles.Menu}></View>
      </Mapview>
    </View>
  );
}

const styles = StyleSheet.create({
  ProfileIcon: {
    width: 50,
  },
  Menu: {
    marginTop: 460,
    width: "100%",
    height: 70,
    backgroundColor: colors.primary,
  },
  Map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  Marker: { Width: 10 },
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
});
