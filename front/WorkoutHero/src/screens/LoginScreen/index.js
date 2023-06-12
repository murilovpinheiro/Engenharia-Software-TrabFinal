import React from "react"
import {View, Text, TextInput, Button, Image} from "react-native"
import styles from "./style"

export default function LoginScreen() {
    return (
        <View style={styles.body}>
            <View style={{height:40}}/>
            
            <View style={styles.viewLogo}>
                <Image style={styles.imgLogo}
                source={require('./logo_small.png')} />
            </View>
            
            <View style={{height:20}}/>

            <Text>USUÁRIO OU E-MAIL</Text>
            <TextInput style={styles.textInput}
            ></TextInput>

            <View style={{height:20}}/>

            <Text>SENHA</Text>
            <TextInput style={styles.textInput}
            ></TextInput>

            <View style={{height:20}}/>

            <View style={styles.viewError}>
                <Text style={styles.textError}>Mensagens de erro vão aqui.</Text>
            </View>
            


            <View style={{height:40}}/>

            <Button
            title="Continuar"></Button>
        
        </View>
    );
}
