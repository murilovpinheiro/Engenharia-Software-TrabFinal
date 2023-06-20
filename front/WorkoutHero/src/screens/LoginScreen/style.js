import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    body: {
        width: "100%", height:"100%",
        padding: '5%'
    },
    viewLogo: {
        //borderWidth: 4, borderColor: "red",
        //backgroundColor:"#f00",
        flex: 0.6,
        alignItems: 'center'
        //width: "100%"
    },
    imgLogo: {
        
        width: "90%", height:"100%",
        resizeMode: 'contain'
    },
    textInput: {
        //borderWidth: 4, borderColor: "red",
        borderWidth: 3,
        borderRadius: 16,
        paddingLeft: 8, paddingRight: 8
    },
    viewError: {
        //backgroundColor: '#aaa',
        //borderWidth: 4, borderColor: "red",
        flex: 0.2,
        height: 100,
    },
    textError: {
        //backgroundColor: '#001',
        color: '#c11',
        textAlign: 'center'
    },
    viewButton: {
        //borderWidth: 4, borderColor: "red",
        alignItems: 'center'
    },
    button: {
        width: "80%"
    }
});

export default styles