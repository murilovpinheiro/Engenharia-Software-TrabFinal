import React from "react"
import {TouchableOpacity , Pressable} from 'react-native'
import defaultStyles from "./style"
import MyTextRegular from "../MyText/MyTextRegular";
import React, { useContext, useState, useEffect } from "react"


export default function MyButtonSwitch(props) {

    const [ligado, setLigado] = useState(false);

    const switchL = () => {
        setLigado(!ligado)
    }

    return (
        <TouchableOpacity  {...props} 
        style={[defaultStyles.btnThin, props.style]}>
            
            <MyTextRegular onPress={switchL} style={defaultStyles.btnTextThin}>{props.title}</MyTextRegular>
            {props.children}
        
        </TouchableOpacity >
    );
}