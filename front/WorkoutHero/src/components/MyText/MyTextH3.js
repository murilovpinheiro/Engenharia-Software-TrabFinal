import React from "react"
import {Text, Component} from 'react-native'
import defaultStyles from "./style"

export default function MyTextH3(props) {
    return (
        <Text {...props} style={[defaultStyles.textH3, props.style]}>{props.children}</Text>
    );
}
