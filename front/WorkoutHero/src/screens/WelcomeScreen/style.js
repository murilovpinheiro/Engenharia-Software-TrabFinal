import {StyleSheet} from 'react-native'
import AppStyles from '../../AppStyles';

const styles = StyleSheet.create({
    body: {
        backgroundColor: AppStyles.colors.background,
        width: "100%", height:"100%",
        padding: '2%'
    },
    viewLogo: {
        //backgroundColor:"#f00",
        flex: 0.4, //borderWidth: 8, borderColor: "red",
        alignItems: 'center'
        //width: "100%"
    },
    imgLogo: {
        width: "90%", 
        height:"110%",
        resizeMode: 'contain',
        // borderWidth: 8, borderColor: "red",
    },
    btn1: {
        marginHorizontal: 24,
        backgroundColor: AppStyles.colors.accent
    },
    btn2: {
        marginHorizontal: 24,
        backgroundColor: AppStyles.colors.secondary
    },
    text: {
        marginHorizontal: 20,
        color: AppStyles.colors.text,
        flex: 0.25,
        textAlign: 'justify', textAlignVertical: 'center',
        padding: 10,
    }
});

export default styles