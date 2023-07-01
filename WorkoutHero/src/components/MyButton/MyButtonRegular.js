import React from "react"
import {TouchableOpacity , Pressable} from 'react-native'
import defaultStyles from "./style"
import MyTextRegular from "../MyText/MyTextRegular";

export default function MyButtonRegular(props) {
    return (
        <TouchableOpacity  {...props} 
        style={[defaultStyles.btnRegular, props.style]}>
            
            <MyTextRegular style={defaultStyles.btnTextRegular}>{props.title}</MyTextRegular>
            {props.children}
        
        </TouchableOpacity >
    );
}