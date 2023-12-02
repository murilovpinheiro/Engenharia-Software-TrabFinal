import React, { useState, useContext, useEffect } from "react"
import {View, TouchableOpacity, Image, CheckBox, TextInput, Text} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "./style"

import MyTextRegular from "../MyText/MyTextRegular";
import MyTextH3 from "../MyText/MyTextH3";
import MyButtonThin from "../MyButton/MyButtonThin.js"
import Images from "../../Images";

import { WorkoutContext } from "../../WorkoutContext";


export default function ExerciseOptions({ exercise, onSelect, showSelect, throwTrigger, routineID }) {

    const stringFromGroups = (array) => {
        let str = ""
        for (let i = 0; i < array.length; i++){
            str += array[i].name.toUpperCase() + " "
        }
        return str
    }

    const { delExerciseToWK, getSetsAndReps } = useContext(WorkoutContext)

    const [isSelected, setIsSelected] = useState(false);

    const toggleSelection = () => {
        setIsSelected(!isSelected); // Inverte o estado de seleção
        onSelect(exercise.id); // Chama a função onSelect com o ID do exercício
        console.log('id: ', exercise.id)
    };

    if (!Images.exerciseImages2[exercise.name.replace(/\([^)]*\)/g, '').trim()]) {
        console.log("NAO ACHOU EXERCICIO: ", exercise.name.replace(/\([^)]*\)/g, '').trim())
    }

    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            const {sets, reps} = await getSetsAndReps(routineID, exercise.id);
            setSets(sets);
            setReps(reps);
        }
        fetch();
    }, [])

    const handleNum = (numero) => {
        if (numero === '') return '';
        try {
            return parseInt(numero);
        } catch (error) {
            return 0;
        }
    } 

    return (
        <View style={styles.body}>
            <View style={styles.header}>
                {Images.exerciseImages2[exercise.name.replace(/\([^)]*\)/g, '').trim()] && <Image style={styles.headerImg} source={Images.exerciseImages2[exercise.name.replace(/\([^)]*\)/g, '').trim()]}/>}
                {/* <Image style={styles.headerImg} source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png'
                }}/> */}


                <View style={styles.headerTextView}>
                    <MyTextH3 style={styles.headerTextName}>{exercise.name.replace(/_/g, " ").replace(/\([^()]*\)/g, "")}</MyTextH3>
                    {/* <MyTextRegular style={styles.headerTextType}>GRUPO MUSCULAR: {stringFromGroups(exercise.muscularGroups)}</MyTextRegular> */}
                </View>

                <TouchableOpacity style={styles.headerDelete}
                    onPress={async () => {
                        // requisicao de delecao
                        await delExerciseToWK(exercise.id, routineID);

                        // aciona trigger para recarregar a pagina
                        throwTrigger();
                    }}
                >
                    <AntDesign name='delete' color='black' size={30}/>
                </TouchableOpacity>

            </View>

            <View style={styles.viewOptions}>
                <TextInput
                    value={reps.toString()}
                    editable={true}
                    onChangeText={text => setReps(handleNum(text))}
                    onChanged = {(text) => {
                        this.setState({
                            mobile: text.replace(/[^0-9]/g, ''),
                        });
                    }}
                    keyboardType='numeric'
                />
                <Text>SETS</Text>
            </View>

            <View style={styles.viewOptions}>
                <TextInput
                    value={sets.toString()}
                    editable={true}
                    onChangeText={text => setSets(handleNum(text))}
                    onChanged = {(text) => {
                        this.setState({
                            mobile: text.replace(/[^0-9]/g, ''),
                        });
                    }}
                    keyboardType='numeric'
                />
                <Text>REPS</Text>
            </View>

            <View style={styles.divider}></View>
        </View>
    );
}