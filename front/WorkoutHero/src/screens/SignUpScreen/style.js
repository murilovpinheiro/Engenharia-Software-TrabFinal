import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    body: {
        margin: '10%'
    },
    viewLogo: {
        //backgroundColor:"#f00",
        alignItems: 'center', height: 300
        //width: "100%"
    },
    imgLogo: {
        width: "80%", height:"100%",
        resizeMode: 'contain'
    },
    textInput: {
        borderWidth: 3,
        borderRadius: 16,
        paddingLeft: 8, paddingRight: 8
    },
    viewError: {
        //backgroundColor: '#aaa',
        height: 100,
    },
    textError: {
        //backgroundColor: '#001',
        color: '#c11',
        textAlign: 'center'
    }
});

export default styles