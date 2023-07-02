import React from "react"
import {View, TouchableOpacity, Image} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "./style"

import MyTextRegular from "../MyText/MyTextRegular";
import MyTextH3 from "../MyText/MyTextH3";
import MyButtonThin from "../MyButton/MyButtonThin.js"
import Images from "../../Images";



export default function ExerciseOptions(props) {
    var exercise = props.exercise

    const stringFromGroups = (array) => {
        let str = ""
        for (let i = 0; i < array.length; i++){
            str += array[i].name.toUpperCase() + " "
        }
        return str
    }

    return (
        <View style={styles.body}>
            <View style={styles.header}>
                {/* <Image style={styles.headerImg} source={Images.exerciseImages[exercise.imagem]}/> */}


                <View style={styles.headerTextView}>
                    <MyTextH3 style={styles.headerTextName}>{exercise.name.replace(/_/g, " ")}</MyTextH3>
                    <MyTextRegular style={styles.headerTextType}>GRUPO MUSCULAR: {stringFromGroups(exercise.muscularGroups)}</MyTextRegular>
                </View>

                {/* <TouchableOpacity style={styles.headerDelete}>
                    <AntDesign name='delete' color='gray' size={32}/>
                </TouchableOpacity> */}
            </View>

            <View style={styles.viewOptions}>
                <MyButtonThin title='MUDAR PRA LIST SELECT' style={styles.selectOptions}></MyButtonThin>
                <MyButtonThin title='MUDAR PRA LIST SELECT' style={styles.selectOptions}></MyButtonThin>
                <MyButtonThin title='MUDAR PRA LIST SELECT' style={styles.selectOptions}></MyButtonThin>
            </View>

            <View style={styles.divider}></View>
        </View>
    );
}