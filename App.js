import RegistrationScreen from "./App/screens/RegistrationScreen";
import WelcomeScreen from "./App/screens/WelcomeScreen";
import ProfileScreen from "./App/screens/ProfileScreen";
import EditDetails from "./App/screens/EditDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "./App/screens/Map";
import Quest from "./App/screens/Quest";
import LoginScreen from "./App/screens/LoginScreen";
import QuestInput from "./App/screens/QuestInput";
import QuestLog from "./App/screens/QuestLog";
import { createContext, useState } from "react";
export const UserContext = createContext();
export const QuestContext = createContext();

const Stack = createStackNavigator();
export default function App() {
  const [user, setUser] = useState("");
  const [quest, setQuest] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <QuestContext.Provider value={{ quest, setQuest }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Quest" component={Quest} />
            <Stack.Screen name="Create Quest" component={QuestInput} />
            <Stack.Screen name="Quest Log" component={QuestLog} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Edit Details" component={EditDetails} />
            <Stack.Screen name="Map" component={Map} />
          </Stack.Navigator>
        </NavigationContainer>
      </QuestContext.Provider>
    </UserContext.Provider>
  );
}
