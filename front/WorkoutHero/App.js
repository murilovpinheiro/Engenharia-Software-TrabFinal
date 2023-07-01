import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RPGImageBackground from './src/components/RPGImageBackground';

import MainContainer from './src/MainContainer';
import RoutinesListScreen from './src/screens/RoutinesListScreen';
import CreateTrainingRoutineScreen from './src/screens/CreateTrainingRoutineScreen';
import { ScreenContainer } from 'react-native-screens';

import { AuthProvider } from './src/AuthContext';








export default function App() {

  const [fontsLoaded] = useFonts({
    'Lexend': require('./assets/fonts/Lexend/Lexend.ttf'),
    'Lexend-Bold': require('./assets/fonts/Lexend/Lexend-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <View style={{flex: 1}}>

        <NavigationContainer>
          <Stack.Navigator initialRouteName='BEM VINDO'>
            <Stack.Screen name='BEM VINDO'  options={navHeaderOptions} component={WelcomeScreen} />
            <Stack.Screen name='LOGIN'  options={navHeaderOptions} component={LoginScreen} />
            <Stack.Screen name='CRIAR CONTA'  options={navHeaderOptions} component={SignUpScreen} />
        
            <Stack.Screen name='MAIN' options={mainHeaderOptions} component={MainContainer}/>
          </Stack.Navigator>
        </NavigationContainer>

      </View>
    </AuthProvider>
    
  );
}


navHeaderOptions = {}

mainHeaderOptions = {
  headerShown:false
}