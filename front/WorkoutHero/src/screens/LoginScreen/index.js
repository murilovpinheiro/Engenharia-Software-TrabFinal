import React from "react"
import {View, Text, TextInput, Button, Image} from "react-native"
import styles from "./style"
import RPGImageBackground from "../../components/RPGImageBackground";
import MyTextRegular from "../../components/MyText/MyTextRegular";
import MyButtonRegular from "../../components/MyButton/MyButtonRegular";
import MyTextInput from "../../components/MyTextInput/MyTextInput";

export default function LoginScreen() {
    return (
        <>
        <RPGImageBackground />
        
        <View style={styles.body}>
            <View style={{flex: 0.05}}/>
            
            <View style={styles.viewLogo}>
                <Image style={styles.imgLogo}
                source={require('./logo_small.png')} />
            </View>
            
            <View style={{flex: 0.1}}/>

            <MyTextRegular>USUÁRIO OU E-MAIL</MyTextRegular>
            <MyTextInput style={styles.textInput} autoComplete='email'
            ></MyTextInput>

            <View style={{flex: 0.05}}/>

            <MyTextRegular>SENHA</MyTextRegular>
            <MyTextInput style={styles.textInput}  autoComplete='current-password'
            ></MyTextInput>

            <View style={{flex: 0.05}}/>

            <View style={styles.viewError}>
                <Text style={styles.textError}>Mensagens de erro vão aqui.</Text>
            </View>
            

            <View style={{flex: 0.05}}/>


            <View  style={styles.viewButton}>
                <MyButtonRegular style={styles.button}
                title="Continuar"></MyButtonRegular>
            </View>
            

            <View style={{flex: 0.1}}/>
        
        </View>

        </>
    );
}
