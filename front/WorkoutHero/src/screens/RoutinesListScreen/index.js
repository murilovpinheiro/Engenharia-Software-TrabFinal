import React, { useState } from "react"
import {View, TouchableOpacity, ScrollView, TextInput} from "react-native"
import styles from "./style"

import RPGImageBackground from "../../components/RPGImageBackground";
import RoutinePreview from "../../components/RoutinePreview/RoutinePreview";

export default function RoutinesListScreen() {
    return (
        <><RPGImageBackground/>
        
        <View style={styles.body}>
            <ScrollView style={styles.scrollBody}>

                <RoutinePreview/>
                <RoutinePreview/>
                <RoutinePreview/>

            </ScrollView>
        </View>
        
        </>
    );
}