import React from "react"
import { StyleSheet } from "react-native";

import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from '@expo/vector-icons/Ionicons';

import ProfileScreen from "./screens/ProfileScreen";
// import InTrainingScreen from "./screens/InTrainingScreen";
import RoutinesListScreen from "./screens/RoutinesListScreen";
import ViewTrainingRoutineScreen from "./screens/ViewTrainingRoutineScreen";
import InTrainingScreen from "./screens/InTrainingScreen";
import TimerScreen from "./screens/TimerScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";




const namePerfil = "PERFIL"
const nameTreinar = "TREINAR"
const nameNovo = "TREINOS"

const Tab = createBottomTabNavigator();



export default function MainContainer(){
    return (
        // <NavigationContainer>
        <Tab.Navigator
        initialRouteName='LOGINFLUX'
        screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName; let rn = route.name;
                if (rn === namePerfil) {
                    iconName = 'person'
                } else if (rn === nameTreinar) {
                    iconName = 'fitness'
                } else if (rn === nameNovo) {
                    iconName = 'create'
                }
                return <Ionicons name={iconName} size={45} color={color}/>
            },

            tabBarStyle: styles.navTabStyle,
            tabBarActiveTintColor: '#F2BD00',
            tabBarInactiveTintColor: '#808080',
            tabBarLabelStyle: styles.navTabText,

            headerStyle: styles.navHeaderStyle,
            headerTintColor: 'white',
            headerTitleStyle: styles.navHeaderTitle,
        })}
        >
            {/* <Tab.Screen name='LOGINFLUX'
            component={LoginFluxContainer}
            options={{headerShown: false, tabBarHideOnKeyboard: true}}
            >
            </Tab.Screen> */}

            <Tab.Screen name={nameNovo} component={RoutinesStack}/>
            <Tab.Screen name={nameTreinar} component={TrainingStack}/>
            <Tab.Screen name={namePerfil} component={ProfileScreen}/>

        </Tab.Navigator>

        // </NavigationContainer>
    );
}


const RoutinesStack = () => {
    const Stack = createNativeStackNavigator()

    return (
        <StackNavigator initialRouteName='ALLROUTINES'>
            <Stack.Screen name='VIEWROUTINE' options={{ headerShown: false }} component={ViewTrainingRoutineScreen} />
            <Stack.Screen name='ALLROUTINES' options={{ headerShown: false }} component={RoutinesListScreen} />
        </StackNavigator>
    )
} 



const TrainingStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='TRAININGSCREEN'>
            <Stack.Screen name='TRAININGSCREEN' options={{ headerShown: false }} component={InTrainingScreen} />
            <Stack.Screen name='TIMERSCREEN' component={TimerScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    navHeaderStyle: {
      backgroundColor: '#00132A',
      borderBottomWidth: 6, borderColor: 'white', height: 100
    },
    navHeaderTitle: {
      fontFamily: 'Lexend-Bold', fontSize: 26
    },
    navTabStyle: {
        height: 70, padding: 4,
        backgroundColor: '#00132A',
        borderTopWidth: 6, borderColor: 'white'
    },
    navTabText: {
        fontFamily: 'Lexend', fontSize: 0
    }
});
  
// const navHeaderOptions = {
//     headerStyle: styles.navHeaderStyle,
//     headerTintColor: 'white',
//     headerTitleStyle: styles.navHeaderTitle,
//     contentStyle: {
//         borderTopColor: 'white',
//         borderTopWidth: 6,    
//     }
// }