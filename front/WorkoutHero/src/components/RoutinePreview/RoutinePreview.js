import React from "react"
import {View, Image, TouchableOpacity} from 'react-native'
import styles from "./style"

import MyTextRegular from "../MyText/MyTextRegular";
import MyTextH3 from "../MyText/MyTextH3";
import { ScrollView } from "react-native-gesture-handler";

import Images from "../../Images";
import ImageModal from "react-native-image-modal";

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
            returnList.push(
                <View key={i}>
                {/* // <View key={i} style={{borderWidth: 2, borderColor:'gold', borderRadius: 8, height: 80, margin: 8}}> */}
                    <MyTextRegular>{exercise.name}</MyTextRegular>
                    <ImageModal style={styles.img} key={i}
                    source={{
                        uri: `../../../assets/img/exercises/${imgName}`,
                      }}
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