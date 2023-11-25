import React, { useContext, useState, useEffect } from "react"
import {View, Text, ScrollView, TouchableOpacity, Button, Image} from "react-native"
import { Ionicons, AntDesign } from '@expo/vector-icons';
import styles from "./style"

import MyTextH3 from "../../components/MyText/MyTextH3";
import MyTextRegular from "../../components/MyText/MyTextRegular";
import { useNavigation } from "@react-navigation/native";

import { WorkoutContext } from "../../WorkoutContext";
import Images from "../../Images";
import MyButtonThin from "../../components/MyButton/MyButtonThin";
import MyButtonSwitch from "../../components/MyButton/MyButtonSwitch";
import MyTextH1 from "../../components/MyText/MyTextH1";

export default function InTrainingScreen({route}) {

    const params = route.params
    const navigation = useNavigation();
    const { currentWorkout, setCurrentWorkout } = useContext(WorkoutContext)
    const { currentProgressL, setCurrentProgressL } = useContext(WorkoutContext)
    const { currentExerciseIndex, setCurrentExerciseIndex } = useContext(WorkoutContext)
    const { currentExercise, setCurrentExercise } = useContext(WorkoutContext)
    const { finishWorkout } = useContext(WorkoutContext)
    
    const [backgroundColor, setBackgroundColor] = useState('red')

    useEffect(() => {
        console.log('refresh')
      }, [currentProgressL]);

    const setSets = (index) => {
        var newProgressList = currentProgressL
        newProgressList[currentExerciseIndex][index] = !newProgressList[currentExerciseIndex][index]
        setCurrentProgressL(newProgressList)
        console.log("Exercise status: ", currentProgressL)
    }

    const nextExercise = async () => {

        // antes de atualizar o index:
        // setCurrentProgressL((prev) => {
        //     prev[currentExerciseIndex] = sets;
        //     return prev
        // })
        console.log("PROGRESSO ATUAL:", currentProgressL)

        // atualizo o index
        setCurrentExerciseIndex(currentExerciseIndex + 1)
        if (currentExerciseIndex >= currentWorkout.exerciseList.length-1) { // coloquei um menos um aki
            navigation.reset({
                index: 0, routes: [{name:'PERFIL'}]
            })
            await finishWorkout()
        }
    }

    const prevExercise = () => {

        // antes de atualizar o index:
        // setCurrentProgressL((prev) => {
        //     prev[currentExerciseIndex] = sets;
        //     return prev
        // })
        console.log("PROGRESSO ATUAL:", currentProgressL)

        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(currentExerciseIndex - 1)
        }
       
    }

    const handleClockPress = () => {
        // Lógica para navegar para outra tela
        navigation.navigate('TIMERSCREEN');
    };
    
    if (!currentWorkout || !currentExercise) {
        return (
            <>
             <View style={[styles.body,{ flex: 1, justifyContent: "center", alignItems: "center" }]}>
                <MyTextRegular style = {{fontSize: 22}}>
                    Nenhum treino selecionado.
                </MyTextRegular>
             </View>
            </>
        )
    }



    const makeExerciseView = () => {
        var retList = []

        if (currentExercise != null)
            for (let i = 0; i < currentExercise.sets; ++i) {
                retList.push(
                    <MyButtonSwitch 
                    onToggle={() => {
                        setSets(i)
                    }}
                    key={currentExerciseIndex*100 + i} 
                    title={`Seção ${i+1}: ${currentExercise.reps} repetições`} 
                    style={[styles.setOptions]} 
                    value={currentProgressL[currentExerciseIndex][i]}
                    // style={{backgroundColor: 'red'}} 
                    // style={sets[i] === true ? { backgroundColor: 'blue' } : { backgroundColor: 'red' }}
                    >
                    </MyButtonSwitch>
                )
            }

        return retList
    }

    if (currentExerciseIndex >= currentWorkout.exerciseList.length) {
        return <Text>Loading...</Text>
    }

    return (
        <>
        <View style={styles.body}>
            <View style={{height: 36}}/>

            <View style={{alignItems:'center'}}>
                <MyTextH3 style={{alignContent:'center'}}>{currentExercise.name.replace(/_/g, " ")}</MyTextH3>
                {/* <MyTextH3 style={{alignContent:'center'}}>{currentExerciseIndex}</MyTextH3> */}
            </View>
            
            <ScrollView style={styles.scrollBody}>
                
                <View style={styles.imgBox}>
                    {Images.exerciseImages2[exercise.name] && <Image
                    style={styles.img}
                    source={ Images.exerciseImages2[currentExercise.name] }
                    />}
                    <MyTextRegular
                    style={{alignContent:'center'}}
                    >
                        {currentExercise.name.replace(/_/g, " ")}
                    </MyTextRegular>
                </View>
                

                {/* <MyTextRegular>
                    {getLorem()}
                </MyTextRegular> */}

                {/* aqui vai ser os check do treino */}
                <ScrollView style={styles.scrollBody}>

                    <View style={styles.viewSets}>
                        <View style={styles.setsHeader}>
                            <MyTextRegular style={styles.setsHeaderText}>SÉRIE</MyTextRegular>
                            <MyTextRegular style={styles.setsHeaderText}>PESO (KG)</MyTextRegular>
                            <MyTextRegular style={[styles.setsHeaderText,{flex:0.3}]}>REPETIÇÕES</MyTextRegular>
                            <MyTextRegular style={styles.setsHeaderText}>FEITO</MyTextRegular>
                        </View>

                        {currentExercise && currentExerciseIndex < currentWorkout.exerciseList.length && makeExerciseView()}     
                    </View>
                        
                </ScrollView>

            </ScrollView>

            <View style={styles.viewTimer}>
                <TouchableOpacity onPress={prevExercise}><AntDesign style={styles.btnTimer} name='leftcircle' size={50} color={currentExerciseIndex == 0 ? '#00000000' : '#808080'}/></TouchableOpacity>
                <TouchableOpacity onPress={handleClockPress}><AntDesign style={styles.btnTimer} name='clockcircleo' size={50} color='#F2BD00'/></TouchableOpacity>
                {currentExerciseIndex != currentWorkout.exerciseList.length-1 && <TouchableOpacity onPress={nextExercise}><AntDesign style={styles.btnTimer} name='rightcircle' size={50} color='#808080'/></TouchableOpacity>}
                {currentExerciseIndex == currentWorkout.exerciseList.length-1 && <TouchableOpacity onPress={nextExercise}><AntDesign style={styles.btnTimer} name='checkcircle' size={50} color='#F2BD00'/></TouchableOpacity>}
            </View>

            <View style={{height:90}}/>
        </View>
        </>
    );
}



