import {StyleSheet} from 'react-native'
import AppStyles from '../../AppStyles';

const defaultStyles = StyleSheet.create({
    textInput: {
        backgroundColor: '#0000',
        color: AppStyles.colors.text,
        fontFamily: 'Lexend',

        borderColor: AppStyles.colors.primary,
        borderWidth: 2,
        borderRadius: 16,
        paddingLeft: 8, paddingRight: 8
    },
    textInputLow: {
        backgroundColor: '#0000',
        color: AppStyles.colors.text,
        fontFamily: 'Lexend',

        borderColor: AppStyles.colors.primary,
        // borderWidth: 2,
        borderBottomWidth:2,
        // borderRadius: 16,
        paddingLeft: 8, paddingRight: 8
    }
});

export default defaultStyles