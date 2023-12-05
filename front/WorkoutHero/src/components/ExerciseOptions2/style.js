import {StyleSheet} from 'react-native'
import AppStyles from '../../AppStyles'

const styles = StyleSheet.create({
    body: {
        margin: 12
    },
    container: {
        height: 120,
        flexDirection: 'row',
        // borderWidth: 2
    },
    imgFrame: {
        width: 64, height: 64, borderRadius: 32,
        overflow: "hidden",
        
    },
    img: {
        width: "100%", height: "100%"
    },
    textInfoView: {
        marginHorizontal: 12,
        flexDirection: "column",
        // borderWidth: 2
    },
    textName: {
        fontSize: 16,
        width: 240,
    },
    textParts: {
        height: 64,
        width: 240,
        // borderWidth: 2
    },
    selectIcon: {
        position: "absolute",
        alignItems: "center",
        top: 8,
        right: 12,
        // borderWidth: 2
    },


    divider: {
        width: "100%",
        height: 8,
        backgroundColor: AppStyles.colors.primary,
        borderRadius: 4
    }
})

export default styles