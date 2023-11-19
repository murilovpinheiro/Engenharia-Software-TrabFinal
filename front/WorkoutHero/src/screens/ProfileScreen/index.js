import React, { useEffect, useState, useContext } from "react"
import {View, Text, processColor, Button, Image} from "react-native"
import * as Progress from 'react-native-progress';
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import styles from "./style"
import Ionicons from '@expo/vector-icons/Ionicons';

import MyButtonRegular from "../../components/MyButton/MyButtonRegular";
import MyTextRegular from "../../components/MyText/MyTextRegular";
import MyTextH3 from "../../components/MyText/MyTextH3";

import { AuthContext } from "../../AuthContext";

import { useIsFocused } from "@react-navigation/native";

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export default function ProfileScreen() {
    
    const { userData } = useContext(AuthContext)

    const [info, setInfo] = useState({})

    const isFocused = useIsFocused();

    useEffect(() => {
        console.log("USUARIOOOOOOOOPERFIL", userData)
        fetchUserData()
    }, [])

    useEffect(() => {
        fetchUserData()
        console.log("\n\nFOCADO\n\n", userData)
    }, [isFocused])


    const fetchUserData = async () => {
        const url = `https://apiworkouthero.onrender.com/historic/select?user_id=${userData["id"]}`;

        let response = null;

        try {
            response = await axios.get(url)
            const { days_trained, reps_done } = response.data[0]
            const xp = userData["xp"]
            const exercicios_feitos = userData["exercisesRealized"]
            const repeticoes = userData["repsRealized"]
            console.log('\n\n\nXP, EXS E REPS: ', xp, exercicios_feitos, repeticoes )
            setInfo({xp, exercicios_feitos, repeticoes})
        } catch (error) {
            console.error(error);
            //console.log(JSON.stringify(error))
            if (error.response) {
            console.log(error.response.data);
            }
        }

    };

    if (!userData) {
        return (
            <View style={styles.body}/>
        );
    }

    if (info == {}) return (<View style={styles.body}><>Carregando...</></View>)

    return (
        <>

        <View style={styles.body}>

            <View style={{height:16}}/>

            <View style={styles.viewUser}>
                <View style={styles.viewUserImage}>
                    <Ionicons name="person" size={80} color="black"/>
                </View>

                <View style={{width:24}}/>

                <View style={{flex:1}}>
                    <MyTextH3>{userData["name"]}</MyTextH3>
                    {/* <MyTextRegular>3 semanas ativo 🔥</MyTextRegular> */}
                    <MyTextRegular>Nível {Math.ceil(userData["xp"] / 100)}</MyTextRegular>
                    {/* xp bar é placeholder */}
                    {/* <View style={{height: 16, marginTop: 8, width: '100%', backgroundColor: 'white', borderRadius: 8, padding: 4, overflow: 'hidden'}}>
                        <View style={{height: '100%', backgroundColor: 'blue', width: '80%'}}></View>
                    </View> */}
                    <Progress.Bar 
                        style={{marginTop: 8, width: '100%'}}
                        width={null} height={16} borderRadius={8} borderWidth={2}
                        animationType={'decay'}
                        progress={(userData["xp"] % 100)/100} 
                    />
                </View>

            </View>

            <View style={{flex: 0.05}}/>

            {/* <View style={{marginVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
                <MyTextH3>Estatísticas</MyTextH3>
                <View style={{flex:0.2}}/>
                <MyButtonRegular
                style={{flex: 0.8}}
                title="Últimos 30 dias"
                ></MyButtonRegular>
            </View> */}

            <View style={{flexDirection:'row',alignItems:'center', overflow:'visible', marginVertical:10}}>
                <View style={styles.dividerLeft}></View>
                <MyTextRegular style={{flex:0.4, textAlign:'center'}}>Estatísticas</MyTextRegular>
                <View style={styles.dividerRight}></View>
            </View>

            <View style={{height:16}}/>

            <View style={[styles.viewStats,{height:100}]}>
                <View style={styles.viewSingleStat}>
                    <MyTextRegular style={styles.textStats}>XP total:</MyTextRegular>
                    <MyTextRegular style={styles.textStats2}>{userData["xp"]}</MyTextRegular>
                </View>
                <View style={styles.viewSingleStat}>
                    <MyTextRegular style={styles.textStats}>Exercicios realizados</MyTextRegular>
                    <MyTextRegular style={styles.textStats2}>{userData["exercisesRealized"]}</MyTextRegular>
                </View>
                <View style={styles.viewSingleStat}>
                    <MyTextRegular style={styles.textStats}>Repetições feitas</MyTextRegular>
                    <MyTextRegular style={styles.textStats2}>{userData["repsRealized"]}</MyTextRegular>
                </View>
                {/* <View style={styles.viewStats}>
                    <MyTextRegular style={styles.textStats}>Horas treinando</MyTextRegular>
                    <MyTextRegular style={styles.textStats2}>27h 31min</MyTextRegular>
                </View> */}
            </View>

        </View>

        </>
    );
}