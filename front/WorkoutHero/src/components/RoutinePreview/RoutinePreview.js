import React from "react"
import {View, Image, TouchableOpacity} from 'react-native'
import styles from "./style"

import MyTextRegular from "../MyText/MyTextRegular";
import MyTextH3 from "../MyText/MyTextH3";
import { ScrollView } from "react-native-gesture-handler";

import Images from "../../Images";

export default function RoutinePreview(props) {
    // console.log("PROPS: props")
    var routine =  props.routine
    console.log("TREINO: ", routine, "\n")
    var exerciseList = routine["exerciseList"]

    var getAllExercisePreviews = (list) => {
        var returnList = []
        for (let i = 0; i < list.length; i++) {
            var exercise = list[i]
            console.log("EXERCICIO: ", exercise)
            var imgName = exercise.name + ".jpg"

            var nomeFormatado = exercise.name.replace(new RegExp('_', "g"), ' ').slice(0, 14) + '... ';
            if (nomeFormatado.length < 15) nomeFormatado = nomeFormatado.slice(0, nomeFormatado.length-4)
            
            returnList.push(
                <View key={i}>
                {/* // <View key={i} style={{borderWidth: 2, borderColor:'gold', borderRadius: 8, height: 80, margin: 8}}> */}
                    <MyTextRegular style={ {width: '100%', textAlign: 'center' } }>{nomeFormatado}</MyTextRegular>
                    <Image style={styles.img} key={i}
                    source={ Images.exerciseImages[exercise.name] }
                    //source={ img }
                    onError={(error) => console.log('Image loading error:', error)}
                    />
                {/* // </View>  */}
                </View>
            )
        }
        return returnList
    }

    return (
        <View {...props}
        activeOpacity={0.6} 
        style={styles.body}>
            
            <MyTextH3 style={styles.headerText}>{routine.obj}</MyTextH3>
            
            <ScrollView horizontal={true} style={styles.scroll}>
                
                { getAllExercisePreviews(exerciseList) }

            </ScrollView>
            
            <TouchableOpacity onPress={props.onPress}>
                <MyTextRegular>Ver Detalhes</MyTextRegular>
            </TouchableOpacity>

        </View>
    );
}