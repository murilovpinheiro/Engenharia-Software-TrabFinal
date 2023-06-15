import React from "react"
import {TouchableOpacity , Pressable} from 'react-native'
import defaultStyles from "./style"
import MyTextRegular from "../MyText/MyTextRegular";
import styles from "../../screens/WelcomeScreen/style";

export default function MyButtonRegular(props) {
    return (
        <TouchableOpacity  {...props} 
        onPress={function(){console.log("hi")}}
        style={[defaultStyles.btnRegular, props.style]}>
            
            <MyTextRegular style={defaultStyles.btnTextRegular}>{props.title}</MyTextRegular>
            {props.children}
        
        </TouchableOpacity >
    );
}