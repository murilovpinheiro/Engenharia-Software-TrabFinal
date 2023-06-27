import React, { useState } from "react"
import {View, TouchableOpacity, ScrollView, TextInput} from "react-native"
import styles from "./style"

import RPGImageBackground from "../../components/RPGImageBackground";
import RoutinePreview from "../../components/RoutinePreview/RoutinePreview";

export default function RoutinesListScreen() {
    
    var exampleRoutine = {
        nome: "Vários Agachamentos",
        exerciseList: [
            {nome:"Barbell Full Squat", imagem:"Barbell_Full_Squat"},
            {nome:"Barbell Full Squat", imagem:"Barbell_Full_Squat"},
            {nome:"Barbell Full Squat", imagem:"Barbell_Full_Squat"},
        ]
    }
    
    return (
        <><RPGImageBackground/>
        
        <View style={styles.body}>
            <ScrollView style={styles.scrollBody}>

                <RoutinePreview onPress={() => console.log("EU QUERO O TREINO: ", exampleRoutine.nome)} routine={exampleRoutine}/>
                <RoutinePreview onPress={() => console.log("EU QUERO O TREINO: ", exampleRoutine.nome)} routine={exampleRoutine}/>
                <RoutinePreview onPress={() => console.log("EU QUERO O TREINO: ", exampleRoutine.nome)} routine={exampleRoutine}/>
                <RoutinePreview onPress={() => console.log("EU QUERO O TREINO: ", exampleRoutine.nome)} routine={exampleRoutine}/>
                {/* <RoutinePreview/>
                <RoutinePreview/> */}

            </ScrollView>
        </View>
        
        </>
    );
}