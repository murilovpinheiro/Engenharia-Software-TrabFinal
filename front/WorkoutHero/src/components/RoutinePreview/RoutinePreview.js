import React from "react"
import {View, TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "./style"

import MyTextRegular from "../MyText/MyTextRegular";
import MyTextH3 from "../MyText/MyTextH3";
import MyButtonThin from "../MyButton/MyButtonThin.js"
import { ScrollView } from "react-native-gesture-handler";

export default function RoutinePreview(props) {
    return (
        <View style={styles.body}>
            <MyTextH3 style={styles.headerText}>Exercícios Abdominais</MyTextH3>

            <ScrollView horizontal={true} style={styles.scroll}>
                <AntDesign name='delete' color='white' size={128}/>
                <AntDesign name='delete' color='white' size={128}/>
                <AntDesign name='delete' color='white' size={128}/>
                <AntDesign name='delete' color='white' size={128}/>
                <AntDesign name='delete' color='white' size={128}/>
                <AntDesign name='delete' color='white' size={128}/>
            </ScrollView>
        </View>
    );
}