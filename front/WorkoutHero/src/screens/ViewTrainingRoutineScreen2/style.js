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
        marginVertical: 4
    },
    startBtn: {
        margin: 8,
        width: '80%', alignSelf: 'center', backgroundColor: AppStyles.colors.accent
    }
})

export default styles