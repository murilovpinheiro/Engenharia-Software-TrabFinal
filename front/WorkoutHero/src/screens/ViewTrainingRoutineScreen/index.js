import React, { useState } from "react"
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

export default function ViewTrainingRoutineScreen({route}) {

    var params = route.params
    console.log(params)
    var routine = params.routine
    var exerciseList = routine.exerciseList

    const makeExercises = () => {
        var retList = []
        for (let i = 0; i < exerciseList.length; i++) {
            let exercise = exerciseList[i]
            retList.push(
                <ExerciseOptions exercise={exerciseList[0]}/>
            )
        }
        return retList
    }

    return (
        <><RPGImageBackground/>

        <View style={styles.body}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                {/* <MyTextInput style={{margin: 10, flex:0.8}} defaultValue='Treino 1'></MyTextInput> */}
                <MyTextH3 style={styles.textName}>{routine.nome}</MyTextH3>

            </View>
            
            <MyButtonRegular title="Começar" style={styles.startBtn}
            onPress={()=>{}}
            />
            
            <ScrollView style={styles.scrollBody}>
                { makeExercises() }
            </ScrollView>

        </View>

        </>
    );
}