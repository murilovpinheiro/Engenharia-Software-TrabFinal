import React from "react"
import {View, Text, Button, Image} from "react-native"
import { useNavigation } from "@react-navigation/native";
import styles from "./style"
import MyTextRegular from "../../components/MyText/MyTextRegular";
import MyButtonRegular from "../../components/MyButton/MyButtonRegular";


export default function WelcomeScreen() {

    const navigation = useNavigation();

    // const handleButtonPress = () => {
    //     navigation.navigate("Other");
    // };

    return (

        <View style={styles.body}>
            <View style={{flex: 0.05}}/>
            
            <View style={styles.viewLogo}>
                <Image style={styles.imgLogo}
                source={require('./WorkoutHero_Logo1.png')} />
            </View>
            
            <View style={{flex:0.05}}/>

            <MyTextRegular style={styles.text}>
            Workout Hero está aqui para elevar seus limites, ajudá-lo a alcançar suas metas e celebrar cada conquista ao longo do caminho. Prepare-se para uma experiência transformadora, repleta de energia e motivação!
            </MyTextRegular>

            <View style={{flex:0.05}}/>

            <View style={{flex:0.2}}>
                <MyButtonRegular style={styles.btn1}
                                 title="Começar a minha jornada"
                                 onPress={() => {console.log("BOTAO COMEÇAR JORNADA"); navigation.navigate('CRIAR CONTA')}}>
                </MyButtonRegular>
                
                <View style={{height:16}}/>
                
                <MyButtonRegular style={styles.btn2}
                                 title="Já tenho uma conta"
                                 onPress={() => {console.log("BOTAO LOGIN"); navigation.navigate('LOGIN')}}>
                </MyButtonRegular>
            </View>

        </View>
    );
}
