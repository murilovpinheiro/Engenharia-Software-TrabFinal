import {StyleSheet} from 'react-native'
import AppStyles from '../../AppStyles';

const colorGray = '#808080'
const colorBlack = '#00132A'

const defaultStyles = StyleSheet.create({
    btnRegular: {
        backgroundColor: AppStyles.colors.secondary,
        padding: 8,

        borderWidth: 0, borderRadius: 100,

        justifyContent: 'center', alignItems: 'center'
    },
    btnTextRegular: {
        fontFamily: 'Lexend-Bold',// fontWeight: 'bold',
        color: AppStyles.colors.text, fontSize: 18,
    },
    btnThin: {
        backgroundColor: colorBlack,
        padding: 4,

        borderWidth: 3, borderRadius: 12,
        borderColor: colorGray,

        justifyContent: 'center', alignItems: 'center'
    },
    btnTextThin: {
        fontFamily: 'Lexend-Bold',// fontWeight: 'bold',
        color: 'white', fontSize: 12,
    }
});

export default defaultStyles