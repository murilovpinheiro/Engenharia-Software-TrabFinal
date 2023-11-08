import React, { useState } from "react"
import {View, TouchableOpacity, Image, CheckBox} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "./style"

import MyTextRegular from "../MyText/MyTextRegular";
import MyTextH3 from "../MyText/MyTextH3";
import MyButtonThin from "../MyButton/MyButtonThin.js"
import Images from "../../Images";



export default function ExerciseOptions({ exercise, onSelect }) {

    const stringFromGroups = (array) => {
        let str = ""
        for (let i = 0; i < array.length; i++){
            str += array[i].name.toUpperCase() + " "
        }
        return str
    }

    const [isSelected, setIsSelected] = useState(false);

    const toggleSelection = () => {
        setIsSelected(!isSelected); // Inverte o estado de seleção
        onSelect(exercise.id); // Chama a função onSelect com o ID do exercício
        console.log('id: ', exercise.id)
    };

    return (
        <View style={styles.body}>
            <View style={styles.header}>
                {/* <Image style={styles.headerImg} source={Images.exerciseImages[exercise.imgName]}/> */}
                <Image style={styles.headerImg} source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png'
                }}/>


                <View style={styles.headerTextView}>
                    <MyTextH3 style={styles.headerTextName}>{exercise.name.replace(/_/g, " ").replace(/\([^()]*\)/g, "")}</MyTextH3>
                    {/* <MyTextRegular style={styles.headerTextType}>GRUPO MUSCULAR: {stringFromGroups(exercise.muscularGroups)}</MyTextRegular> */}
                </View>

                {/* <TouchableOpacity style={styles.headerDelete}>
                    <AntDesign name='delete' color='gray' size={32}/>
                </TouchableOpacity> */}

            </View>

            <View style={styles.viewOptions}>
                <MyButtonThin title={`${exercise.sets} seções de ${exercise.reps} repetições`} style={styles.selectOptions}></MyButtonThin>
            </View>
            <View style={styles.viewOptions}>
                <MyButtonThin onPress={toggleSelection} title={isSelected ? "SELECIONADO" : "Não selecionado"}></MyButtonThin>
            </View>

            <View style={styles.divider}></View>
        </View>
    );
}