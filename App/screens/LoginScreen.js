import { useState, useContext } from "react";
import {
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import colors from "../config/colors";
import LoadingPage from "./LoadingPage";
import { auth } from "../../firebase";
import { UserContext } from "../../App";

function LoginScreen({ navigation }) {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    "Minecraft-Bold": require("../assets/fonts/minecraft-font/Minecraft-Bold.otf"),
    "Minecraft-Regular": require("../assets/fonts/minecraft-font/Minecraft-Regular.otf"),
    "Minecraft-Italic": require("../assets/fonts/minecraft-font/Minecraft-Italic.otf"),
    "Minecraft-BoldItalic": require("../assets/fonts/minecraft-font/Minecraft-BoldItalic.otf"),
  });

  if (!fontsLoaded) {
    return <LoadingPage />;
  }

  const handleSubmit = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        setUser(result.user.uid);
        navigation.navigate("Map");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
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
              navigation.navigate("Welcome");
            }}
            style={styles.BackButtonBorder}
          >
            <Text style={styles.BackArrow}>⇤</Text>
          </TouchableOpacity>
          <Text style={styles.LoginText}>Login</Text>
        </View>

        <View style={styles.ViewForm}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            onChangeText={(typedText) => {
              setEmail(typedText);
            }}
          ></TextInput>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(typedText) => {
              setPassword(typedText);
            }}
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.Submit} onPress={handleSubmit}>
          <Text style={styles.SubmitText}>Your quest continues...</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  Submit: {
    height: 60,
    backgroundColor: colors.primary,
    margin: 25,
  },
  SubmitText: {
    paddingTop: 14,
    color: colors.white,
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Minecraft-Regular",
  },

  background: { flex: 1 },

  ViewForm: {
    paddingTop: "5%",
  },

  TextInput: {
    color: colors.black,
    textAlign: "center",
    height: 40,
    margin: 20,
    borderWidth: 2,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    fontFamily: "Minecraft-Regular",
  },
  LoginText: {
    marginTop: 50,
    marginLeft: 33,
    textShadowColor: colors.black,
    textShadowRadius: "10",
    textAlign: "center",
    color: colors.white,
    fontSize: 40,
    fontFamily: "Minecraft-Bold",
  },
  RegisterSubText: {
    textAlign: "center",
    paddingTop: 15,
    fontFamily: "Minecraft-Regular",
    fontSize: "15%",
    color: colors.black,
    textShadowColor: colors.white,
    textShadowRadius: "10",
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

export default LoginScreen;
