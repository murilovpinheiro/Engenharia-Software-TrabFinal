import React, { useState } from "react"
import {View, Text, TextInput, Button, Image} from "react-native"
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./style"


import RPGImageBackground from "../../components/RPGImageBackground";
import MyButtonRegular from "../../components/MyButton/MyButtonRegular";
import MyTextInput from "../../components/MyTextInput/MyTextInput";
import MyTextRegular from "../../components/MyText/MyTextRegular";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {

    const [selectedSexo, setSelectedSexo] = useState("");
    const selectDataSexo = [
        {'key':'1', value:'Feminino'}, {'key':'2', value:'Masculino'}, {'key':'3', value:'Outro'} 
    ];

    var navigation = useNavigation()

    const handleSignUp = () => {
        // testar credenciais

        navigation.reset({
            index: 0, routes: [{name:'MAIN'}]
        })
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
                    ></MyTextInput>
                </View>
                <View style={{flex:0.1}}/>
                <View style={{flex:0.45}}>
                    <MyTextRegular>PESO (kg)</MyTextRegular>
                    <MyTextInput style={styles.textInput} inputMode='numeric'
                    ></MyTextInput>
                </View>
            </View>

            <View style={{flex: 0.05}}/>

            <View style={{flex: 0.3, borderColor:'red', borderWidth:2}}>
                <MyTextRegular>EMAIL</MyTextRegular>
                <MyTextInput style={styles.textInput}
                ></MyTextInput>

                <MyTextRegular>SENHA</MyTextRegular>
                <MyTextInput style={styles.textInput}
                ></MyTextInput>

                <MyTextRegular>CONFIRMAR SENHA</MyTextRegular>
                <MyTextInput style={styles.textInput}
                ></MyTextInput>
            </View>

            <View style={{flex: 0.05}}/>

            <View style={styles.viewError}>
                <Text style={styles.textError}>Mensagens de erro vão aqui.</Text>
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
