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

function ProfileScreen({ navigation }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            //  console.log(snapshot.data());
            const data = snapshot.data();
            setUsername(data.username);
          });
      }
    });
  }, []);

  const [fontsLoaded] = useFonts({
    "Minecraft-Bold": require("../assets/fonts/minecraft-font/Minecraft-Bold.otf"),
    "Minecraft-Regular": require("../assets/fonts/minecraft-font/Minecraft-Regular.otf"),
    "Minecraft-Italic": require("../assets/fonts/minecraft-font/Minecraft-Italic.otf"),
    "Minecraft-BoldItalic": require("../assets/fonts/minecraft-font/Minecraft-BoldItalic.otf"),
  });

  if (!fontsLoaded) {
    return <LoadingPage />;
  }

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.navigate("Welcome");
    });
  };

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
        {/* <Image source={require("../assets/images/SkeleAva.png")}  */}
        <Text style={styles.ProfileText}>Profile</Text>
      </View>
      <View style={styles.ProfileOuterCard}>
        <Text style={styles.ProfileCard}>Username</Text>
        <Text style={styles.ProfileCardContent}>{`${username}`}</Text>
        <Text style={styles.ProfileCard}>Current Level</Text>
        <Text style={styles.ProfileCardContent}>4</Text>
        <Text style={styles.ProfileCard}>Exp needed to next level</Text>
        <Text style={styles.ProfileCardContent}>150xp</Text>
      </View>
      <View style={styles.Edit}>
        <Text
          style={styles.EditText}
          onPress={() => navigation.navigate("Edit Details")}
        >
          Edit Details
        </Text>
        <Text style={styles.EditText} onPress={handleSignOut}>
          Sign Out
        </Text>
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
  ProfileOuterCard: {
    margin: 25,
    height: 170,
    paddingLeft: 25,
    backgroundColor: colors.secondary,
  },
  ProfileCard: {
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
  ProfileText: {
    marginTop: 20,
    marginLeft: 20,
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

export default ProfileScreen;
