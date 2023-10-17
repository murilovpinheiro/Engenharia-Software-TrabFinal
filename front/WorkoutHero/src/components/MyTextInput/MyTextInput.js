import React from "react"
import {TextInput} from 'react-native'
import defaultStyles from "./style"

export default function MyTextInput(props) {
    return (
        <TextInput {...props} secure style={[defaultStyles.textInput, props.style]} cursorColor={'#0007'}>{props.children}</TextInput>
    );
}