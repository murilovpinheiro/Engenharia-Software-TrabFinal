import React, { useEffect, useState, useContext } from "react"
import {View, Text, processColor, Button, Image} from "react-native"
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import styles from "./style"

import MyButtonRegular from "../../components/MyButton/MyButtonRegular";
import MyTextRegular from "../../components/MyText/MyTextRegular";
import MyTextH3 from "../../components/MyText/MyTextH3";
import RPGImageBackground from "../../components/RPGImageBackground";

import { AuthContext } from "../../AuthContext";

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export default function ProfileScreen() {
    
    const { userData } = useContext(AuthContext)

    useEffect(() => {
        fetchUserData()
    }, [])

    const fetchUserData = async () => {
    };

    if (!userData) {
        return (
            <><RPGImageBackground/></>
        );
    }

    return (
        <>
        <RPGImageBackground/>

        <View style={styles.body}>

            <View style={styles.viewUser}>
                <MyTextH3>{userData["name"]}</MyTextH3>
                <MyTextRegular>3 semanas ativo 🔥</MyTextRegular>
                <MyTextRegular>{userData["xp"]} XP</MyTextRegular>
                {/* xp bar é placeholder */}
                <View style={{height: 16, marginTop: 8, width: '100%', backgroundColor: 'white', borderRadius: 8, padding: 4, overflow: 'hidden'}}>
                    <View style={{height: '100%', backgroundColor: 'blue', width: '80%'}}></View>
                </View>
            </View>

            <View style={{flex: 0.05}}/>

            <View style={{marginVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
                <MyTextH3>Estatísticas</MyTextH3>
                <View style={{flex:0.2}}/>
                <MyButtonRegular
                style={{flex: 0.8}}
                title="Últimos 30 dias"
                ></MyButtonRegular>
            </View>

            <View style={{flex: 0.05}}/>

            <View style={{flex: 0.7}}>
                {/* <ExerciseChart/> */}
            </View>

            <View style={{flex: 0.05}}/>

            <View style={styles.viewStats}>
                <MyTextRegular style={styles.textStats}>Exercicios realizados</MyTextRegular>
                <MyTextRegular style={styles.textStats2}>14</MyTextRegular>
            </View>
            <View style={styles.viewStats}>
                <MyTextRegular style={styles.textStats}>Peso total levantado</MyTextRegular>
                <MyTextRegular style={styles.textStats2}>2300 kg</MyTextRegular>
            </View>
            <View style={styles.viewStats}>
                <MyTextRegular style={styles.textStats}>Repetições feitas</MyTextRegular>
                <MyTextRegular style={styles.textStats2}>423</MyTextRegular>
            </View>
            <View style={styles.viewStats}>
                <MyTextRegular style={styles.textStats}>Horas treinando</MyTextRegular>
                <MyTextRegular style={styles.textStats2}>27h 31min</MyTextRegular>
            </View>

        </View>

        </>
    );
}