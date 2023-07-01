import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    body:{
        margin:8
    },
    header: {
        height:64, flexDirection:'row', alignVertical:'center'
    },
    headerImg: {
        flex:0.15, 
        backgroundColor: 'gray', borderRadius:32, 
        margin:2, marginRight: 8, aspectRatio:1,
        alignVertical:'center'
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
        margin:2
    },
    divider: {
        marginTop: 16, height:4, borderRadius: 2, backgroundColor: 'gray'
    }
})

export default styles