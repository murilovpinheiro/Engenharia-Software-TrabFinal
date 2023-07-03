import React from "react"
import { View, TouchableOpacity, Pressable } from 'react-native'
import defaultStyles from "./style"
import MyTextRegular from "../MyText/MyTextRegular";
import { useContext, useState, useEffect } from "react"
import { Switch } from "react-native-gesture-handler";


export default function MyButtonSwitch(props) {
    const [isEnabled, setIsEnabled] = useState(false);
  
    const toggleSwitch = () => {
      setIsEnabled((previousState) => !previousState);
      props.onToggle && props.onToggle(!isEnabled);
    };
  
    const resetSwitch = () => {
      setIsEnabled(false);
    };
  
    useEffect(() => {
      resetSwitch(); // Chamando a função para redefinir o switch quando o componente for renderizado
    }, []);
  
    return (
      <TouchableOpacity {...props} style={[defaultStyles.btnThin, props.style]}>
        <View style={{ flexDirection: 'row' }}>
          <MyTextRegular style={defaultStyles.btnTextThin}>
            {props.title}
          </MyTextRegular>
          <Switch
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }], margin: 0 }}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          {props.children}
        </View>
      </TouchableOpacity>
    );
  }
  