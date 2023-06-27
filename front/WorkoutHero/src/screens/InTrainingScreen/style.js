import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    scrollBody: {
        width: "100%", height:"100%",
        padding: '5%',
    },
    imgBox: {
        height: 200, width: '90%', alignSelf: 'center',
        backgroundColor: '#00132A',
        borderColor: '#F2BD00', borderRadius: 10, borderWidth: 2
    },
    viewTimer: {
        //width: '100%',
        flexDirection: 'row', justifyContent: 'center',
        //backgroundColor: '#00132AAA',
        //position: 'absolute',
        //alignSelf: 'center',
        //top: '85%'
    },
    btnTimer: {
        marginHorizontal: 20, marginTop: 16, marginBottom: 30
    }

});

export default styles