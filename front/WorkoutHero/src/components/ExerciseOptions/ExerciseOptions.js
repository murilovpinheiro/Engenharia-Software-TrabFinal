import React, { useState, useContext, useEffect } from "react"
import {View, TouchableOpacity, Image, CheckBox, TextInput, Text} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
// import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "./style"

import MyTextRegular from "../MyText/MyTextRegular";
import MyTextH3 from "../MyText/MyTextH3";
import MyButtonThin from "../MyButton/MyButtonThin.js"
import Images from "../../Images";

import { WorkoutContext } from "../../WorkoutContext";
import MyTextInput from "../MyTextInput/MyTextInput.js";


export default function ExerciseOptions({ exercise, onSelect, showSelect, throwTrigger, routineID }) {

    const stringFromGroups = (array) => {
        if (!array) return ""
        let str = ""
        for (let i = 0; i < array.length; i++){
            str += array[i].name.toUpperCase() + " "
        }
        return str
    }

    const { delExerciseToWK, getSetsAndReps, updateReps, updateSets } = useContext(WorkoutContext)

    const [isSelected, setIsSelected] = useState(false);

    const toggleSelection = () => {
        setIsSelected(!isSelected); // Inverte o estado de seleção
        onSelect(exercise.id); // Chama a função onSelect com o ID do exercício
        console.log('id: ', exercise.id)
    };

    if (!Images.exerciseImages2[exercise.name.replace(/\([^)]*\)/g, '').trim()]) {
        console.log("NAO ACHOU EXERCICIO: ", exercise.name.replace(/\([^)]*\)/g, '').trim())
    }

    const [wkexid, setWkexid] = useState(null);

    const [sets, setSets] = useState(0);
    const [secondsSets, setSecondsSets] = useState(0);
    const [clicouSets, setClicouSets] = useState(false);
    useEffect(() => {
            setSecondsSets(0);
            const interval = setInterval(() => {
                setSecondsSets((prevSeconds) => prevSeconds + 1);
            }, 1000);
        return () => clearInterval(interval);
    }, [sets]) 
    useEffect(() => {
        if (secondsSets === 1 && clicouSets) {
            console.log("OKEI Sets")
            saveSets()
            setSecondsSets(0);
            setClicouSets(false);
        }
    }, [secondsSets])
 
    const [reps, setReps] = useState(0);
    const [secondsReps, setSecondsReps] = useState(0);
    const [clicouReps, setClicouReps] = useState(false);
    useEffect(() => {
            setSecondsReps(0);
            const interval2 = setInterval(() => {
                setSecondsReps((prevSeconds2) => prevSeconds2 + 1);
            }, 1000);
        return () => clearInterval(interval2);
    }, [reps])
    useEffect(() => {
        if (secondsReps === 1 && clicouReps) {
            console.log("OKEI REPS")
            saveReps();
            setSecondsReps(0);
            setClicouReps(false);
        }
    }, [secondsReps])

    useEffect(() => {
        const fetch = async () => {
            const {id, sets, reps} = await getSetsAndReps(routineID, exercise.id);
            setWkexid(id);
            setSets(sets);
            setReps(reps);
        }
        fetch();
    }, [])

    const saveSets = () => {
        let setsToUp = sets;
        try {
            setsToUp = parseInt(setsToUp);
            updateSets(wkexid, setsToUp)
        } catch (error) {
            console.log('error sets: ', setsToUp)
            throw error
        }
    }

    const saveReps = () => {
        let repsToUp = reps;
        try {
            repsToUp = parseInt(repsToUp);
            updateReps(wkexid, repsToUp)
        } catch (error) {
            console.log('error reps: ', repsToUp)
            throw error
        }
    }


    const handleNum = (numero) => {
        if (numero === '') return '';
        try {
            return parseInt(numero);
        } catch (error) {
            return 0;
        }
    }
    
    return (
        // <View style={styles.body}>
        //     <View style={styles.header}>
        //         {Images.exerciseImages2[exercise.name.replace(/\([^)]*\)/g, '').trim()] && <Image style={styles.headerImg} source={Images.exerciseImages2[exercise.name.replace(/\([^)]*\)/g, '').trim()]}/>}
        //         {/* <Image style={styles.headerImg} source={{
        //             uri: 'https://reactnative.dev/img/tiny_logo.png'
        //         }}/> */}


        //         <View style={styles.headerTextView}>
        //             <MyTextH3 style={styles.headerTextName}>{exercise.name.replace(/_/g, " ").replace(/\([^()]*\)/g, "")}</MyTextH3>
        //             {/* <MyTextRegular style={styles.headerTextType}>GRUPO MUSCULAR: {stringFromGroups(exercise.muscularGroups)}</MyTextRegular> */}
        //         </View>

        //         <TouchableOpacity style={styles.headerDelete}
        //             onPress={async () => {
        //                 // requisicao de delecao
        //                 await delExerciseToWK(exercise.id, routineID);

        //                 // aciona trigger para recarregar a pagina
        //                 throwTrigger();
        //             }}
        //         >
        //             <AntDesign name='delete' color='black' size={30}/>
        //         </TouchableOpacity>

        //     </View>

        //     <View style={styles.viewOptions}>
        //         <TextInput
        //             value={reps.toString()}
        //             editable={true}
        //             onChangeText={text => {setClicouReps(true); setReps(handleNum(text))}}
        //             onChanged = {(text) => {
        //                 this.setState({
        //                     mobile: text.replace(/[^0-9]/g, ''),
        //                 });
                        
        //             }}
        //             keyboardType='numeric'
        //             onTouchStart={() => setClicouReps(true)}
        //             placeholder="0"
        //         />
        //         <Text>REPS</Text>
        //     </View>

        //     <View style={styles.viewOptions}>
        //         <TextInput
        //             value={sets.toString()}
        //             editable={true}
        //             onChangeText={text => {setClicouSets(true); setSets(handleNum(text))}}
        //             onChanged = {(text) => {
        //                 this.setState({
        //                     mobile: text.replace(/[^0-9]/g, ''),
        //                 });
        //             }}
        //             keyboardType='numeric'
        //             onTouchStart={() => setClicouSets(true)}
        //             placeholder="0"

        //         />
        //         <Text>SETS</Text>
        //     </View>

        //     <View style={styles.divider}></View>
        // </View>
        <View style={styles.card}>
            {Images.exerciseImages2[exercise.name.replace(/\([^)]*\)/g, '').trim()] && <Image style={styles.img} source={Images.exerciseImages2[exercise.name.replace(/\([^)]*\)/g, '').trim()]}/>}
            
            <MyTextH3 style={styles.exerciseName}>{exercise.name.replace(/_/g, " ").replace(/\([^()]*\)/g, "")}</MyTextH3>
            
            <TouchableOpacity style={styles.btnDelete}
                     onPress={async () => {
                         // requisicao de delecao
                         await delExerciseToWK(exercise.id, routineID);

                         // aciona trigger para recarregar a pagina
                         throwTrigger();
                     }}
                 >
                
                <Ionicons name='close-circle-outline' color='black' size={30}/>
            </TouchableOpacity>

            <View style={styles.content}>
                 
            
                <MyTextRegular>{exercise.body_part}</MyTextRegular>
                <MyTextRegular>{exercise.muscles}</MyTextRegular>

                <View style={styles.setsRepsView}>
                    <MyTextInput style={styles.setsRepsInput}
                        value={reps.toString()}
                        editable={true}
                        onChangeText={text => {setClicouReps(true); setReps(handleNum(text))}}
                        onChanged = {(text) => {
                            this.setState({
                                mobile: text.replace(/[^0-9]/g, ''),
                            });
                            
                        }}
                        keyboardType='numeric'
                        onTouchStart={() => setClicouReps(true)}
                        placeholder="1"
                    >
                    </MyTextInput>
                    
                    <MyTextH3> sets de </MyTextH3>

                    <MyTextInput style={styles.setsRepsInput}
                        value={sets.toString()}
                        editable={true}
                        onChangeText={text => {setClicouSets(true); setSets(handleNum(text))}}
                        onChanged = {(text) => {
                            this.setState({
                                mobile: text.replace(/[^0-9]/g, ''),
                            });
                        }}
                        keyboardType='numeric'
                        onTouchStart={() => setClicouSets(true)}
                        placeholder="0"
                    >
                    </MyTextInput>

                    <MyTextH3> repetições</MyTextH3>
                </View>
            </View>
        </View>
    );
}