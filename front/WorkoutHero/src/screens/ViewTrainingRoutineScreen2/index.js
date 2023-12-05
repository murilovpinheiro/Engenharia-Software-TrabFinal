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
    
    const { getRoutine, updateRoutineName } = useContext(WorkoutContext)
    const [routine, setRoutine] = useState(null);

    const { startWorkout } = useContext(WorkoutContext)
    const [updateTrigger, setUpdateTrigger] = useState(false);
    
    const [nomeTreino, setNomeTreino] = useState('');
    const [seconds, setSeconds] = useState(0);
    const [clicou, setClicou] = useState(false);
    useEffect(() => {
        setSeconds(0)
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1)
        }, 1000);
        return () => clearInterval(interval);
    }, [nomeTreino])
    useEffect(() => {
        if (seconds === 1 && clicou) {
            saveName();
        }
    }, [seconds])

    const saveName = () => {
        if (!routine) return;
        let saveToUp = nomeTreino;
        if (saveToUp == '') saveToUp = 'Treino Sem Nome'
        try {
            console.log(routine.id, saveToUp)
            updateRoutineName(routine.id, saveToUp)
        } catch (error) {
            console.log('error nome: ', nomeTreino)
            throw error;
        }
    }

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

    useEffect(() => {
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
    }, [updateTrigger])


    const chooseRoutine = async () => {
        await startWorkout(routine)
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
                        <ExerciseOptions key={routine["exerciseList"][i].id} exercise={routine["exerciseList"][i]} showSelect={false} throwTrigger={() => setUpdateTrigger(true)} routineID={routine.id}/>
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

            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                {/* <MyTextInput style={{margin: 10, flex:0.8}} defaultValue='Treino 1'></MyTextInput> */}
                {/* <MyTextH3 style={styles.textName}>TREINO PADRAO</MyTextH3> */}
                <TextInput
                    style={{
                            ...(styles.textName),
                            }}
                    value={nomeTreino}
                    editable={true}
                    onChangeText={text => {setClicou(true); setNomeTreino(text)}}
                    placeholder="Treino  "
                    onTouchStart={() => setClicou(true)}
                />

            </View>

            {/* {routine && <Text>{routine.id}</Text>} */}
            
            <View style={{
                flexDirection: 'column'
            }}>
                {routine && routine["exerciseList"].length >= 0 && <MyButtonRegular title="Começar" style={styles.startBtn}
                onPress={async() => await chooseRoutine()}
                />}

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
            </View>
            
            
            {routine && <ScrollView style={{
                ...(styles.scrollBody),
            }}>
                { makeExercises() }
            </ScrollView>}

            <View style={{height:80}}></View>

        </View>

        </>
    );
}