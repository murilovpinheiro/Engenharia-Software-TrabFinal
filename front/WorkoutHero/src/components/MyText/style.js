import {StyleSheet} from 'react-native'
import AppStyles from '../../AppStyles';

const defaultStyles = StyleSheet.create({
    textRegular: {
        fontFamily: 'Lexend',
        fontSize: 16,
        color: AppStyles.colors.text, 
    },
    textH3: {
        fontFamily: 'Lexend-Bold',
        fontSize: 20,
        color: AppStyles.colors.text,
        marginVertical: 4
    },
    textH1: {
        fontFamily: 'Lexend-Bold',
        fontSize: 40,
        color: AppStyles.colors.text,
        marginVertical: 12
    }
});

export default defaultStyles