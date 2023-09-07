import React, { useContext, useEffect, useState } from "react"
import {View, Text, TextInput, Button, Image} from "react-native"
import { useNavigation } from "@react-navigation/native";
import styles from "./style"
import RPGImageBackground from "../../components/RPGImageBackground";
import MyTextRegular from "../../components/MyText/MyTextRegular";
import MyButtonRegular from "../../components/MyButton/MyButtonRegular";
import MyTextInput from "../../components/MyTextInput/MyTextInput";

import { AuthContext } from "../../AuthContext"

export default function LoginScreen() {

    const navigation = useNavigation();

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errorMsg, setErrorMsg ] = useState('')

    const { tryLogin } = useContext(AuthContext);


    const handleLogin = async () => {
        // testar credenciais
        try {
            var response = await tryLogin(username, password)
            //console.log(response)
            navigation.reset({
                index: 0, routes: [{name:'MAIN'}]
            })
        } catch (error) {
            console.log(error)
            setErrorMsg(error.message)
        }

        // navigation.reset({
        //     index: 0, routes: [{name:'MAIN'}]
        // })
    }

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

            <MyTextRegular>E-MAIL</MyTextRegular>
            <MyTextInput 
            style={styles.textInput} autoComplete='email'
            value={username} onChangeText={setUsername}
            ></MyTextInput>

            <View style={{flex: 0.05}}/>

            <MyTextRegular>SENHA</MyTextRegular>
            <MyTextInput style={styles.textInput} 
            autoComplete='current-password'
            value={password} onChangeText={setPassword}
            secureTextEntry = {true}
            ></MyTextInput>

            <View style={{flex: 0.05}}/>

            <View style={styles.viewError}>
                <Text style={styles.textError}>{errorMsg}</Text>
            </View>
            

            <View style={{flex: 0.05}}/>


            <View  style={styles.viewButton}>
                <MyButtonRegular style={styles.button}
                title="Continuar"
                onPress={handleLogin}
                />
            </View>
            

            <View style={{flex: 0.1}}/>
        
        </View>

        </>
    );
}
