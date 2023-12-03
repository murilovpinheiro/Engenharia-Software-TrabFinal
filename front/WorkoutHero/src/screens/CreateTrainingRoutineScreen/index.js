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
import MyTextH3 from "../../components/MyText/MyTextH3";

export default function CreateTrainingRoutineScreen({route}) {

    const navigation = useNavigation()

    const { userData } = useContext(AuthContext);

    const { getAllExercises, getExercises, createWorkout, addExerciseToWK } = useContext(WorkoutContext);

    const [routine, setRoutine] = useState(null);
    const [exsJaSelecionados, setExsJaSelecionados] = useState([]);
    const [foramSelecionados, setForamSelecionados] = useState(false);

    const [allExercises, setAllExercises] = useState(null);
    const [limit, setLimit] = useState(15);
    const [offset, setOffset] = useState(0);
    const LIMITE = 317;

    const [selectedExercises, setSelectedExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [userId, setUserId] = useState('');
    const [nomeTreino, setNomeTreino] = useState('');
    const [nomeFiltro, setNomeFiltro] = useState('');
    
    // primeiro pego os que ja estao no treino
    useEffect(() => {
        
        setUserId(userData.id);
        const loadAlreadySelected = () => {

            if (route?.params?.routine) {
                console.log('\n\n\n\nROTINA\n\n\n\n\n\n', route?.params?.routine)
                setRoutine(route?.params?.routine); // aqui diz que a logica vai ser totalmente diferente
                setExsJaSelecionados(() => {
                    return route?.params?.routine.exerciseList.map((exercicio) => {
                        console.log('exercicio id:', exercicio.id);
                        return exercicio.id;
                    })
                })
                console.log('\n\n\n\n\nSELECIONADOS\n\n\n\n\n', exsJaSelecionados)
            }
        }
        loadAlreadySelected();
        setForamSelecionados(true);
    }, [])

    // depois eu pego somente quando tenho a informacao de quais ja estao no treino
    useEffect(() => {
        const fetchData = async () => {
            try {
                // let ExerciseList = await getAllExercises();
                let ExerciseList = await getExercises(limit, offset) // limit, offset, resto da clause
                setAllExercises(ExerciseList.filter((exercicio) => {
                    console.log('ja selecionados: ', exsJaSelecionados);
                    return !exsJaSelecionados.includes(exercicio.id)
                }));
            } catch (error) {
                console.log("error in fetchdata")
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        if (foramSelecionados)
            fetchData();
    }, [foramSelecionados])

    // useEffect para carregar mais exercicios com o tempo (so pego se tenho as infos dos que ja estao no treino)
    useEffect(() => {
        const fetch2 = async () => {
            try {
                let ExerciseList = await getExercises(limit, offset) // limit, offset, resto da clause
                setAllExercises([...allExercises, ...ExerciseList].filter((exercicio) => {
                    console.log('ja selecionados: ', exsJaSelecionados);
                    return !exsJaSelecionados.includes(exercicio.id)
                }))
            } catch (error) {
                console.log("error in fetchdata")
                console.error(error);
            }
        }

        if (foramSelecionados)
            fetch2();

    }, [offset])

    useEffect(() => {
        // tratando caso em que muitos exercicios sao selecionados, logo o primeiro offset talvez nao apareca
        if (allExercises && allExercises.length === 0) {
            console.log('eh zero?')
            setOffset(() => (offset + limit));
        }
    }, [allExercises])

    const goBack = async () => {
        // AQUI INDICA QUE NAO PRECISAMOS CRIAR UMA ROTINA NOVA, MAS SIM ATUALIZAR UMA EXISTENTE
        const pushNewData = async () => {

            if (routine) { 
                for (const exID of selectedExercises) {
                    await addExerciseToWK(exID, routine.id)
                }
            }
        }
        await pushNewData();
        navigation.goBack();
    }

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
                onPress={goBack}>
                    {selectedExercises && selectedExercises.length == 0 && <AntDesign name="back" size={40} color="black" />}
                    {selectedExercises && selectedExercises.length >= 1 && <AntDesign name="check" size={40} color="black" />}
                </TouchableOpacity>

                {/* <MyTextInput
                    style={{margin: 10, flex:0.8}} 
                    placeholder='Treino'
                    value={nomeFiltro}
                    onChangeText={setNomeTreino}
                >
                </MyTextInput> */}

                <MyTextH3>EXERCÍCIOS</MyTextH3>

                {/* <TouchableOpacity style={{flex:0.2}}>
                    <AntDesign name="menu-unfold" size={40} color="black" />
                </TouchableOpacity> */}
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

                                return  <ExerciseOptions2 key={String(item.id)} exercise={item} 
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
                <View style={{height:160}}/>
            </View>}
                
        </View>

        </>
    );
}