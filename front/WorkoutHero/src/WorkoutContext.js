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
      setCurrentProgressL(
        (prevList) => {
          workout.exerciseList.forEach(e => {
            prevList.push([])
          });
        } 
      )
    }

    return (
      <WorkoutContext.Provider value={{ currentWorkout, currentExerciseIndex, currentExercise, setCurrentExerciseIndex, startWorkout, currentProgressL, setCurrentProgressL }}>
        {children}
      </WorkoutContext.Provider>
    );
  };


export { WorkoutContext, WorkoutProvider };