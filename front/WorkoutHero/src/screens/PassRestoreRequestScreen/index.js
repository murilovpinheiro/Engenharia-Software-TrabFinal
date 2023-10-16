import React, { useContext, useEffect, useState } from "react"
import {View, Text, TextInput, Button, Image} from "react-native"
import { useNavigation } from "@react-navigation/native";
import styles from "./style"
import MyTextRegular from "../../components/MyText/MyTextRegular";
import MyButtonRegular from "../../components/MyButton/MyButtonRegular";
import MyTextInput from "../../components/MyTextInput/MyTextInput";
import MyTextH3 from "../../components/MyText/MyTextH3";


import { AuthContext } from "../../AuthContext"

export default function PassRestoreRequestScreen() {

    const navigation = useNavigation();

    const [ email, setEmail ] = useState('')
    // const [ password, setPassword ] = useState('')
    const [ errorMsg, setErrorMsg ] = useState('')

    // const { tryLogin } = useContext(AuthContext);

    // const handleRestoreRequest = async () => {
    //     // testar credenciais
    //     try {
    //         var response = await tryLogin(username, password)
    //         //console.log(response)
    //         navigation.reset({
    //             index: 0, routes: [{name:'MAIN'}]
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         setErrorMsg(error.message)
    //     }

    //     // navigation.reset({
    //     //     index: 0, routes: [{name:'MAIN'}]
    //     // })
    // }

    return (
        <>
        
        <View style={styles.body}>
            <View style={{flex: 0.05}}/>
            
            <View style={styles.viewLogo}>
                <Image style={styles.imgLogo}
                source={require('./logo_small.png')} />
            </View>
            
            <View style={{flex: 0.1}}/>

            <MyTextH3>Esqueceu a senha?</MyTextH3>
            <View style={{flex: 0.05}}/>

            <MyTextRegular>EMAIL</MyTextRegular>
            <MyTextInput 
            style={styles.textInput} autoComplete='email'
            value={email} onChangeText={setEmail}
            ></MyTextInput>

            <View style={{flex: 0.05}}/>

            {/* <MyTextRegular>SENHA</MyTextRegular>
            <MyTextInput style={styles.textInput} 
            autoComplete='current-password'
            value={password} onChangeText={setPassword}
            secureTextEntry = {true}
            ></MyTextInput> */}

            <View style={{flex: 0.05}}/>

            <View style={styles.viewError}>
                <Text style={styles.textError}>{errorMsg}</Text>
            </View>
            

            <View style={{flex: 0.05}}/>


            <View  style={styles.viewButton}>
                <MyButtonRegular style={styles.button}
                title="Enviar Email"
                // onPress={handleLogin}
                />
            </View>
            

            <View style={{flex: 0.1}}/>
        
        </View>

        </>
    );
}
