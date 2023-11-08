import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const WorkoutContext = createContext();

const baseUrl = 'https://apiworkouthero.onrender.com'

const WorkoutProvider = ({ children }) => {

    const { userData } = useContext(AuthContext)

    const [currentWorkout, setCurrentWorkout] = useState(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentExercise, setCurrentExercise] = useState(null);
    const [currentProgressL, setCurrentProgressL] = useState([]);

    useEffect(() => {
      if (currentWorkout != null)
        if (!(currentExerciseIndex < 0) && !(currentExerciseIndex >= currentWorkout.exerciseList.length))
            setCurrentExercise(currentWorkout.exerciseList[currentExerciseIndex])
    }, [currentExerciseIndex]);

    const startWorkout = (workout) => {
      setCurrentWorkout(workout)
      setCurrentExerciseIndex(0)
      setCurrentExercise(workout.exerciseList[0])
      
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
      
      try {
        //update xp
        let xpYield = calculateXpYield()
       
        userData.xp += xpYield
        console.log("XP OBTIDO: ", xpYield)
        var url = `${baseUrl}/user/update?id=${userData.id}&xp=${userData.xp}`
        response = await axios.post(url);
        console.log("RESPONSE: ", response)


        var responseHistoric = axios.get(`${baseUrl}/historic/select?user_id=${userData.id}`)
        console.log("HISTORIC: \n",responseHistoric)
        var historic = responseHistoric.data[0]
        var historicId = historic.id

        var responseRealized = axios.post(`${baseUrl}/workout_realized/insert`, {workout_id:currentWorkout.id , historic_id:historicId})
        console.log("REALIZED: \n",responseRealized)

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
    }

    const calculateXpYield = () => {
      let totalYield = 0
      for (let i = 0; i < currentWorkout.exerciseList.length; i++) {
        let exYield = 0
        for (let j = 0; j < currentExercise.sets; j++) {
          exYield += 1;
        }
        if (exYield == currentExercise.sets) exYield += 1; //bonus por fazer todos

        if (currentExercise.difficulty == "E") {
          exYield *= 15;
        } else if (currentExercise.difficulty == "M") {
          exYield *= 70;
        } else if (currentExercise.difficulty == "H") {
          exYield *= 150;
        }

        totalYield += exYield
      }

      return totalYield
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
        // id: id,
        name: exerciseFromApi.name,

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
      return retList
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

    const getRoutinesFromUser = async (userId) => {
      let routinesList = []
      let routinesListFromApi = []
      
      let data = null;
      let response = null;
      try {
        response = await axios.get(baseUrl + `/WORKOUT/select?user_id=${userId}`)
        routinesListFromApi = response.data
        console.log("LISTA TREINOS API: ", routinesListFromApi)
      } catch (error) {
        console.log("ERRO GET ROUTINES FROM USER")
        console.error(error)
        throw error
      }

      for (let i = 0; i < routinesListFromApi.length; i++) {
        let workoutFromApi = routinesListFromApi[i];
        let workoutExerciseListFromApi = workoutFromApi.exerciseList //lista de ids //REPLACE WITH REQUEST
        console.log("lista exercicios:", workoutExerciseListFromApi)
        let workoutExerciseList = []

        for (let j = 0; j < workoutExerciseListFromApi.length; j++) {
          let exercise = exerciseFromApiConverter(workoutExerciseListFromApi[j])
          console.log("exercise from context:", exercise)
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
        console.log("rotina:", retWorkout)
        routinesList.push(retWorkout)
      }

      // routinesListFromApi.forEach(async (workoutFromApi)=>{
      //   let workoutExerciseListFromApi = workoutFromApi.exerciseList //lista de ids //REPLACE WITH REQUEST
      //   console.log("lista exercicios:", workoutExerciseListFromApi)
      //   let workoutExerciseList = []

      //   workoutExerciseListFromApi.forEach(async (exerciseFromApi) => {
      //     // let [exercise] = await getExerciseById(exerciseId)
      //     let exercise = exerciseFromApiConverter(exerciseFromApi)
      //     console.log("exercise from context:", exercise)
      //     workoutExerciseList.push(exercise)
      //   })

      //   let retWorkout = {
      //     // id: workoutFromApi.id, 
      //     name: workoutFromApi.obj,
      //     difficulty: workoutFromApi.difficulty,
      //     goal: workoutFromApi.obj,
      //     userId: workoutFromApi.user_id,
      //     exerciseList: workoutExerciseList
      //   }
      //   console.log("rotina:", retWorkout)
      //   routinesList.push(retWorkout)
      // })

      console.log("lista:",routinesList)

      //exemplo, só uma rotina
      // let workoutFromApi = { //REPLACE WITH REQUEST
      //   id: "empty", 
      //   difficulty: "empty",
      //   obj: "aaa",
      //   user_id: userId
      // }


      // let workoutExerciseListFromApi = [] //lista de ids //REPLACE WITH REQUEST
      // //placeholder
      // workoutExerciseListFromApi = [1,2,3]
      // let workoutExerciseList = []

      // workoutExerciseListFromApi.forEach((exerciseId) => {
      //   let [exercise] = getExerciseById(exerciseId)
      //   console.log("exercise from context:", exercise)
      //   workoutExerciseList.push(exercise)
      // })
  
      // let retWorkout = {
      //   id: workoutFromApi.id, 
      //   name: workoutFromApi.obj,
      //   difficulty: workoutFromApi.difficulty,
      //   goal: workoutFromApi.obj,
      //   userId: workoutFromApi.user_id,
      //   exerciseList: workoutExerciseList
      // }

      // routinesList.push(retWorkout)
      // routinesList.push(retWorkout)

      return routinesList
    }

    




    return (
      <WorkoutContext.Provider value={{ 
        currentWorkout, currentExerciseIndex, currentExercise, setCurrentExerciseIndex, currentProgressL, setCurrentProgressL, 
        startWorkout,  finishWorkout, calculateXpYield,
        getExerciseById, getExerciseByName, getExercisesByBodyPart, getAllExercises, getListBodyParts, getWorkoutById, getRoutinesFromUser
      }}>
        {children}
      </WorkoutContext.Provider>
    );
  };


export { WorkoutContext, WorkoutProvider };