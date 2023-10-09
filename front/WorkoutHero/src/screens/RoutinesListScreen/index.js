import React, { useState, useContext, useEffect } from "react"
import {View, TouchableOpacity, ScrollView, TextInput} from "react-native"
import styles from "./style"

import RPGImageBackground from "../../components/RPGImageBackground";
import RoutinePreview from "../../components/RoutinePreview/RoutinePreview";
import { useNavigation } from "@react-navigation/core";

import axios from 'axios'
import MyTextRegular from "../../components/MyText/MyTextRegular";
import MyTextH1 from "../../components/MyText/MyTextH1";
import MyButtonRegular from "../../components/MyButton/MyButtonRegular";
import MyTextH3 from "../../components/MyText/MyTextH3";

const baseUrl = 'https://apiworkouthero.onrender.com'

export default function RoutinesListScreen() {
    
    var navigation = useNavigation()
    const [ loading, setLoading ] = useState(true)
    const [ routinesList, setRoutinesList ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            await pegarTodosTreinos();
          } catch (error) {
            console.log("error in fetchdata")
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
    }, []);


    // var exampleRoutine = {
    //     nome: "Vários Agachamentos",
    //     exerciseList: [
    //         {nome:"Barbell Full Squat", imagem:"Barbell_Full_Squat", grupos_musculares:["Costas","Coxas","Quadril"]},
    //         {nome:"Barbell Full Squat", imagem:"Barbell_Full_Squat", grupos_musculares:["Costas","Coxas","Quadril"]},
    //         {nome:"Barbell Full Squat", imagem:"Barbell_Full_Squat", grupos_musculares:["Costas","Coxas","Quadril"]},
    //     ]
    // }

    //var routinesList = [exampleRoutine, exampleRoutine]

    
    const pegarTodosTreinos = async () => {
        // console.log("Fetching todos treinos...");
        var url = baseUrl + `/WORKOUT/select?user_id=1`;
        let data = null;
        let response = null;

        try {
            response = await axios.get(url)

            // logica de sort de treinos
            let listaTreinos = response.data;
            for (let i = 0; i < listaTreinos.length; ++i) {
                let exListAtual = listaTreinos[i].exerciseList;
                const listaOrdenada = exListAtual.sort((a, b) => a.Workout_Exercise.id - b.Workout_Exercise.id);
                listaTreinos[i].exerciseList = listaOrdenada;
            }

            // console.log("Data: ", listaTreinos)
            setRoutinesList(listaTreinos)

        } catch (error) {
            //console.log("error from pegarTodosTreinos")
            console.error(error)
            if (error.response) console.log(error.response.data)
        }

        setLoading(false)
    }

    // const pegaTreino = async (idTreino) => {

    //     const treino = {
    //       id: idTreino,
    //       nome: '',
    //       exerciciosId: [], exercicios: []
    //     };
    
    //     var url = baseUrl + `/WORKOUT/select?id=${idTreino}`;
    //     let data = null;
    //     let response = null;
    
    //     try {
    //         response = await axios.get(url);
    //         treino.nome = response.data[0].obj;
    //     } catch (error) {
    //         console.error(error);
    //         //console.log(JSON.stringify(error))
    //         if (error.response) {
    //           console.log(error.response.data);
    //         }
    //     }
    
    //     url = baseUrl + `/WORKOUT_EXERCISE/select?workout_id=${idTreino}`;
    //     data = null;
    //     response = null;
    
    //     try {
    //         response = await axios.get(url);
    
    //         // logica de sort e for para pegar os ids
    //         const listaObjetos = response.data;
    //         const listaOrdenada = listaObjetos.sort((a, b) => a.id - b.id);
    //         const listaExerciseId = listaOrdenada.map(objeto => objeto.exercise_id);
    
    //         treino.exerciciosId = listaExerciseId;
    
    //         console.log('TREINO:', treino);

    //         for (let i = 0; i < treino.exerciciosId.length; i++) {
    //             var e = await pegaExercicio(treino.exerciciosId[i])
    //             if (e) treino.exercicios.push(e)
                
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         if (error.response) {
    //           console.log(error.response.data);
    //         }
    //     }

    //     return treino
    // }

    // const pegaExercicio = async (idExercicio) => {
    //     const url = baseUrl + `/EXERCISE/select?id=${idExercicio}`;
    //     let objFiltrado = null
    //     let response = null;
    
    //     try {
    //         response = await axios.get(url);
    //         const { id, name, difficulty, sets, reps } = response.data[0];
    //         objFiltrado = { id, name, difficulty, sets, reps };
    //         console.log(objFiltrado);
    //     } catch (error) {
    //         console.error(error);
    //         //console.log(JSON.stringify(error))
    //         if (error.response) {
    //           console.log(error.response.data);
    //         }
    //     }
    //     return objFiltrado
    // }

    const openRoutineView = (selectedRoutine) => {
        navigation.navigate("Detalhes", {routine: selectedRoutine})
    }

    const makePreviews = () => {
        var retList = []
        for (let i = 0; i < routinesList.length; i++){
            let r = routinesList[i]
            retList.push(
                <RoutinePreview key={i} onPress={() => openRoutineView(r)} routine={r}/>
            )
        }
        return retList
    }

    if (loading) {
        
        return (
        // <><RPGImageBackground/></>
        <View style={styles.body}>
            <MyTextRegular>
                Carregando...
            </MyTextRegular>
            
        </View>
        )
    }

    return (
        <>
        
        <View style={styles.body}>
            <MyTextH1>Rotinas</MyTextH1>

            <View style={{height:40}}/>

            <MyButtonRegular style={styles.btn} 
            title="Criar Nova Rotina">
            </MyButtonRegular>

            <View style={{height:10}}/>
            <View style={{flexDirection:'row',alignItems:'center', overflow:'visible', marginVertical:10}}>
                <View style={styles.dividerLeft}></View>
                <MyTextRegular style={{flex:0.4, textAlign:'center'}}>Minhas Rotinas</MyTextRegular>
                <View style={styles.dividerRight}></View>
            </View>

            <ScrollView style={styles.scrollBody}>
                {makePreviews()}
            </ScrollView>
        </View>
        
        </>
    );
}