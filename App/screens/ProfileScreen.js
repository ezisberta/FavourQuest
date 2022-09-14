import { useEffect, useState } from "react";
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
import { auth, db } from "../../firebase";

function ProfileScreen({ navigation }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            setUsername(data.username);
          })
          .catch((err) => {
            console.log(err);
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
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Welcome");
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
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Map");
            }}
            style={styles.BackButtonBorder}
          >
            <Text style={styles.BackArrow}>⇤</Text>
          </TouchableOpacity>
          <Text style={styles.ProfileText}>Profile</Text>
        </View>
        <View style={styles.ProfileOuterCard}>
          <Text style={styles.ProfileCard}>Username</Text>
          <Text style={styles.ProfileCardContent}>{`${username}`}</Text>
        </View>
        <TouchableOpacity
          style={styles.Edit}
          onPress={() => navigation.navigate("Edit Details")}
        >
          <Text style={styles.EditText}>Edit Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Edit} onPress={handleSignOut}>
          <Text style={styles.EditText}>Sign Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  ProfileCardContent: {
    fontSize: "30",
    fontFamily: "Minecraft-Bold",
    color: colors.primary,
  },
  ProfileOuterCard: {
    margin: 25,
    height: 100,
    paddingLeft: 25,
    backgroundColor: colors.secondary,
  },
  ProfileCard: {
    marginTop: 10,
    fontFamily: "Minecraft-Regular",
    fontSize: "20",
  },

  Edit: {
    height: 80,
    backgroundColor: colors.primary,
    margin: 25,
    width: "85%",
  },
  signOut: {
    height: 80,
    backgroundColor: colors.primary,
    marginTop: 50,
    width: "100%",
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
