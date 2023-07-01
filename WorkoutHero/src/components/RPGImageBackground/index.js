import React, { useState } from "react"
import { Dimensions, ImageBackground, StyleSheet } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function RPGImageBackground(){
    //const image = {uri: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}
    const image = require('../../../assets/img/bg_worldmap_blur.png')


    return (
        <ImageBackground source={image} style={styles.bg}>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: {
        height: windowHeight,
        width: windowWidth,
        resizeMode: "cover",
        position: "absolute",
        top: 0,
        // borderWidth: 4,
        // borderColor: "red"
    }
});