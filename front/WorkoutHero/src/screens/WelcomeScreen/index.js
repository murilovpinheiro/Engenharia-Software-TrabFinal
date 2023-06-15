import React from "react"
import {View, Text, Button, Image} from "react-native"
import styles from "./style"
import MyTextRegular from "../../components/MyText/MyTextRegular";
import MyButtonRegular from "../../components/MyButton/MyButtonRegular";

export default function WelcomeScreen() {
    return (
        <View style={styles.body}>
            <View style={{flex: 0.05}}/>
            
            <View style={styles.viewLogo}>
                <Image style={styles.imgLogo}
                source={require('./logo_small.png')} />
            </View>
            
            <View style={{flex:0.05}}/>

            <MyTextRegular style={styles.text}>
            Workout Hero está aqui para elevar seus limites, ajudá-lo a alcançar suas metas e celebrar cada conquista ao longo do caminho. Prepare-se para uma experiência transformadora, repleta de energia e motivação!
            </MyTextRegular>

            <View style={{flex:0.05}}/>

            <View style={{flex:0.2}}>
                <MyButtonRegular style={styles.btn}
                title="Começar a minha jornada">
                    {/* <MyTextRegular>Começar a minha jornada</MyTextRegular> */}
                </MyButtonRegular>
                
                <View style={{height:10}}/>
                
                <MyButtonRegular style={styles.btn}
                title="Já tenho uma conta">
                </MyButtonRegular>
            </View>

        </View>
    );
}
