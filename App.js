import RegistrationScreen from "./App/screens/RegistrationScreen";
import WelcomeScreen from "./App/screens/WelcomeScreen";
import ProfileScreen from "./App/screens/ProfileScreen";
import EditDetails from "./App/screens/EditDetails";

export default function App() {
  return (
    (<WelcomeScreen />),
    (<RegistrationScreen />),
    (<EditDetails />),
    (<ProfileScreen />)
  );
}