// function getLorem() {
// return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae lorem in velit finibus maximus. Cras ac cursus orci. Vivamus euismod libero nec ligula sodales luctus. Nullam id enim facilisis, dapibus sapien ut, auctor leo. Nulla imperdiet orci at ex congue, a commodo sapien lacinia. Nullam elit nulla, rutrum id commodo vitae, egestas vel tortor. Curabitur dapibus dictum rutrum. Aliquam id volutpat urna, a elementum purus. Sed maximus est eget nisl blandit convallis. Etiam et quam finibus, luctus leo nec, posuere sem. Cras quis risus et ligula dictum molestie et vitae elit. Sed pretium sodales pellentesque. Mauris at commodo odio. Vivamus vitae odio vel augue elementum placerat.Proin feugiat vestibulum quam a cursus. Curabitur diam dolor, dapibus a libero vitae, consectetur posuere orci. Nam ultrices consectetur eleifend. Donec eget libero lacinia, placerat magna nec, tristique tortor. Vivamus quis velit dolor. Phasellus ultricies mollis est, sed imperdiet sem porttitor et. Nulla congue tortor eu lectus consectetur, non dignissim sem eleifend. Sed odio lacus, eleifend non est in, varius molestie urna. Nunc suscipit ornare suscipit. Mauris in nulla quis lectus commodo ornare. Proin iaculis auctor sapien, ut placerat orci porta sed. Phasellus non lacus libero.Proin mattis eros ut egestas feugiat. Donec rhoncus quam et malesuada sagittis. Ut tristique ac diam ac porttitor. Aliquam nec venenatis felis. Etiam molestie est vitae arcu tempor sagittis. In ultricies libero est, nec tempor urna suscipit a. Vestibulum eget dolor id libero pellentesque interdum ut a eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum iaculis elit ac neque aliquet, eu ornare leo scelerisque. Nulla sit amet dolor ut libero porta consectetur. Etiam posuere tempor egestas.Maecenas quis orci magna. Vestibulum arcu quam, rhoncus quis congue non, mattis sed velit. Duis consectetur lorem vitae sodales fermentum. Proin sagittis libero quis quam dictum, efficitur sagittis dui vulputate. Etiam interdum tortor vitae quam laoreet, vel interdum lorem vestibulum. Nullam et sagittis felis. Donec id odio lectus.Donec sit amet faucibus mauris. Aenean a elit a lectus tincidunt suscipit sit amet in ipsum. Phasellus vel egestas neque, sit amet pellentesque mauris. Morbi malesuada leo sed elit condimentum, vel tincidunt arcu dignissim. Nulla nec finibus tortor. Phasellus tristique malesuada tortor. Duis vitae libero non neque laoreet vestibulum consequat sit amet ex. Pellentesque dictum ac felis eget feugiat. Mauris eu elit non leo feugiat condimentum at nec nunc. Curabitur risus ante, molestie sed mauris vel, aliquet semper dolor. Donec sed dictum orci, id cursus nisi. Donec ipsum lacus, malesuada ac ullamcorper sed, volutpat id sapien. Curabitur quis vestibulum dolor. Aenean porttitor pretium tortor. Sed ultricies vestibulum rhoncus. Mauris scelerisque, ante eu condimentum blandit, mauris turpis malesuada lorem, quis porttitor dolor nulla ac turpis. '
// }