import {StyleSheet} from 'react-native'
import AppStyles from '../../AppStyles'

const styles = StyleSheet.create({
    body:{
        margin:8
    },
    header: {
        height:64, flexDirection:'row', alignVertical:'center'
    },
    headerImg: {
        flex:0.15, 
        backgroundColor: 'white', 
        // borderRadius:32, 
        margin:2, marginRight: 8, aspectRatio:1,
        // alignVertical:'center'
    },
    headerTextView: {
        flex:0.85,
        flexDirection:'column', alignVertical: 'center'
    },
    headerTextName: {
        fontSize: 16
    },
    headerTextType: {
        fontSize: 10
    },
    headerDelete: {
        flex:0.15, 
        aspectRatio:1,  alignItems:'center', justifyContent: 'center'
    },
    viewOptions:{
        paddingHorizontal: '5%'
    },
    selectOptions:{
        margin:2,
        backgroundColor: AppStyles.colors.primary,
        // color: AppStyles.colors.primary,
        borderWidth: 0
    },
    divider: {
        marginTop: 16, height:4, borderRadius: 2, backgroundColor: AppStyles.colors.primary
    },

    card: {
        backgroundColor: 'white',
        margin: 12,
        height: 320,
        borderRadius: 16,
        overflow: 'hidden'
    },
    exerciseName: {
        marginTop: 0,
        padding: 4,
        paddingLeft: 16,
        backgroundColor: '#fff6',
        textShadowColor: '#fff', // Border color
        textShadowOffset: { width: 0, height: 1 }, // Border offset (x, y)
        textShadowRadius: 10, // Border width
        textTransform: 'capitalize'
    },
    btnDelete: {
        position: 'absolute',
        top: 6, right: 6,
    },
    img: {
        flex: 1,
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        position: 'absolute',
    },
    content: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 120,
        padding: 15,
        backgroundColor: AppStyles.colors.accent,
    },
    setsRepsView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    setsRepsText: {
        
    },
    setsRepsInput: {
        marginTop: 10,
        fontFamily: 'Lexend-Bold',
        fontSize: 26,
        textAlign: 'center',
        

        width: 50,
        borderWidth: 0,
        borderBottomWidth: 4,
        borderRadius: 0,
        backgroundColor: '#0003'
    },
    muscleText: {
        fontWeight: 300
    }
})

export default styles