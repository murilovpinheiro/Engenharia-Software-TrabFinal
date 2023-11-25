import React from "react"
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native'
import styles from "./style"

import MyTextRegular from "../MyText/MyTextRegular";
import MyTextH3 from "../MyText/MyTextH3";

import Images from "../../Images";

export default function RoutinePreview(props) {
    // console.log("PROPS: props")
    var routine =  props.routine
    console.log("TREINO: ", routine.name, "  ", routine, "\n")
    var exerciseList = routine["exerciseList"]

    var getAllExercisePreviews = (list) => {
        var returnList = []
        for (let i = 0; i < list.length; i++) {
            var exercise = list[i]
            console.log("EXERCICIO: ", exercise)
            // var imgName = exercise.imgName// + ".jpg"
            
            // let nomeFormatado = exercise.name
            var nomeFormatado = exercise.name.replace(new RegExp('_', "g"), ' ').slice(0, 14) + '... ';
            if (nomeFormatado.length < 15) nomeFormatado = nomeFormatado.slice(0, nomeFormatado.length-4)
            
            returnList.push(
                <View key={i}>
                {/* // <View key={i} style={{borderWidth: 2, borderColor:'gold', borderRadius: 8, height: 80, margin: 8}}> */}
                    <MyTextRegular style={ {width: '100%', textAlign: 'center' } }>{nomeFormatado}</MyTextRegular>
                    {Images.exerciseImages2[exercise.name.replace(/\([^)]*\)/g, '').trim()] && <Image style={styles.img} key={i}
                    source={ Images.exerciseImages2[exercise.name.replace(/\([^)]*\)/g, '').trim()] }
                    //source={ img }
                    onError={(error) => console.log('Image loading error:', error)}
                    />}
                {/* // </View>  */}
                </View>
            )
        }
        return returnList
    }

    // var retExercise = {
    //     name: originalExercise["nome"],

    // }


    return (
        <View {...props}
        activeOpacity={0.6} 
        style={styles.body}>
            
            <MyTextH3 style={styles.headerText}>{routine.name}</MyTextH3>
            
            <ScrollView horizontal={true} style={styles.scroll}>
                
                { getAllExercisePreviews(exerciseList) }

            </ScrollView>
            
            <TouchableOpacity style={{padding: 4}} onPress={props.onPress}>
                <MyTextRegular>Ver Detalhes</MyTextRegular>
            </TouchableOpacity>

        </View>
    );
}