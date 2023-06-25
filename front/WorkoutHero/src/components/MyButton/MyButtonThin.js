import React from "react"
import {TouchableOpacity , Pressable} from 'react-native'
import defaultStyles from "./style"
import MyTextRegular from "../MyText/MyTextRegular";

export default function MyButtonThin(props) {
    return (
        <TouchableOpacity  {...props} 
        style={[defaultStyles.btnThin, props.style]}>
            
            <MyTextRegular style={defaultStyles.btnTextThin}>{props.title}</MyTextRegular>
            {props.children}
        
        </TouchableOpacity >
    );
}