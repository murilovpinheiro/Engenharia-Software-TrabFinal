import axios from 'axios';
import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { View, Modal, Text, Animated } from 'react-native';
import * as Progress from 'react-native-progress';
import { AuthContext } from './AuthContext';
import MyTextRegular from './components/MyText/MyTextRegular';

const WorkoutContext = createContext();

const baseUrl = 'https://apiworkouthero.onrender.com'

const WorkoutProvider = ({ children }) => {

    const { userData } = useContext(AuthContext)

    const [currentWorkout, setCurrentWorkout] = useState(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentExercise, setCurrentExercise] = useState(null);
    const [currentProgressL, setCurrentProgressL] = useState([]);

    useEffect(() => {
      const setCurr = async () => {

        if (currentWorkout != null) {  
          if (!(currentExerciseIndex < 0) && !(currentExerciseIndex >= currentWorkout.exerciseList.length)){
            // colocar aqui sets e reps
            let curr = currentWorkout.exerciseList[currentExerciseIndex]  
            let wkex = await getSetsAndReps(currentWorkout.id, curr.id)
            curr.sets = wkex.sets;
            curr.reps = wkex.reps;
            setCurrentExercise(curr)
          }
        }
      }
      setCurr();
    }, [currentExerciseIndex]);

    const startWorkout = async (workout) => {
      setCurrentWorkout(workout)
      setCurrentExerciseIndex(0)
      // colocar aqui sets e reps
      const setCoisas = async(ex) => {
        let wkex = await getSetsAndReps(workout.id, ex.id)
        ex.sets = wkex.sets 
        ex.reps = wkex.reps 
        return ex;
      }
      let exercicio1 = await setCoisas(workout.exerciseList[0]) 
      setCurrentExercise(exercicio1)
      
      var newProgressList = []
      for (let j = 0; j < workout.exerciseList.length; j++) {
        let setArray = []
        console.log(workout.exerciseList[j].sets)
        for (let i = 0; i < workout.exerciseList[j].sets; i++) {
          setArray.push(false)
        }
        newProgressList.push(setArray)
      }
      setCurrentProgressL(newProgressList);
    }

    const finishWorkout = async () => {
      console.log("ta no workoutcontext")
      let oldXp = userData.xp;
      let newXp = userData.xp;
      try {
        
        //update xp
        
        let xpYield = calculateXpYield()
        let exercisesDone = calculateExsYield()
        let repsDone = calculateRepsYield()
        
        let response = await axios.post(`${baseUrl}/user/add_status?login=${userData.login}&exercisesRealized=${exercisesDone}&repsRealized=${repsDone}`)
       
        userData.xp += xpYield
        userData.exercisesRealized += exercisesDone; 
        userData.repsRealized += repsDone; 
        newXp = userData.xp;

        console.log("XP OBTIDO: ", xpYield)
        var url = `${baseUrl}/user/update?id=${userData.id}&xp=${userData.xp}`
        response = await axios.post(url);
        console.log("RESPONSE: ", response)

      } catch (error) {
        console.log(error)
        if (error.response) {
          console.log(error.response.data)
        }
      }


      //reset all
      setCurrentWorkout(null)
      setCurrentExerciseIndex(0)
      setCurrentExercise(null)
      setCurrentProgressL([])

      //xp popup
      await trigerModalAnimation({oldXp, newXp});
    }

    const calculateXpYield = () => {
      let totalYield = 100
      // for (let i = 0; i < currentWorkout.exerciseList.length; i++) {
      //   let exYield = 0
      //   for (let j = 0; j < currentExercise.sets; j++) {
            //AQUI: CHECAR QUAIS SETS FORAM FEITOS
      //     exYield += 1;
      //   }
      //   if (exYield == currentExercise.sets) exYield += 1; //bonus por fazer todos

      //   if (currentExercise.difficulty == "E") {
      //     exYield *= 15;
      //   } else if (currentExercise.difficulty == "M") {
      //     exYield *= 70;
      //   } else if (currentExercise.difficulty == "H") {
      //     exYield *= 150;
      //   }

      //   totalYield += exYield
      // }

      return totalYield
    }

    // TODO: CONSERTAR ESSES DOIS
    const calculateExsYield = () => {
      let totalYield = 0;
      totalYield += currentWorkout.exerciseList.length;
      return totalYield;
    }

    // AQUI PRECISO FILTRAR QUAIS SETS FORAM FEITOS E QUAIS NAO FORAM
    const calculateRepsYield = () => {
      let totalYield = 0;
      for (let i = 0; i < currentWorkout.exerciseList.length; i++) 
        totalYield += currentExercise.reps * currentExercise.sets;
      return totalYield;
    }




    /*
      API requests
    */
    const exerciseFromApiConverter = (exerciseFromApi) => {
      /*
      {"Workout_Exercise": {"exercise_id": 2, "id": 2, "workout_id": 1},
      "difficulty": "H", "id": 2, "muscularGroups": [[Object], [Object]], 
      "name": "Barra Fixa Supinada", "obj": "Aumentar massa", "reps": 8, 
      "reps_progress": 0, "rest": "00:01:00", "sets": 3, "weight": 60, "weight_progress": 0}
      */
      let retExercise = {
        id: exerciseFromApi.id,
        name: exerciseFromApi.name,
        muscles: exerciseFromApi.muscles,
        body_part: exerciseFromApi.body_part,

        bodyPart: "empty",
        equipment: "empty",
        gifUrl: "empty",
        imgName: "Dumbbell_Squat",

        sets: exerciseFromApi.sets, reps: exerciseFromApi.reps,
      
        target: "empty",
        secondaryMuscles: [
          "empty"
        ],
        instructions: [
          "empty"
        ]
      }
      return retExercise
    }

    const getExerciseById = async (id) => {
      //exemplo
      let retList = []
      let exerciseFromDatabase = {}//request

      retList.push(retExercise)
      return retList
    }

    const getExerciseByName = async (name) => {
      //exemplo

      let retList = []
      let exerciseFromDatabase = {}//request

      let retExercise = {
        id: "empty",
        name: name,

        bodyPart: "empty",
        equipment: "empty",
        gifUrl: "empty",
        imgName: "Dumbbell_Squat",

        sets: 3, reps: 10,
      
        target: "empty",
        secondaryMuscles: [
          "empty"
        ],
        instructions: [
          "empty"
        ]
      }
      retList.push(retExercise)
      return retList
    }

    const getExercisesByBodyPart = async (bodyPart) => {
      //exemplo
      let listFromApi = []//REPLACE WITH REQUEST
      let retList = []
      let retExercise = {
        id: "empty",
        name: "empty",

        bodyPart: bodyPart,
        equipment: "empty",
        gifUrl: "empty",
        imgName: "Dumbbell_Squat",

        sets: 3, reps: 10,
      
        target: "empty",
        secondaryMuscles: [
          "empty"
        ],
        instructions: [
          "empty"
        ]
      }
      retList.push(retExercise)
      return retList
    }

    const getAllExercises = async () => {

      let retList = []
      let exerciseListFromApi = [];

      let response = null;
      try {
        response = await axios.get(baseUrl + `/exercise/select2`) // clause vazia pegando tudo
        exerciseListFromApi = response.data
        exerciseListFromApi.forEach((val) => {
          retList.push(exerciseFromApiConverter(val));
        })
        console.log("\n\nLISTA EXERCICIOS API: ", exerciseListFromApi)
        console.log("\n\nRETLIST: ", exerciseListFromApi)
      } catch (error) {
        console.log("ERRO GET EXERCISES FROM USER")
        console.error(error)
        throw error
      }

      return retList
    }

    // pega exercicios por intervalo e possui mais um parametro caso necessite de mais filtro
    const getExercises = async(limit, offset, restoDaClause = '') => {
      let response = null;
      let retList = [];
      try {
        const urlget = baseUrl + `/exercise/selectPage?offset=${offset}&limit=${limit}` + restoDaClause;
        // console.log(urlget)
        response = await axios.get(baseUrl + `/exercise/selectPage?offset=${offset}&limit=${limit}` + restoDaClause);
        if (response.message) {
          throw Error(response.message);
        }
        // console.log(response.data, offset, limit)
        let exerciseListFromApi = response.data
        exerciseListFromApi.forEach((val) => {
          retList.push(exerciseFromApiConverter(val));
        })
      } catch (error) {
        console.log("ERRO GET EXERCISES FROM USER")
        console.error(error)
        throw error
      }

      return retList
    }

    const createWorkoutAlt = async (idUser, nome) => {
      let response = null;
      try {
        response = await axios.post(
          `${baseUrl}/workout/insert2?id=1&difficulty=E&obj=${nome}&user_id=${idUser}`
        )
      } catch(error) {
        console.log('erro createworkoutalt')
        console.log(error)
        throw error
      }
      let wkID = response.data.newWorkout.id;
      let routine = await getRoutine(wkID);
      return routine;
    }

    const createWorkout = async (ExIdList, idUser, nome, dificuldade ) => {
      let response = null;
      try {
        response = await axios.post(`${baseUrl}/workout/insert2?id=1&difficulty=${dificuldade}&obj=${nome}&user_id=${idUser}`);

        console.log('\n\n\nRESPONSE CREATEWORKOUT', response.data);

        const novoTreino = response.data.newWorkout;

        let responses = [response]
        // ExIdList.forEach(async (idExercicio) => {
        for (const idExercicio of ExIdList) {
          console.log('EXERCICIO A SER COLOCADO: ', idExercicio)
          const respExercicio = await axios.post(
            `${baseUrl}/workout_exercise/insert2?id=1&workout_id=${novoTreino.id}&exercise_id=${idExercicio}`
          )
          responses.push(respExercicio);
          console.log('\n\n RESPONSE EXERCICIOWK: ', respExercicio.data);
        }
        // });

        

        return responses;
      
      } catch (error) {
        console.log("ERRO CREATE WORKOUT")
        console.error(error)
        throw error
      }
    }

    const addExerciseToWK = async(idEx, idWk) => {
      try {
        let response = await axios.post(
          `${baseUrl}/workout_exercise/insert2?id=1&workout_id=${idWk}&exercise_id=${idEx}`
        );
      } catch (error) {
        throw error;
      }
    }

    // TODO: IMPLEMENTAR DELECAO DE EXERCICIO DO TREINO 
    const delExerciseToWK = async(idEx, idWk) => {
      try {

        let response1 = await axios.get(
          `${baseUrl}/workout_exercise/select?workout_id=${idWk}&exercise_id=${idEx}`
        );

        let wkexId = response1.data[0].id;

        let response2 = await axios.post(
          `${baseUrl}/workout_exercise/delete2?id=${wkexId}`
        );
      } catch (error) {
        throw error;
      }
    }

    const getListBodyParts = async () => {
      //let retList = ["back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders", "upper arms", "upper legs", "waist"]
      let retList = ["Peitoral", "Braços", "Costas", "Pernas", "Core", "Glúteos"]
      return retList
    }

    const getWorkoutById = async () => {
      let workoutFromApi = { //REPLACE WITH REQUEST
        id: "empty", 
        difficulty: "empty",
        obj: "aaa",
        user_id: "no user"
      }

      let workoutExerciseListFromApi = [] //lista de ids //REPLACE WITH REQUEST
      let workoutExerciseList = []

      workoutExerciseListFromApi.forEach((exerciseId) => {
        let exercise = getExerciseById(exerciseId)
        console.log("exercise from context:", exercise)
        workoutExerciseList.push(exercise)
      })
  
      let retWorkout = {
        id: workoutFromApi.id, 
        difficulty: workoutFromApi.difficulty,
        goal: workoutFromApi.obj,
        userId: workoutFromApi.user_id,
        exerciseList: workoutExerciseList
      }

      return retWorkout
    }

    const updateRoutineName = async(routineId, nome) => {
      let response = null;
      nome = String(nome);
      try {
        response = await axios.post(
          baseUrl + `/workout/update?id=${routineId}&obj=${nome}`
        )
      } catch (error) {
        console.error(error)
        throw error
      }
      return response;
    }

    const deleteRoutine = async(routineId) => {
      let response = null;
      try {
        response = await axios.post(
          baseUrl + `/workout/delete2?id=${routineId}`
        )
      } catch (error) {
        console.error(error)
        throw error
      }
      return response;
    }

    const getRoutine = async (routineId) => {
      let response = null;
      let routineFromApi = null;
      try {
        response = await axios.get(baseUrl + `/WORKOUT/select?id=${routineId}`)
        routineFromApi = response.data[0]
      } catch (error) {
        console.log("ERRO GET ROUTINES FROM USER")
        console.error(error)
        throw error
      }

      let workoutFromApi = routineFromApi;
      let workoutExerciseListFromApi = routineFromApi.exerciseList
      let workoutExerciseList = []

      for (let j = 0; j < workoutExerciseListFromApi.length; j++) {
        let exercise = exerciseFromApiConverter(workoutExerciseListFromApi[j])
        workoutExerciseList.push(exercise)
      }

      return {
        id: workoutFromApi.id, 
        name: workoutFromApi.obj,
        difficulty: workoutFromApi.difficulty,
        goal: workoutFromApi.obj,
        userId: workoutFromApi.user_id,
        exerciseList: workoutExerciseList
      }

    }

    const getRoutinesFromUser = async (userId) => {
      let routinesList = []
      let routinesListFromApi = []
      
      let response = null;
      try {
        response = await axios.get(baseUrl + `/WORKOUT/select?user_id=${userId}`)
        routinesListFromApi = response.data
      } catch (error) {
        console.log("ERRO GET ROUTINES FROM USER")
        console.error(error)
        throw error
      }

      for (let i = 0; i < routinesListFromApi.length; i++) {
        let workoutFromApi = routinesListFromApi[i];
        let workoutExerciseListFromApi = workoutFromApi.exerciseList //lista de ids //REPLACE WITH REQUEST
        let workoutExerciseList = []

        for (let j = 0; j < workoutExerciseListFromApi.length; j++) {
          let exercise = exerciseFromApiConverter(workoutExerciseListFromApi[j])
          workoutExerciseList.push(exercise)
        }

        let retWorkout = {
          id: workoutFromApi.id, 
          name: workoutFromApi.obj,
          difficulty: workoutFromApi.difficulty,
          goal: workoutFromApi.obj,
          userId: workoutFromApi.user_id,
          exerciseList: workoutExerciseList
        }
        routinesList.push(retWorkout)
      }
      return routinesList
    }

    const getSetsAndReps = async (workout_id, exercise_id) => {
      let response = null;
      try {
        response = await axios.get(
          baseUrl + `/workout_exercise/select?workout_id=${workout_id}&exercise_id=${exercise_id}`
        )
      } catch (error) {
        console.error(error)
        throw error
      }
      if (response.data) return response.data[0];
      return null;
    }

    const updateSets = async (wkex_id, sets) => {
      let response = null;
      try {
        sets = parseInt(sets);
        response = await axios.post(
          baseUrl + `/workout_exercise/update?id=${wkex_id}&sets=${sets}`
        )
      } catch (error) {
        console.error(error)
        throw error
      }
      return response
    }

    const updateReps = async (wkex_id, reps) => {
      let response = null;
      try {
        reps = parseInt(reps);
        response = await axios.post(
          baseUrl + `/workout_exercise/update?id=${wkex_id}&reps=${reps}`
        )
      } catch (error) {
        console.error(error)
        throw error
      }
      return response
    }


    const [modalVisible, setModalVisible] = useState(false);
    // const [modalExp, setModalExpTarget]
    const [contador, setContador] = useState(0);
    const maxXp = 100.0;
    const [progress, setProgress] = useState(0);
    const [progressXp, setProgressXp] = useState(0);
    const animatedXpTarget = useRef(new Animated.Value(0)).current

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    //TODO: Mover tudo para um component separado
    const trigerModalAnimation = async(props) => {
      let {oldXp, newXp} = props;
      setModalVisible(true);
      let xpToDistribute = newXp - oldXp;
      
      setProgress((oldXp % 100) * 0.01);
      setProgressXp(oldXp);
      // console.log(progress)
      for (let i = 1; i <= 3; i++) {
        setContador(i);
        await delay(200); 
      }
      // Animated.timing(progress, {
      //   toValue: newXp / maxXp,
      //   duration: 2000, // Adjust the duration as needed
      //   useNativeDriver: true, // This is necessary for certain animations
      // }).start();
      while (xpToDistribute > 0) {
        oldXp += 1;
        setProgress((oldXp % 100) * 0.01);
        setProgressXp(oldXp);
        if (progress >= 1.0) {
          progress -= 1.0;
        }
        xpToDistribute -= 1;
        // console.log(progress, " ", xpToDistribute)
        await delay(2);
      }
      // Contagem regressiva de 10 segundos
      for (let i = 1; i <= 3; i++) {
        setContador(i);
        await delay(1000); 
      }

      setModalVisible(false);
      setContador(0); // Reiniciar o contador
    };


    return (
      <WorkoutContext.Provider value={{ 
        currentWorkout, currentExerciseIndex, currentExercise, setCurrentExerciseIndex, currentProgressL, setCurrentProgressL, 
        startWorkout,  finishWorkout, calculateXpYield,
        getExerciseById, getExerciseByName, getExercisesByBodyPart, getAllExercises, getExercises, getListBodyParts, getWorkoutById, getRoutinesFromUser, updateRoutineName, deleteRoutine, getRoutine, getSetsAndReps,
        createWorkoutAlt, createWorkout, addExerciseToWK, delExerciseToWK, updateReps, updateSets
      }}>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{padding:20, height:"100%", backgroundColor:'#8888'}}>
            <View style={{height:40}}/>

            <View style={{padding:20, backgroundColor:'#fff', borderRadius:8}}>
              <View style={{flexDirection: 'row'}}>
                <MyTextRegular style={{flex:1}}>
                  XP Total: {progressXp}
                </MyTextRegular>
                <MyTextRegular style={{right:0, textAlign: 'right',}}>
                  Nível {Math.ceil(progressXp/100)}
                </MyTextRegular>
              </View>
              
              <Progress.Bar 
              progress={progress} width={null} height={20} borderRadius={0} borderWidth={4}
              animationType={'spring'}
              />
            </View>
            
          </View>
        </Modal>
        {children}
      </WorkoutContext.Provider>
    );
  };


export { WorkoutContext, WorkoutProvider };