import React from "react"
import {View, TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "./style"

import MyTextRegular from "../MyText/MyTextRegular";
import MyTextH3 from "../MyText/MyTextH3";
import MyButtonThin from "../MyButton/MyButtonThin.js"

export default function ExerciseOptions(props) {
    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <View style={styles.headerImg}>
                </View>

                <View style={styles.headerTextView}>
                    <MyTextH3 style={styles.headerTextName}>Flexão com Peso</MyTextH3>
                    <MyTextRegular style={styles.headerTextType}>GRUPO MUSCULAR: PEITO</MyTextRegular>
                </View>

                <TouchableOpacity style={styles.headerDelete}>
                    <AntDesign name='delete' color='white' size={32}/>
                </TouchableOpacity>
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