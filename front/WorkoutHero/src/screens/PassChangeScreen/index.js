import React, { useContext, useEffect, useState } from "react"
import {View, Text, TextInput, Button, Image, TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native";
import styles from "./style"
import MyTextRegular from "../../components/MyText/MyTextRegular";
import MyButtonRegular from "../../components/MyButton/MyButtonRegular";
import MyTextInput from "../../components/MyTextInput/MyTextInput";
import MyButtonThin from "../../components/MyButton/MyButtonThin.js"

import { AuthContext } from "../../AuthContext"

export default function PassChangeScreen() {

    const navigation = useNavigation();

    const [ newPassword, setNewPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ errorMsg, setErrorMsg ] = useState('')

    const [ btnDisabled, setBtnDisabled ] = useState(false)

    // const { tryLogin } = useContext(AuthContext);


    // const handlePassRestoreRequest = () => {
    //     navigation.push('PASSCHANGEREQUEST', {});
    // }

    const handlePassChange = async () => {
        setBtnDisabled(true)

        // testar credenciais
        // try {
        //     var response = await tryLogin(username, password)
        //     //console.log(response)
        //     navigation.reset({
        //         index: 0, routes: [{name:'MAIN'}]
        //     })
        // } catch (error) {
        //     console.log(error)
        //     setErrorMsg(error.message)
        // }

        setBtnDisabled(false)

        // navigation.reset({
        //     index: 0, routes: [{name:'MAIN'}]
        // })
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
                <MyTextRegular>  NOVA SENHA</MyTextRegular>
                <MyTextInput 
                style={styles.textInput} autoComplete='current-password'
                value={newPassword} onChangeText={setNewPassword}
                ></MyTextInput>
                <View style={{height: 16}}/>
                <MyTextRegular>   CONFIRME A SENHA</MyTextRegular>
                <MyTextInput style={styles.textInput} 
                autoComplete='current-password'
                value={confirmPassword} onChangeText={setConfirmPassword}
                secureTextEntry = {true}
                ></MyTextInput>
                <View style={{height: 16}}/>
                <View style={styles.viewError}>
                    <Text style={styles.textError}>{errorMsg}</Text>
                </View>
                <View style={{height: 16}}/>
                <View  style={styles.viewButton}>
                    <MyButtonRegular 
                    // style={[styles.button, {backgroundColor: btnDisabled ? '#fff5' : AppStyles.colors.accent }]}
                    style={[styles.button]}
                    title="Redefinir Senha"
                    onPress={handlePassChange}
                    disabled={btnDisabled}
                    />
                </View>
            </View>     
        
        </View>
        </>
    );
}
