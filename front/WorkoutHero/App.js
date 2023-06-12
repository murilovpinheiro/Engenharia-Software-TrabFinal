import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import WelcomeScreen from './src/screens/WelcomeScreen';

export default function App() {
  return (
    <View>
      
      <Text>lorem ipsum</Text>
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
