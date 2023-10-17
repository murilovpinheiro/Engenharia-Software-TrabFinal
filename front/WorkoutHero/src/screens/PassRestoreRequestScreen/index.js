import React, { useContext, useEffect, useState } from "react"
import {View, Text, TextInput, Button, Image} from "react-native"
import { useNavigation } from "@react-navigation/native";
import styles from "./style"
import MyTextRegular from "../../components/MyText/MyTextRegular";
import MyButtonRegular from "../../components/MyButton/MyButtonRegular";
import MyTextInputLow from "../../components/MyTextInput/MyTextInputLow";
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

    const { trySendEmail } = useContext(AuthContext)

    const handleEnviarEmail = async () => {
        try {
            var response = await trySendEmail(email)
        } catch (error) {
            console.log('ERRO HANDLE ENVIAR EMAIL', error);
        }
    }

    return (
        <>
        
        <View style={styles.body}>
            <View style={{height: 100}}/>
            
            <View style={styles.viewLogo}>
                <Image style={styles.imgLogo}
                source={require('../WelcomeScreen/WorkoutHero_Logo1.png')} />
            </View>
            
            <View style={{height: 32}}/>

            <View style={styles.viewContent}> 
                <MyTextH3>Esqueceu a senha?</MyTextH3>
                <View style={{height: 16}}/>
                <MyTextRegular>  EMAIL</MyTextRegular>
                <MyTextInputLow 
                style={styles.textInput} autoComplete='email'
                value={email} onChangeText={setEmail}
                ></MyTextInputLow>
                <View style={{height: 16}}/>
                <View style={styles.viewError}>
                    <Text style={styles.textError}>{errorMsg}</Text>
                </View>
                <View style={{height: 32}}/>
                <View  style={styles.viewButton}>
                    <MyButtonRegular style={styles.button}
                    title="Enviar Email"
                    onPress={handleEnviarEmail}
                    />
                </View>
            </View>
            
        
        </View>

        </>
    );
}
