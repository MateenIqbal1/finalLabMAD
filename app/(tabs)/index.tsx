import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../../components/Login'
import Home from '../../components/Home'
import AttemptQuiz from '../../components/Quizes/AttemptQuiz'
import AddQuiz from '../../components/Quizes/AddQuiz'
import QuizReport from '../../components/Quizes/QuizReport'
import {QuizProvider} from '../../QuizContext'
const Stack = createStackNavigator();
export default function HomeScreen() {
  return (
    <QuizProvider>
   <Stack.Navigator initialRouteName='login'>
     <Stack.Screen name="home" component={Home} />
     <Stack.Screen name="login" component={AuthScreen} />
     <Stack.Screen name="AttemptQuiz" component={AttemptQuiz} />
     <Stack.Screen name="AddQuiz" component={AddQuiz} />
     <Stack.Screen name="QuizReport" component={QuizReport} />



   </Stack.Navigator>
</QuizProvider> 
 );
}


