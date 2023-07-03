import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    body: {
        width: "100%", height:"100%",
        padding: '5%'
    },
    textInput: {
    },
    dropdownBox: {
        // borderColor: 'white',
        // borderWidth: 3,
        // borderRadius: 16,
        paddingLeft: 8, paddingRight: 8, paddingVertical: 5,
        backgroundColor: '#CCCED2', color: 'white',
        zIndex: 999
    },
    dropdownList: {
        // borderColor: 'white',
        // borderWidth: 3,
        // borderRadius: 16,
        backgroundColor: '#CCCED2', color: 'white',
        zIndex: 999
    },
    dropdownText: {
        fontFamily: 'Lexend', color: '#00132A'
    },
    viewError: {
        //backgroundColor: '#aaa',
        // borderWidth: 4, borderColor: "red",
        flex: 0.1,
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
        width: '80%'
    }
});

export default styles