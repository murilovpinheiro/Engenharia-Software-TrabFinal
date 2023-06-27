import React, { useState } from "react"
import {View, TouchableOpacity, ScrollView, TextInput} from "react-native"
import styles from "./style"

import RPGImageBackground from "../../components/RPGImageBackground";
import RoutinePreview from "../../components/RoutinePreview/RoutinePreview";
import { useNavigation } from "@react-navigation/core";

export default function RoutinesListScreen() {
    
    var navigation = useNavigation()

    var exampleRoutine = {
        nome: "Vários Agachamentos",
        exerciseList: [
            {nome:"Barbell Full Squat", imagem:"Barbell_Full_Squat", grupos_musculares:["Costas","Coxas","Quadril"]},
            {nome:"Barbell Full Squat", imagem:"Barbell_Full_Squat", grupos_musculares:["Costas","Coxas","Quadril"]},
            {nome:"Barbell Full Squat", imagem:"Barbell_Full_Squat", grupos_musculares:["Costas","Coxas","Quadril"]},
        ]
    }

    var routinesList = [exampleRoutine, exampleRoutine]
    
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

    return (
        <><RPGImageBackground/>
        
        <View style={styles.body}>
            <ScrollView style={styles.scrollBody}>

                {makePreviews()}
            </ScrollView>
        </View>
        
        </>
    );
}