import React from "react"
import {View, Text, ScrollView, TouchableOpacity, Button, Image} from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { StyleSheet } from "react-native";

import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";

import styles from "./style";

export default function TimerScreen() {

    const [currentTime, setCurrentTime] = useState(0);
    const [pausado, SetPausado] = useState(true);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {

        if (!pausado) {
            const id = setInterval(() => {
              setCurrentTime((prevTime) => prevTime + 1);
            }, 1000);
            setIntervalId(id);
        } else {
            clearInterval(intervalId);
        }
        
        return () => clearInterval(intervalId);
        
    }, [pausado])

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        // return totalSeconds;
    };

    return (
        <View style={styles.container}>
            <View style={{ height: '100%', alignItems:'center', justifyContent:'center'}}>
                {/* Conteúdo da tela */}

                <View style={styles.container}>
                    <Text style={styles.timerText}>{formatTime(currentTime)}</Text>
                </View>

                <View style={styles.viewTimer}>
                    <TouchableOpacity>
                        <AntDesign style={styles.btnTimer} name='leftcircle' size={50} color='#808080' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => SetPausado(!pausado)}>
                        <AntDesign style={styles.btnTimer} name={!pausado ? 'pausecircle' : 'playcircleo'} size={50} color={!pausado ? '#F2BD00' : '#A4CF11'} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <AntDesign style={styles.btnTimer} name='rightcircle' size={50} color='#808080' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}