import { Pressable, StyleSheet, Text } from "react-native";

export default function Map({ navigation }) {
  return (
    <Pressable
      title="Profile"
      style={styles.button}
      onPress={() => {
        navigation.navigate("Profile");
      }}
    >
      <Text style={styles.text}>Profile</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
    marginLeft: 50,
  },
  text: {
    fontSize: 100,
  },
});
