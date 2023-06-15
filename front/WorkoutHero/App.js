import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View, Image } from 'react-native';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import RPGImageBackground from './src/components/RPGImageBackground';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Lexend': require('./assets/fonts/Lexend/Lexend.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <RPGImageBackground/>
      <WelcomeScreen/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
