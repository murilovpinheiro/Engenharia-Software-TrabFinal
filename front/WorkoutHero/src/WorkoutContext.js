import React, { createContext, useState } from 'react';


const WorkoutContext = createContext();

const WorkoutProvider = ({ children }) => {

    const [currentWorkout, setCurrentWorkout] = useState(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  
    return (
      <WorkoutContext.Provider value={{ currentWorkout, currentExerciseIndex }}>
        {children}
      </WorkoutContext.Provider>
    );
  };


export { WorkoutContext, WorkoutProvider };