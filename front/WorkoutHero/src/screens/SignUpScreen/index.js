import React, { useState, useContext } from "react"
import {View, Text, TextInput, Button, Image} from "react-native"
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./style"


import RPGImageBackground from "../../components/RPGImageBackground";
import MyButtonRegular from "../../components/MyButton/MyButtonRegular";
import MyTextInput from "../../components/MyTextInput/MyTextInput";
import MyTextRegular from "../../components/MyText/MyTextRegular";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../AuthContext";

export default function SignUpScreen() {

    var navigation = useNavigation()

    const { trySignUp } = useContext(AuthContext)

    const [ nome, setNome ] = useState('')
    const [ altura, setAltura ] = useState(0)
    const [ peso, setPeso ] = useState(0)

    const [ email, setEmail ] = useState('')
    const [ senha, setSenha ] = useState('')
    const [ senhaConfirme, setSenhaConfirme ] = useState('')

    const [selectedSexo, setSelectedSexo] = useState('');
    const selectDataSexo = [
        {'key':'1', value:'Feminino'}, {'key':'2', value:'Masculino'}, {'key':'3', value:'Outro'} 
    ];
    const sexoPraEnum = () => {
        return selectedSexo.charAt(0)
    }

    const [ errorMsg, setErrorMsg ] = useState('')

    const handleAltura = (text) => {
        const value = parseFloat(text);
        if (!isNaN(value)) {
            setAltura(value)
        } else { setAltura('') }   
    }

    const handlePeso = (text) => {
        const value = parseFloat(text);
        if (!isNaN(value)) {
            setPeso(value)
        } else { setPeso('') }   
    }

    const handleSignUp = async () => {
        // testar credenciais
        try {
            if (nome === '') throw new Error("Nome vazio.")
            if (selectedSexo === '') throw new Error("Sexo vazio.")
            if (altura === '' || altura == 0) throw new Error("Altura vazia.")
            if (peso === '' || peso == 0) throw new Error("Peso vazio.")
            if (email === '') throw new Error("Email vazio.")
            if (senha === '') throw new Error("Senha vazia.")
            if (senhaConfirme != senha) throw new Error("Confirme a senha corretamente.")

            var params = {name:nome, sex:sexoPraEnum(), weight:peso, height:altura, login:email, pass:senha}
            console.log("sending request")
            var response = await trySignUp(params)

            console.log(params)
            navigation.reset({
                index: 0, routes: [{name:'MAIN'}]
            })

        } catch (error) {
            setErrorMsg(error.message)
        }

    }
    
    return (
        <>
        <RPGImageBackground/>

        <View style={styles.body}>
            <View style={{flex: 0.05}}/>
            
            {/* <Text>Criar uma conta</Text> */}
            
            <View style={{flex: 0.2, zIndex: 999, borderColor:'red', borderWidth:2}}>
                <MyTextRegular>NOME</MyTextRegular>
                <MyTextInput style={styles.textInput} 
                value={nome} onChangeText={setNome}
                ></MyTextInput>
                
                <MyTextRegular>SEXO</MyTextRegular>
                <SelectList 
                    boxStyles={styles.dropdownBox}
                    dropdownTextStyles={styles.dropdownText}
                    dropdownStyles={styles.dropdownList}
                    inputStyles={styles.dropdownText}
                    // dropdownItemStyles={styles.dropdownList}
                    setSelected={(val) => setSelectedSexo(val)}
                    data={selectDataSexo} save="value"
                    search={false}
                />
            </View>

            <View style={{flex: 0.05}}/>

            <View style={{flexDirection:'row', flex: 0.1, borderColor:'red', borderWidth:2}}>
                <View style={{flex:0.45}}>
                    <MyTextRegular>ALTURA (cm)</MyTextRegular>
                    <MyTextInput style={styles.textInput} inputMode='numeric'
                    value={altura ? altura.toString() : ''} onChangeText={handleAltura}
                    ></MyTextInput>
                </View>
                <View style={{flex:0.1}}/>
                <View style={{flex:0.45}}>
                    <MyTextRegular>PESO (kg)</MyTextRegular>
                    <MyTextInput style={styles.textInput} inputMode='numeric'
                    value={peso ? peso.toString() : ''} onChangeText={handlePeso}
                    ></MyTextInput>
                </View>
            </View>

            <View style={{flex: 0.05}}/>

            <View style={{flex: 0.3, borderColor:'red', borderWidth:2}}>
                <MyTextRegular>EMAIL</MyTextRegular>
                <MyTextInput style={styles.textInput}
                value={email} onChangeText={setEmail}
                ></MyTextInput>

                <MyTextRegular>SENHA</MyTextRegular>
                <MyTextInput style={styles.textInput}
                value={senha} onChangeText={setSenha}
                ></MyTextInput>

                <MyTextRegular>CONFIRMAR SENHA</MyTextRegular>
                <MyTextInput style={styles.textInput}
                value={senhaConfirme} onChangeText={setSenhaConfirme}
                ></MyTextInput>
            </View>

            <View style={{flex: 0.05}}/>

            <View style={styles.viewError}>
                <Text style={styles.textError}>{errorMsg}</Text>
            </View>
            
            <View style={{flex: 0.05}}/>

            <View  style={styles.viewButton}>
                <MyButtonRegular style={styles.button}
                title="Continuar" onPress={handleSignUp}
                />
            </View>
        
        </View>
        </>
    );
}
