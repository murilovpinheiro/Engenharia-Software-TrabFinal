import {StyleSheet} from 'react-native'
import AppStyles from '../../AppStyles'

const styles = StyleSheet.create({
    body: {
        flex: 1, padding: '2%',
        paddingHorizontal: 0,
        backgroundColor: AppStyles.colors.background,
    },
    scrollBody: {
        width: "100%", height:"100%",
        marginHorizontal: 0
    },
})

export default styles