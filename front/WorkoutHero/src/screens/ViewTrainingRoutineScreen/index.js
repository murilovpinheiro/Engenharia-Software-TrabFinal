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

export default function ViewTrainingRoutineScreen(props) {

    var routine = props.routine

    return (
        <><RPGImageBackground/>

        <View style={styles.body}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <MyTextInput style={{margin: 10, flex:0.8}} defaultValue='Treino 1'></MyTextInput>

                <TouchableOpacity style={{flex:0.2}}>
                <MyTextRegular>Salvar</MyTextRegular>
                </TouchableOpacity>
            </View>
            
            <MyButtonRegular title="Adicionar Exercício"></MyButtonRegular>
            
            <ScrollView style={styles.scrollBody}>
                <ExerciseOptions/>
                <ExerciseOptions/>
                <ExerciseOptions/>
                <ExerciseOptions/>
                <ExerciseOptions/>
                

            </ScrollView>
        </View>

        </>
    );
}