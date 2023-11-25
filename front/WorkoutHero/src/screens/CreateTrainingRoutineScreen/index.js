import React, { useContext, useEffect, useState } from "react"
import {View, Text, TouchableOpacity, ScrollView, TextInput, SectionList, FlatList} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "./style"

import ExerciseOptions from "../../components/ExerciseOptions/ExerciseOptions"
import MyTextInput from "../../components/MyTextInput/MyTextInput"
import MyButtonRegular from "../../components/MyButton/MyButtonRegular"
import MyTextRegular from "../../components/MyText/MyTextRegular"

import { WorkoutContext } from "../../WorkoutContext";
import { AuthContext } from "../../AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function CreateTrainingRoutineScreen() {

    const navigation = useNavigation()

    const { userData } = useContext(AuthContext);

    const { getAllExercises, createWorkout } = useContext(WorkoutContext);

    const [allExercises, setAllExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const [nomeTreino, setNomeTreino] = useState('Treino');

    useEffect(() => {
        
        setUserId(userData.id);
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

    useEffect(() => {
        console.log('USUARIO: ', userId);
    }, [userId])

    return (
        <>

        <View style={styles.body}>
            <View style={
                {
                    flexDirection:'row', 
                    alignItems: 'center',
                    marginTop: 20
                }
            }>
                <MyTextInput 
                    style={{margin: 10, flex:0.8}} 
                    defaultValue='Treino'
                    value={nomeTreino}
                    onChangeText={setNomeTreino}
                ></MyTextInput>

                <TouchableOpacity style={{flex:0.2}}>
                <MyTextRegular onPress={async () => { // funcao de salvar 
                    setLoading(true)
                    await createWorkout(selectedExercises, userId, nomeTreino, 'E');
                    navigation.navigate('ALLROUTINES');
                }}>Salvar</MyTextRegular>
                </TouchableOpacity>
            </View>
            
            {loading && <MyTextRegular>Carregando...</MyTextRegular>}

            {!loading &&<FlatList
                // style={styles.scrollBody}
                data={allExercises}
                renderItem={
                    ({item}) => {
                        if (item){

                            return  <ExerciseOptions key={item.id} exercise={item} showSelect={true}
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
                        }
                    }
                }
                onEndReached={console.log('\n\n\n\n\nCHEGOU FIM\n\n\n\n\n')}
            />}
                
        </View>

        </>
    );
}