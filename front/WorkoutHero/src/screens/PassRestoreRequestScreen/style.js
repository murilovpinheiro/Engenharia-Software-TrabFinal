import {StyleSheet} from 'react-native'
import AppStyles from '../../AppStyles';

const styles = StyleSheet.create({
    body: {
        backgroundColor: AppStyles.colors.background,
        width: "100%", height:"100%",
        padding: 24
    },
    viewLogo: {
        //borderWidth: 4, borderColor: "red",
        //backgroundColor:"#f00",
        // flex: 0.6,
        alignItems: 'center'
        //width: "100%"
    },
    imgLogo: {
        
        width: 256, height:256,
        resizeMode: 'contain'
    },
    viewContent: {
        paddingHorizontal: 16,
    },
    textInput: {
        //borderWidth: 4, borderColor: "red",
        // borderWidth: 3,
        // borderRadius: 16,
        // paddingLeft: 8, paddingRight: 8
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
        alignItems: 'center',
        
    },
    button: {
        backgroundColor: AppStyles.colors.accent,
        width: "100%"
    }
});

export default styles