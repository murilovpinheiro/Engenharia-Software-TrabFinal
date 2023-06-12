import React, { useState } from "react"
import { Image, ImageBackground } from 'react-native'
import bg_worldmap from '../../assets/bg_worldmap.jpg'


export default function RPGImageBackground(){
    const imageUri = Image.resolveAssetSource(bg_worldmap).uri
    
    return (
        <ImageBackground
            source={imageUri}
        ></ImageBackground>
    );
}