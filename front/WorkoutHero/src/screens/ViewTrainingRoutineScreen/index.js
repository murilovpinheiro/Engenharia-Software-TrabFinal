import React, { useState, useContext } from "react"
import {View, TouchableOpacity, ScrollView, TextInput} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "./style"

import RPGImageBackground from "../../components/RPGImageBackground"
import ExerciseOptions from "../../components/ExerciseOptions/ExerciseOptions"
import MyTextInput from "../../components/MyTextInput/MyTextInput"
import MyButtonRegular from "../../components/MyButton/MyButtonRegular"
import MyTextRegular from "../../components/MyText/MyTextRegular"
import MyTextH3 from "../../components/MyText/MyTextH3";

import { WorkoutContext } from "../../WorkoutContext";
import { useNavigation } from "@react-navigation/native";

export default function ViewTrainingRoutineScreen({route}) {

    var params = route.params
    console.log(params)
    var routine = params.routine
    var exerciseList = routine["exerciseList"]

    const navigation = useNavigation()

    const { startWorkout } = useContext(WorkoutContext)

    const chooseRoutine = () => {
        console.log("func: ", startWorkout)
        

        // navigation.reset({
        //     index: 0, routes: [{name:'TRAININGSCREEN'}]
        // })
        startWorkout(routine)
        navigation.goBack()
        navigation.navigate('TREINAR', {screen: 'TRAININGSCREEN'})
        
    }

    const makeExercises = () => {
        var retList = []
        for (let i = 0; i < exerciseList.length; i++) {
            retList.push(
                <ExerciseOptions key={i} exercise={exerciseList[i]}/>
            )
        }
        return retList
    }

    return (
        <><RPGImageBackground/>

        <View style={styles.body}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                {/* <MyTextInput style={{margin: 10, flex:0.8}} defaultValue='Treino 1'></MyTextInput> */}
                <MyTextH3 style={styles.textName}>{routine.obj}</MyTextH3>

            </View>
            
            <MyButtonRegular title="Começar" style={styles.startBtn}
            onPress={chooseRoutine}
            />
            
            <ScrollView style={styles.scrollBody}>
                { makeExercises() }
            </ScrollView>

        </View>

        </>
    );
}