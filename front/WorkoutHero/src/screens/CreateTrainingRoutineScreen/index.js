import React, { useContext, useEffect, useState } from "react"
import {View, Text, TouchableOpacity, ScrollView, TextInput} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "./style"

import ExerciseOptions from "../../components/ExerciseOptions/ExerciseOptions"
import MyTextInput from "../../components/MyTextInput/MyTextInput"
import MyButtonRegular from "../../components/MyButton/MyButtonRegular"
import MyTextRegular from "../../components/MyText/MyTextRegular"

import { WorkoutContext } from "../../WorkoutContext";

export default function CreateTrainingRoutineScreen() {

    const { getAllExercises } = useContext(WorkoutContext);

    const [allExercises, setAllExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                let ExerciseList = await getAllExercises();
                setAllExercises(ExerciseList);
                console.log('\n\nTA AI OH OS EXERCICIO', allExercises);
                // console.log('tome o id do primeiro ex: ', allExercises[0].id)
            } catch (error) {
                console.log("error in fetchdata")
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

    }, [])

    useEffect(() => {
        console.log('EXERCICIOS SELECIONADOS: ', selectedExercises)
    }, [selectedExercises])

    return (
        <>

        <View style={styles.body}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <MyTextInput style={{margin: 10, flex:0.8}} defaultValue='Treino 1'></MyTextInput>

                <TouchableOpacity style={{flex:0.2}}>
                <MyTextRegular>Salvar</MyTextRegular>
                </TouchableOpacity>
            </View>
            

            {/* <MyButtonRegular title="Adicionar Exercício"></MyButtonRegular> */}
            
            <ScrollView style={styles.scrollBody}>

                {loading && <MyTextRegular>Carregando...</MyTextRegular>}

                {!loading && allExercises.map((val) => {
                    return <ExerciseOptions exercise={val}
                    onSelect={(exerciseId) => {
                        if (selectedExercises.includes(exerciseId)) {
                            // Remove o exercício da lista de selecionados
                            setSelectedExercises(selectedExercises.filter(id => id !== exerciseId));
                        } else {
                            // Adiciona o exercício à lista de selecionados
                            setSelectedExercises([...selectedExercises, exerciseId]);
                        }

                    }} 
                    />
                })}

                {/* GAMBIARRA MONSTRA AQUI */}
                <Text>⠀⠀</Text>
                <Text>⠀⠀</Text>
                <Text>⠀⠀</Text>
                <Text>⠀⠀</Text>
                <Text>⠀⠀</Text>
                
            </ScrollView>
        </View>

        </>
    );
}