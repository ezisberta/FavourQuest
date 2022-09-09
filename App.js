import RegistrationScreen from "./App/screens/RegistrationScreen";
import WelcomeScreen from "./App/screens/WelcomeScreen";
import ProfileScreen from "./App/screens/ProfileScreen";
import EditDetails from "./App/screens/EditDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "./App/screens/Map";
import Quest from "./App/screens/Quest";
import LoginScreen from "./App/screens/LoginScreen";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Quest" component={Quest} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Edit Details" component={EditDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
