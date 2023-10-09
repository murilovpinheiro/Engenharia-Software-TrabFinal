import {StyleSheet} from 'react-native'
import AppStyles from '../../AppStyles';

const styles = StyleSheet.create({
    body: {
        width: "100%", 
        height:"100%",
        padding: '5%',
        backgroundColor: AppStyles.colors.background
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    viewUser: {
        height: 140,
        // borderWidth: 2, borderColor: 'red',
        flexDirection: "row", alignItems: "center"
    },
    viewUserImage: {
        width:128, height:128, 
        borderRadius: 16,
        backgroundColor: AppStyles.colors.secondary,
        justifyContent: "center", alignItems: "center"
    },
    viewStats: {
        flexDirection: 'row',
        margin: 4
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
    viewStats: {
        justifyContent: "center", alignItems: "center",
        padding: 16, borderRadius: 16,
        backgroundColor: AppStyles.colors.secondary
    },
    viewSingleStat: {
        flexDirection: "row",
        // borderWidth:2, 
        width:"100%", justifyContent: "center"
    },
    textStats: {
        flex: 1,
        color: '#808080',
        fontSize: 17
    },
    textStats2: {
        right: 0,
        textAlign: 'right',
        fontFamily: "Lexend-Bold",
        fontSize: 18,
        color: AppStyles.colors.accent
    }
});

export default styles