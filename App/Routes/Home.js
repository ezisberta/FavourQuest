import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ProfileScreen from "../screens/ProfileScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import EditDetails from "../screens/EditDetails";

const screens = {
  Welcome: {
    screen: WelcomeScreen,
  },
  Registration: {
    screen: RegistrationScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
  Details: {
    screen: EditDetails,
  },
};

const stack = createStackNavigator(screens);

export default createAppContainer(stack);
