import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../../components/Login'
import Home from '../../components/Home'

const Stack = createStackNavigator();
export default function HomeScreen() {
  return (
   <Stack.Navigator initialRouteName='home'>
     <Stack.Screen name="home" component={Home} />
     <Stack.Screen name="login" component={AuthScreen} />
   </Stack.Navigator>
  );
}


