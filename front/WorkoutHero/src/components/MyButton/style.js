import {StyleSheet} from 'react-native'

const colorGray = '#808080'
const colorBlack = '#00132A'

const defaultStyles = StyleSheet.create({
    btnRegular: {
        backgroundColor: colorBlack,
        padding: 8,

        borderWidth: 5, borderRadius: 12,
        borderColor: colorGray,

        justifyContent: 'center', alignItems: 'center'
    },
    btnTextRegular: {
        fontFamily: 'Lexend', fontWeight: 'bold',
        color: 'white', fontSize: 18,
    }
});

export default defaultStyles