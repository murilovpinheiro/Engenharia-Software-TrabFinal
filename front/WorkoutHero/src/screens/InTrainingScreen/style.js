import {StyleSheet} from 'react-native'
import AppStyles from '../../AppStyles';


const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: AppStyles.colors.background
    },
    scrollBody: {
        width: "100%", height:"100%",
        padding: 16,
    },
    imgBox: {
        width: '95%', aspectRatio:1.2, alignSelf: 'center',
        backgroundColor: AppStyles.colors.accent,
        borderRadius: 16,
        padding:16,
        alignItems:'center'
        // borderColor: '#F2BD00', borderRadius: 10, borderWidth: 2
    },
    img: {

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
    },

    viewSets:{
        backgroundColor: AppStyles.colors.secondary,
        borderRadius:16,
        padding:8,

        // borderWidth:2
    },
    setsHeader: {
        // height: 10,
        flexDirection:'row',
        alignItems:'center'
    },
    setsHeaderText: {
        // justifyContent:'center',
        textAlign:'center',
        flex:0.25,
        fontSize: 10,
        // borderWidth:2
    },
    setOptions:{
        margin: 8,
        justifyContent: 'center',
        height:32,
        
        borderWidth:0,
        backgroundColor: AppStyles.colors.accent,
        color: AppStyles.colors.text
    },

});

export default styles