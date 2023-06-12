import React from "react"
import {View, Text, Button, Image} from "react-native"
import styles from "./style"

export default function WelcomeScreen() {
    return (
        <View style={styles.body}>
            <View style={{height:60}}/>
            
            <View style={styles.viewLogo}>
                <Image style={styles.imgLogo}
                source={require('./logo_small.png')} />
            </View>
            
            <View style={{height:40}}/>

            <Text>
            Workout Hero está aqui para elevar seus limites, ajudá-lo a alcançar suas metas e celebrar cada conquista ao longo do caminho. Prepare-se para uma experiência transformadora, repleta de energia e motivação!
            </Text>

            <View style={{height:100}}/>

            <Button style={styles.btn}
            title="Começar a minha jornada"></Button>
            
            <View style={{height:20}}/>
            
            <Button style={styles.btn}
            title="Já tenho uma conta"></Button>
        </View>
    );
}
