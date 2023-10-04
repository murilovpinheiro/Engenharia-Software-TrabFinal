import React from "react"
import {Text, Component} from 'react-native'
import defaultStyles from "./style"

export default function MyTextH1(props) {
    return (
        <Text {...props} style={[defaultStyles.textH1, props.style]}>{props.children}</Text>
    );
}
