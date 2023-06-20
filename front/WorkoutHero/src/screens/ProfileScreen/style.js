import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    body: {
        width: "100%", height:"100%",
        padding: '5%'
    },
    viewUser: {
        //borderWidth: 2, borderColor: 'red'
    },
    viewStats: {
        flexDirection: 'row',
        margin: 4
    },
    textStats: {
        flex: 0.5,
        color: '#808080'
    },
    textStats2: {
        flex: 0.5,
        textAlign: 'right'
    }
});

export default styles