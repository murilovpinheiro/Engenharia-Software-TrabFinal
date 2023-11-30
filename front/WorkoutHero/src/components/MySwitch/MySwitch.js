import React, { createContext, useState } from "react"
import {TouchableOpacity , Pressable} from 'react-native'
import defaultStyles from "./style"
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MySwitch({
    disabled, size,
    iconEnabledName, iconDisabledName,
    iconEnabledColor, iconDisabledColor,
    onToggle,
    defaultValue}) {

    const [value, setValue] = useState(defaultValue || false);
    
    const toggleSwitch = () => {
        if (disabled) return;
        setValue(!value);
        
        onToggle();
    }

    return (
        <TouchableOpacity
        style={[defaultStyles.switchRegular, {opacity: disabled ? 0.5 : 1, width: size}]}
        onPress={toggleSwitch}
        disabled={disabled}
        >

            <Ionicons name={value ? iconEnabledName : iconDisabledName} size={size} color={value ? iconEnabledColor : iconDisabledColor}/>


        </TouchableOpacity>
    );
}