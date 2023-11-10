import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Linking from 'expo-linking';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PassChangeScreen from './src/screens/PassChangeScreen';

import MainContainer from './src/MainContainer';
import RoutinesListScreen from './src/screens/RoutinesListScreen';
import CreateTrainingRoutineScreen from './src/screens/CreateTrainingRoutineScreen';
import { ScreenContainer } from 'react-native-screens';

import { AuthProvider } from './src/AuthContext';
import AppStyles from './src/AppStyles';
import PassRestoreRequestScreen from './src/screens/PassRestoreRequestScreen';

// const STYLES = ['default', 'dark-content', 'light-content'];

export default function App() {

  const [resetData, setResetData] = useState(null);
  // const url = Linking.useURL();

  // useEffect( () => {
  //   if (url) {
  //     const { hostname, path, queryParams } = Linking.parse(url);

  //     console.log(
  //       `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
  //         queryParams
  //       )}`
  //     );
      
  //     if (path) {
  //       const list = path.split('/')
  //       if (list[1] == 'forgotpass') {
  //         setResetData(queryParams); // colocando dados do link como dados para recuperação de senha
  //       }
  //     } else {
  //       setResetData(null);
  //     }
  //   }
  // }, [url]);

  const [fontsLoaded] = useFonts({
    'Lexend': require('./assets/fonts/Lexend/Lexend.ttf'),
    'Lexend-Bold': require('./assets/fonts/Lexend/Lexend-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  // const [statusBarStyle, setStatusBarStyle] = useState(STYLES[2]);

  const Stack = createNativeStackNavigator();



  return (
    <>
    <StatusBar backgroundColor= {AppStyles.colors.primary} barStyle={'light-content'}/>
    <AuthProvider>
      <View style={{flex: 1}}>

        <NavigationContainer>
          <Stack.Navigator 
          screenOptions={stackOptions}
          // initialRouteName={resetData ? 'PASSCHANGE' : 'BEM VINDO'}>
          // {/* initialRouteName='BEM VINDO'> */}
          initialRouteName='BEM VINDO'>
            
            <Stack.Screen name='BEM VINDO'   component={WelcomeScreen} />
            <Stack.Screen name='LOGIN'   component={LoginScreen} />
            <Stack.Screen name='PASSRESTOREREQUEST'  component={PassRestoreRequestScreen}/>
            <Stack.Screen name='CRIAR CONTA'   component={SignUpScreen} />
        
            <Stack.Screen name='MAIN'  component={MainContainer}/>

            <Stack.Screen name='PASSCHANGE' component={PassChangeScreen} initialParams={resetData ? resetData : null}/>
          </Stack.Navigator>
        </NavigationContainer>

      </View>
    </AuthProvider>
    </>
    
  );
}


stackOptions = {
  headerShown:false
}

// mainHeaderOptions = {
//   headerShown:false
// }