import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Certifique-se de instalar o pacote
import Images from "../../Images";
import MyButtonThin from '../MyButton/MyButtonThin';
import MyTextH3 from "../MyText/MyTextH3";

const ExerciseOptions2 = ({exercise}) => {

  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
      setIsSelected(!isSelected); // Inverte o estado de seleção
      onSelect(exercise.id); // Chama a função onSelect com o ID do exercício
      console.log('id: ', exercise.id)
  };

  return (
    <View style={styles.container}>

        <View style={styles.container2}>
            <TouchableOpacity >
                <Icon name="trash-o" size={30} color="black" />
            </TouchableOpacity>

            {Images.exerciseImages2[exercise.name.replace(/\([^)]*\)/g, '').trim()] && <Image style={styles.fotoDeFundo} source={Images.exerciseImages2[exercise.name.replace(/\([^)]*\)/g, '').trim()]}/>}
        </View>

        <View>
            <View >
                <Text>{exercise.name}</Text>
                <Text>{exercise.body_part}: {exercise.muscles}</Text>
            </View>
            <MyButtonThin onPress={toggleSelection} title={isSelected ? "SELECIONADO" : "Não selecionado"}></MyButtonThin>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    height:280,
    backgroundColor: 'red'
  },
  container2: {
    flex: 0.7,
    margin: 0,
    height:1,
    borderRadius: 10,
    backgroundColor: 'red'
  },
  fotoDeFundo: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  botaoDeletar: {
    zIndex: 10,
    flex:2,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  fotoSuperior: {
    flex: 0.5,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '50%',
  },
  textoContainer: {
    flex: 0.5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  descricao: {
    fontSize: 16,
    color: 'gray',
  },
});

export default ExerciseOptions2;
