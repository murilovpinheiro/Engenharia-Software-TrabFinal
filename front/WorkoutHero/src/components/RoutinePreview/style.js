import {StyleSheet} from 'react-native'
import AppStyles from '../../AppStyles';


const styles = StyleSheet.create({
    body: {
        backgroundColor: AppStyles.colors.secondary,
        borderRadius: 24,
        // borderWidth: 5, borderColor: 'gray', borderRadius: 8,
        marginVertical: 16, paddingHorizontal: 8,
    },
    headerText: {
        fontSize: 16,
        paddingHorizontal: 4
        // color: "black"
    },
    scroll: {
    },
    img: {
        borderWidth: 4, borderColor:'gold', borderRadius: 8,
        height: 120, width: 120, margin: 8,

    }
});

export default styles