import {StyleSheet} from 'react-native'
import AppStyles from '../../AppStyles'

const styles = StyleSheet.create({
    body: {
        flex: 1, padding: '2%', backgroundColor: AppStyles.colors.background
    },
    scrollBody: {
        width: "100%", height:"100%",
    },
    textName: {
        textAlign: 'center', width:'100%',
        fontFamily: 'Lexend-Bold',
        fontSize: 20,
        color: AppStyles.colors.text,
        width: 'auto',
        padding: 8,
        alignSelf: 'center',
        marginVertical: 4,
        borderBottomWidth: 4,
    },
    startBtn: {
        width: '95%',
        margin: 8,
        // paddingHorizontal: 130,
        // width: '100%',
        // marginHorizontal: 50,
        alignSelf: 'center', 
        backgroundColor: AppStyles.colors.accent
    }
})

export default styles