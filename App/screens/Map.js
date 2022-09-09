import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import Quest from "./Quest";

export default function Map({ navigation }) {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => {
          navigation.navigate("Profile");
        }}
        style={styles.BackButtonBorder}
      >
        <Text style={styles.BackArrow}>⇤</Text>
      </Pressable>
      <Text style={styles.MapText}>Map</Text>
      <Quest />
    </View>
  );
}

const styles = StyleSheet.create({
  MapText: {
    marginTop: 20,
    marginLeft: 50,
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
