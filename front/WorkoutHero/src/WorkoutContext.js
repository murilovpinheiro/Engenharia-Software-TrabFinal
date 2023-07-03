import React, { createContext, useState, useEffect } from 'react';


const WorkoutContext = createContext();

const WorkoutProvider = ({ children }) => {

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

      console.log("WORKOUT", workout)

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

    const finishWorkout = () => {
      console.log("ta no workoutcontext")
    }

    return (
      <WorkoutContext.Provider value={{ currentWorkout, currentExerciseIndex, currentExercise, setCurrentExerciseIndex, startWorkout, currentProgressL, setCurrentProgressL, finishWorkout }}>
        {children}
      </WorkoutContext.Provider>
    );
  };


export { WorkoutContext, WorkoutProvider };