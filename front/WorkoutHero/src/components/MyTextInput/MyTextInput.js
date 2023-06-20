import React from "react"
import {TextInput} from 'react-native'
import defaultStyles from "./style"

export default function MyTextInput(props) {
    return (
        <TextInput {...props} style={[defaultStyles.textInput, props.style]} cursorColor={'#00132A'}>{props.children}</TextInput>
    );
}