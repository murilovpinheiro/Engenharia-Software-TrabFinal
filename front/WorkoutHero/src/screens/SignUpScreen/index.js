import React, { useState } from "react"
import {View, Text, TextInput, Button, Image} from "react-native"
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./style"


export default function SignUpScreen() {

    const [selectedSexo, setSelectedSexo] = useState("");
    const selectDataSexo = [
        {'key':'1', value:'Feminino'}, {'key':'2', value:'Masculino'}, {'key':'3', value:'Outro'} 
    ];
    
    return (
        <View style={styles.body}>
            <View style={{height:40}}/>
            
            <Text>Criar uma conta</Text>
            
            <View style={{height:20}}/>

            <Text>NOME</Text>
            <TextInput style={styles.textInput}
            ></TextInput>
            <View style={{height:20}}/>

            {/* QUEBRADO */}
            {/* <Text>NASCIMENTO</Text>
            <DateTimePicker  
                mode='date'
                value={new Date()} 
                onChange={setDate}
                // onDateChange={setDate} 
            /> */}
            
            <Text>SEXO</Text>
            <SelectList
                setSelected={(val) => setSelectedSexo(val)}
                data={selectDataSexo} save="value"
                search={false}
            />
            
            <View style={{height:20}}/>

            <View style={{flexDirection:'row'}}>
                <View style={{flex:0.45}}>
                    <Text>ALTURA</Text>
                    <TextInput style={styles.textInput}
                    ></TextInput>
                </View>
                <View style={{flex:0.1}}/>
                <View style={{flex:0.45}}>
                    <Text>PESO</Text>
                    <TextInput style={styles.textInput}
                    ></TextInput>
                </View>
            </View>
            
            <View style={{height:20}}/>

            <Text>EMAIL</Text>
            <TextInput style={styles.textInput}
            ></TextInput>
            <View style={{height:20}}/>

            <Text>SENHA</Text>
            <TextInput style={styles.textInput}
            ></TextInput>
            <Text>CONFIRMAR SENHA</Text>
            <TextInput style={styles.textInput}
            ></TextInput>
            <View style={{height:20}}/>

            <View style={styles.viewError}>
                <Text style={styles.textError}>Mensagens de erro vão aqui.</Text>
            </View>
            
            <View style={{height:20}}/>

            <Button
            title="Continuar"></Button>
        
        </View>
    );
}
