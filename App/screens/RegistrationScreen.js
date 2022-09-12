import { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import colors from "../config/colors";
import LoadingPage from "./LoadingPage";
import { auth, db } from "../../firebase";

function RegistrationScreen({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstNameValid, setFirstNameValid] = useState("");
  const [surnameValid, setSurnameValid] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [usernameValid, setUsernameValid] = useState("");

  const handleBlurFirstName = () => {
    if (!/[a-z-']+/i.test(firstname)) {
      setFirstNameValid("invalid");
    } else {
      setFirstNameValid("valid");
    }
  };

  const handleBlurSurname = () => {
    if (!/[a-z-']+/i.test(surname)) {
      setSurnameValid("invalid");
    } else {
      setSurnameValid("valid");
    }
  };

  const handleBlurPassword = () => {
    if (password.length < 6) {
      setPasswordValid("invalid");
    } else {
      setPasswordValid("valid");
    }
  };

  const handleBlurUsername = () => {
    if (!/^\w+$/.test(username)) {
      setUsernameValid("invalid");
    } else {
      db.collection("users")
          .get()
          .then((snapshot) => {
            const match = snapshot.docs.find((doc) => {
              return doc.data().username === username
            });
            if (match) {
              setUsernameValid("takenUsername");
            } else {
              setUsernameValid("valid");
            }
          });
    }
  }

  const handleBlurEmail = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailValid("invalidFormat");
    } else {
      {
        auth.fetchSignInMethodsForEmail(email).then((result) => {
          if (result.length > 0) {
            setEmailValid("takenEmail");
          } else {
            setEmailValid("valid");
          }
        });
      }
    }
  };

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
    if (firstNameValid === "valid" && surnameValid === "valid" && usernameValid === "valid" && emailValid === "valid" && passwordValid === "valid") {
      console.log("valid")
    } else {
      console.log("invalid")
    }
    // navigation.navigate("Profile");
    // auth.createUserWithEmailAndPassword(email, password).then((result) => {
    //   console.log("result");
    // });
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     const uid = user.uid;
    //     db.collection("users").doc(uid).set({
    //       username,
    //       email,
    //       firstname,
    //       surname,
    //     });
    //   }
    // });
  };

  return (
    <ImageBackground
      source={require("../assets/images/Pixel1.png")}
      style={styles.background}
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.navigate("Welcome");
          }}
          style={styles.BackButtonBorder}
        >
          <Text style={styles.BackArrow}>⇤</Text>
        </Pressable>
        <Text style={styles.RegisterText}>Register</Text>
      </View>
      <Text style={styles.RegisterSubText}>
        Enter your details below to begin your quest!
      </Text>
      <View style={styles.ViewForm}>
        <TextInput
          style={styles.TextInput}
          placeholder="First Name"
          onChangeText={(typedText) => {
            setFirstname(typedText);
          }}
          onBlur={handleBlurFirstName}
          maxLength={20}
        ></TextInput>
        {firstNameValid === "invalid" && (
          <Text style={styles.invalidWarning}>Invalid firstname</Text>
        )}

        <TextInput
          style={styles.TextInput}
          placeholder="Surname"
          onChangeText={(typedText) => {
            setSurname(typedText);
          }}
          onBlur={handleBlurSurname}
          maxLength={20}
        ></TextInput>
        {surnameValid === "invalid" && (
          <Text style={styles.invalidWarning}>Invalid surname</Text>
        )}
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          onChangeText={(typedText) => {
            setUsername(typedText);
          }}
          onBlur={handleBlurUsername}
          maxLength={15}
        ></TextInput>
        {usernameValid === "invalidFormat" ? (
          <Text style={styles.invalidWarning}>Invalid username format</Text>
        ) : usernameValid === "takenUsername" ? (
          <Text style={styles.invalidWarning}>Username taken</Text>
        ) : (
          <></>
        )}
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          onChangeText={(typedText) => {
            setEmail(typedText);
          }}
          onBlur={handleBlurEmail}
          maxLength={50}
        ></TextInput>
        {emailValid === "invalidFormat" ? (
          <Text style={styles.invalidWarning}>Invalid email format.</Text>
        ) : emailValid === "takenEmail" ? (
          <Text style={styles.invalidWarning}>Email taken</Text>
        ) : (
          <></>
        )}

        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(typedText) => {
            setPassword(typedText);
          }}
          onBlur={handleBlurPassword}
          maxLength={20}
        ></TextInput>
        {passwordValid === "invalid" && (
          <Text style={styles.invalidWarning}>
            Invalid password. Password must have between 6 and 20 characters.
          </Text>
        )}
      </View>

      <View style={styles.Submit}>
        <Text style={styles.SubmitText} onPress={handleSubmit}>
          Submit
        </Text>
      </View>
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
    paddingTop: 10,
    color: colors.white,
    fontSize: 35,
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
  RegisterText: {
    marginTop: 20,
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
  invalidWarning: {
    color: "white",
    backgroundColor: colors.primary,
    width: "40%",
    marginLeft: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default RegistrationScreen;

// refactor states to strings and change if statements (render, invalid, valid)
// sort username if already exists
// styling the alerts
// submit button functionality
