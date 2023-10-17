import React from "react"
import {TextInput} from 'react-native'
import defaultStyles from "./style"

export default function MyTextInputLow(props) {
    return (
        <TextInput {...props} secure style={[defaultStyles.textInputLow, props.style]} cursorColor={'#0007'}>{props.children}</TextInput>
    );
}