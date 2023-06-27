import React from "react"
import {View, Text, ScrollView, TouchableOpacity, Button, Image} from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { StyleSheet } from "react-native";

import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";

import styles from "./style";

export default function TimerScreen() {

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const [timer, setTimer] = useState(0);

    const startTimer = () => {
        
    };

    const pauseTimer = () => {
        
    };

    const resetTimer = () => {
        
    };

    return (
        <View style={styles.container}>
            <View style={{ height: '100%', alignItems:'center', justifyContent:'center'}}>
                {/* Conteúdo da tela */}

                <View style={styles.container}>
                    <Text style={styles.timerText}>{formatTime(29000)}</Text>
                </View>

                <View style={styles.viewTimer}>
                    <TouchableOpacity onPress={resetTimer}>
                        <AntDesign style={styles.btnTimer} name='leftcircle' size={50} color='#808080' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={timer > 0 ? pauseTimer : startTimer}>
                        <AntDesign style={styles.btnTimer} name={timer > 0 ? 'pausecircle' : 'playcircleo'} size={50} color='#F2BD00' />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <AntDesign style={styles.btnTimer} name='rightcircle' size={50} color='#808080' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}