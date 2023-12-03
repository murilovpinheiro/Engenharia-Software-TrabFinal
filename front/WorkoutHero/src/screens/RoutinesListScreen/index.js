import React, { useState, useContext, useEffect } from "react"
import {View, TouchableOpacity, ScrollView, TextInput} from "react-native"
import styles from "./style"

import RoutinePreview from "../../components/RoutinePreview/RoutinePreview";
import { useNavigation } from "@react-navigation/core";
import { useIsFocused } from "@react-navigation/native";

import axios from 'axios'
import MyTextRegular from "../../components/MyText/MyTextRegular";
import MyTextH1 from "../../components/MyText/MyTextH1";
import MyButtonRegular from "../../components/MyButton/MyButtonRegular";
import MyTextH3 from "../../components/MyText/MyTextH3";

import { WorkoutContext } from "../../WorkoutContext";
import { AuthContext } from "../../AuthContext";

const baseUrl = 'https://apiworkouthero.onrender.com'


export default function RoutinesListScreen() {
    
    var navigation = useNavigation()
    const [ loading, setLoading ] = useState(true)
    const [ routinesList, setRoutinesList ] = useState([])

    
    const { userData } = useContext(AuthContext);
    const { getRoutinesFromUser, createWorkoutAlt } = useContext(WorkoutContext)

    const isFocused = useIsFocused();

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
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log('called')
        if (isFocused)
            fetchData();
            
    }, [isFocused])

    const [updateTrigger, setUpdateTrigger] = useState(false)
    useEffect(() => {
        if (updateTrigger) {
            setLoading(false);
            fetchData();
            setUpdateTrigger(false)
        }
    }, [updateTrigger])
    
    const pegarTodosTreinos = async () => {        
        try {
            let routinesListFromApi = await getRoutinesFromUser(userData.id)
            let routinesListFromUser0 = await getRoutinesFromUser(0);
            routinesListFromApi = [...routinesListFromUser0, ...routinesListFromApi]
            console.log("\n TODAS AS ROTINAS:\n", routinesListFromApi)
            setRoutinesList(routinesListFromApi)
        } catch (error) {
            console.error(error)
        }

        setLoading(false)
    }

    const openRoutineView = (selectedRoutine) => {
        navigation.navigate("Detalhes", {routine: selectedRoutine})
    }

    const openRoutineView2 = (selectedRoutine) => {
        navigation.navigate("DetalhesNovo", {routine: selectedRoutine});
    }


    const makePreviews = () => {
        var retList = []
        for (let i = 0; i < routinesList.length; i++){
            let r = routinesList[i]
            if (r.userId == 0) {
                retList.push(
                    <RoutinePreview key={i} onPress={() => openRoutineView(r)} routine={r}/>
                );
            } else {
                retList.push(
                    <RoutinePreview key={i} onPress={() => openRoutineView2(r)} routine={r} throwTrigger={() => setUpdateTrigger(true)}/>
                );
            }
        }
        return retList
    }

    const [routineReady, setRoutineReady] = useState(false);
    const [newRoutine, setNewRoutine] = useState(null);
    useEffect(() => {
        if (routineReady && newRoutine) {
            openRoutineView2(newRoutine);
        }
    }, [routineReady])

    if (loading) {
        
        return (
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
            onPress={
                async () => {
                    setRoutineReady(false);
                    let routine = await createWorkoutAlt(userData.id, 'Novo Treino')
                    setNewRoutine(routine);
                    setRoutineReady(true);
                }
            }
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
                <View style={{height:80}}/>
            </ScrollView>
        </View>
        
        </>
    );
}