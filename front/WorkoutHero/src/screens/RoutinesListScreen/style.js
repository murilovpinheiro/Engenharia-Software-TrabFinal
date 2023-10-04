import {StyleSheet} from 'react-native'
import AppStyles from '../../AppStyles'

const styles = StyleSheet.create({
    body: {
        backgroundColor: AppStyles.colors.background,
        flex: 1, padding: '5%',
    },
    scrollBody: {
        width: "100%", height:"100%",
    },
    dividerLeft: {
        height: 6, borderRadius: 10,
        backgroundColor: AppStyles.colors.primary,
        flex: 0.3,
        left: -30
    },
    dividerRight: {
        height: 6, borderRadius: 10,
        backgroundColor: AppStyles.colors.primary,
        flex: 0.3,
        right: -30
    },
    btn: {
        backgroundColor: AppStyles.colors.accent
    }
})

export default styles