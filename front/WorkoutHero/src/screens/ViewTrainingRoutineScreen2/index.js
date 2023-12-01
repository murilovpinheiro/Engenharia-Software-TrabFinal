import React, { useState, useContext, useEffect } from "react"
import {View, Text, TouchableOpacity, ScrollView, TextInput} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "./style"

import ExerciseOptions from "../../components/ExerciseOptions/ExerciseOptions"
import MyTextInput from "../../components/MyTextInput/MyTextInput"
import MyButtonRegular from "../../components/MyButton/MyButtonRegular"
import MyTextRegular from "../../components/MyText/MyTextRegular"
import MyTextH3 from "../../components/MyText/MyTextH3";

import { WorkoutContext } from "../../WorkoutContext";
import { useNavigation } from "@react-navigation/native";


import { useIsFocused } from "@react-navigation/native";


export default function ViewTrainingRoutineScreen2({route}) {
    
    const navigation = useNavigation()
    
    const { getRoutine } = useContext(WorkoutContext)
    const [routine, setRoutine] = useState(null);

    const { startWorkout } = useContext(WorkoutContext)
    const [nomeTreino, setNomeTreino] = useState('');
    const [updateTrigger, setUpdateTrigger] = useState(false);

    const isFocused = useIsFocused();
    useEffect( () => {

        const fetchData = async() => {
            var params = route.params
            var routineBruh = params.routine
            var realRoutine = await getRoutine(routineBruh.id);
            console.log('coisas novas', routine, nomeTreino)
            
            setRoutine(realRoutine);   
            setNomeTreino(realRoutine.name)
        }

        fetchData();
        setUpdateTrigger(false);
        
        
    }, [isFocused, updateTrigger]);


    const chooseRoutine = () => {
        startWorkout(routine)
        navigation.goBack()
        navigation.navigate('TREINAR', {screen: 'TRAININGSCREEN'})
    }

    const selectExercise = () => {
        navigation.navigate('RotinaNova', {screen: 'RotinaNova', routine: routine});
    }

    const makeExercises = () => {
        var retList = []
        if (routine && routine["exerciseList"]) {
            try {
                for (let i = 0; i < routine["exerciseList"].length; i++) {
                    retList.push(
                        <ExerciseOptions key={i} exercise={routine["exerciseList"][i]} showSelect={false} throwTrigger={() => setUpdateTrigger(true)} routineID={routine.id}/>
                    )
                }
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
        return retList
    }

    return (
        <>

        <View style={{
            ...(styles.body),
        }}>
            <View style={{height:30}}></View>

            <View style={{flexDirection:'row', alignItems: 'center'}}>
                {/* <MyTextInput style={{margin: 10, flex:0.8}} defaultValue='Treino 1'></MyTextInput> */}
                {/* <MyTextH3 style={styles.textName}>TREINO PADRAO</MyTextH3> */}
                <TextInput
                    style={{
                            ...(styles.textName),
                            }}
                    value={nomeTreino}
                    editable={true}
                    onChangeText={text => setNomeTreino(text)}
                    placeholder="Nome Treino"
                />

            </View>

            {routine && <Text>{routine.id}</Text>}
            
            <MyButtonRegular title="Começar" style={styles.startBtn}
            onPress={chooseRoutine}
            />

            <MyButtonRegular title="Adicionar Exercicio" style={
                {
                    ...styles.startBtn,
                    backgroundColor: '#071d1a',
                }
            }
            text = {
                {
                    color: '#ffc629'
                }
            }
            onPress={() => {
                selectExercise();
            }}
            />
            
            {routine && <ScrollView style={{
                ...(styles.scrollBody),
            }}>
                { makeExercises() }
            </ScrollView>}

        </View>

        </>
    );
}