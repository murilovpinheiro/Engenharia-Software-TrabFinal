import React from "react"
import {Text, Component} from 'react-native'
import defaultStyles from "./style"

export default function MyTextRegular(props) {
    return (
        <Text {...props} style={[defaultStyles.textRegular, props.style]}>{props.children}</Text>
    );
}
