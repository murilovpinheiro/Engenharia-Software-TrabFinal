// Import all the images in the directory statically
// import * as ExerciseImages from "../assets/img/exercises";

const Images = {
    exerciseImages: {
        "Barbell_Full_Squat": require("../assets/img/exercises/Barbell_Full_Squat.jpg"),
        // "X": require("../assets/img/exercises/X.jpg"),
    },
};

const getExercise = (name) => {
    return ExerciseImages[name]
}
export {getExercise}
export default Images

// export default function Images() {
//     var exerciseUri = (imgName) => {
//         return exercises[imgName]
//     }
// }