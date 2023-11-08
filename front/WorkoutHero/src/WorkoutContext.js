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
    const getExerciseById = (id) => {
      //exemplo
      let retlist = []
      let exerciseFromDatabase = {}//request
      let retExercise = {
        id: id,
        name: "empty",

        bodyPart: "empty",
        equipment: "empty",
        gifUrl: "empty",
        imgName: "Dumbbell_Squat",
      
        target: "empty",
        secondaryMuscles: [
          "empty"
        ],
        instructions: [
          "empty"
        ]
      }
      retlist.push(retExercise)
      return retList
    }

    const getExerciseByName = (name) => {
      //exemplo

      let retlist = []
      let exerciseFromDatabase = {}//request

      let retExercise = {
        id: "empty",
        name: name,

        bodyPart: "empty",
        equipment: "empty",
        gifUrl: "empty",
        imgName: "Dumbbell_Squat",
      
        target: "empty",
        secondaryMuscles: [
          "empty"
        ],
        instructions: [
          "empty"
        ]
      }
      retlist.push(retExercise)
      return retList
    }

    const getExercisesByBodyPart = (bodyPart) => {
      //exemplo
      let listFromApi = []//REPLACE WITH REQUEST
      let retlist = []
      let retExercise = {
        id: "empty",
        name: "empty",

        bodyPart: bodyPart,
        equipment: "empty",
        gifUrl: "empty",
        imgName: "Dumbbell_Squat",
      
        target: "empty",
        secondaryMuscles: [
          "empty"
        ],
        instructions: [
          "empty"
        ]
      }
      retlist.push(retExercise)
      return retList
    }

    const getAllExercises = () => {
      let retList = []
      return retList
    }

    const getListBodyParts = () => {
      //let retList = ["back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders", "upper arms", "upper legs", "waist"]
      let retList = ["Peitoral", "Braços", "Costas", "Pernas", "Core", "Glúteos"]
      return retList
    }

    const getWorkoutById = () => {
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

    const getWorkoutByOwner = () => {
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

    




    return (
      <WorkoutContext.Provider value={{ 
        currentWorkout, currentExerciseIndex, currentExercise, setCurrentExerciseIndex, currentProgressL, setCurrentProgressL, 
        startWorkout,  finishWorkout, calculateXpYield,
        getExerciseById, getExerciseByName, getExercisesByBodyPart, getAllExercises, getListBodyParts, getWorkoutById, getWorkoutByOwner
      }}>
        {children}
      </WorkoutContext.Provider>
    );
  };


export { WorkoutContext, WorkoutProvider };