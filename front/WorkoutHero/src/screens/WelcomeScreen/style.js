import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    body: {
        width: "100%", height:"100%",
        padding: '5%'
    },
    viewLogo: {
        //backgroundColor:"#f00",
        flex: 0.4, //borderWidth: 8, borderColor: "red",
        alignItems: 'center'
        //width: "100%"
    },
    imgLogo: {
        width: "90%", 
        height:"100%",
        resizeMode: 'contain'
    },
    btn: {
        //marginBottom: 100
    },
    text: {
        flex: 0.25,
        textAlign: 'justify', textAlignVertical: 'center',
        padding: 10,
    }
});

export default styles