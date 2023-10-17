import React, { useContext, useEffect, useState } from "react"
import {View, Text, TextInput, Button, Image, KeyboardAvoidingView} from "react-native"
import { useNavigation } from "@react-navigation/native";
import styles from "./style"
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


    const handlePassRestoreRequest = () => {
        navigation.push('PASSRESTOREREQUEST', {});
    }

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
        <KeyboardAvoidingView style={styles.body}>
            <View style={{height: 128}}/>
            
            <View style={styles.viewLogo}>
                <Image style={styles.imgLogo}
                source={require('./logo_small.png')} />
            </View>
            
            <View style={{height: 16}}/>

            <MyTextRegular>EMAIL</MyTextRegular>
            <MyTextInput 
            style={styles.textInput} autoComplete='email'
            value={username} onChangeText={setUsername}
            ></MyTextInput>

            <View style={{height: 16}}/>

            <MyTextRegular>SENHA</MyTextRegular>
            <MyTextInput style={styles.textInput} 
            autoComplete='current-password'
            value={password} onChangeText={setPassword}
            secureTextEntry = {true}
            ></MyTextInput>

            <View style={{height: 16}}/>

            <View style={styles.viewError}>
                <Text style={styles.textError}>{errorMsg}</Text>
            </View>
            

            <View style={{height: 16}}/>


            <View  style={styles.viewButton}>
                <MyButtonRegular style={styles.button}
                title="Continuar"
                onPress={handleLogin}
                />
            </View>
            

            <View style={{height: 16}}/>

            <View  style={styles.viewButton}>
                <MyButtonRegular style={styles.button}
                    title="Esqueci a senha"
                    onPress={handlePassRestoreRequest}
                />
            </View>
        
        </KeyboardAvoidingView>

        </>
    );
}
