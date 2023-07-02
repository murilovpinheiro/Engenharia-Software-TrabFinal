import React, { createContext, useState, useEffect } from 'react';


const WorkoutContext = createContext();

const WorkoutProvider = ({ children }) => {

    const [currentWorkout, setCurrentWorkout] = useState(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentExercise, setCurrentExercise] = useState(null)

    useEffect(() => {
      if (!(currentExerciseIndex < 0) && !(currentExerciseIndex >= currentWorkout.exerciseList.length))
          setCurrentExercise(currentWorkout.exerciseList[currentExerciseIndex])
    }, [currentExerciseIndex]);

    const startWorkout = (workout) => {
      setCurrentWorkout(workout)
      setCurrentExerciseIndex(0)
      setCurrentExercise(workout.exerciseList[0])
    }

    return (
      <WorkoutContext.Provider value={{ currentWorkout, currentExerciseIndex, currentExercise, setCurrentExerciseIndex, startWorkout }}>
        {children}
      </WorkoutContext.Provider>
    );
  };


export { WorkoutContext, WorkoutProvider };