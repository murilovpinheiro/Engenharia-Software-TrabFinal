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
import ExerciseOptions2 from "../../components/ExerciseOptions2/ExerciseOptions2";

export default function CreateTrainingRoutineScreen({route}) {

    const navigation = useNavigation()

    const { userData } = useContext(AuthContext);

    const { getAllExercises, getExercises, createWorkout } = useContext(WorkoutContext);

    const [allExercises, setAllExercises] = useState([]);
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(300);
    const LIMITE = 317;

    const [selectedExercises, setSelectedExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [userId, setUserId] = useState('');
    const [nomeTreino, setNomeTreino] = useState('');
    const [nomeFiltro, setNomeFiltro] = useState('');

    useEffect(() => {
        
        setUserId(userData.id);
        const fetchData = async () => {
            try {
                // let ExerciseList = await getAllExercises();
                let ExerciseList = await getExercises(limit, offset) // limit, offset, resto da clause
                setAllExercises(ExerciseList);
                // console.log('\n\nTA AI OH OS EXERCICIO', allExercises);
                // console.log('tome o id do primeiro ex: ', allExercises[0].id)
            } catch (error) {
                console.log("error in fetchdata")
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        if (route?.params?.routine) {
            console.log('\n\n\n\nROTINA\n\n\n\n')
            console.log(route.params.routine);
        }

    }, [])

    useEffect(() => {
        console.log('EXERCICIOS SELECIONADOS: ', selectedExercises)
    }, [selectedExercises])

    useEffect(() => {
        console.log('USUARIO: ', userId);
    }, [userId])

    useEffect(() => {
        const fetch2 = async () => {
            try {
                let ExerciseList = await getExercises(limit, offset) // limit, offset, resto da clause
                setAllExercises([...allExercises, ...ExerciseList])
            } catch (error) {
                console.log("error in fetchdata")
                console.error(error);
            }
        }

        fetch2();

    }, [offset])

    return (
        <>

        <View style={styles.body}>
            <View style={
                {
                    flexDirection:'row', 
                    alignItems: 'center',
                    marginTop: 20,
                    padding: 2
                }
            }>
                
                <TouchableOpacity style={{flex:0.2}}
                onPress={() => {
                    navigation.goBack();
                }}>
                    <AntDesign name="back" size={40} color="black" />
                </TouchableOpacity>

                <MyTextInput
                    style={{margin: 10, flex:0.8}} 
                    placeholder='Treino'
                    value={nomeFiltro}
                    onChangeText={setNomeTreino}
                >
                </MyTextInput>

                <TouchableOpacity style={{flex:0.2}}>
                    <AntDesign name="menu-unfold" size={40} color="black" />
                </TouchableOpacity>
            </View>
            
            {loading && <MyTextRegular>Carregando...</MyTextRegular>}

            {!loading &&
            <View 
            style={styles.scrollBody}
            
            >

                <FlatList
                    // style={styles.scrollBody}
                    data={allExercises}
                    keyExtractor={(id) => { id.toString(); }}
                    renderItem={
                        ({item}) => {
                            if (item){

                                return  <ExerciseOptions2 key={item.id} exercise={item} 
                                // showSelect={true}
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
                    onEndReached={() => {
                        if (loading2) {
                            if (offset + limit >= 317) {
                                setLoading2(false);
                                console.log('\n\n\n\n\nCHEGOU FIM\n\n\n\n\n')
                                return;
                            }
                            setOffset(() => (offset + limit));
                            console.log('valores novos: ', offset);
                        }
                    }}
                />
            </View>}
                
        </View>

        </>
    );
}