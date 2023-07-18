import { StyleSheet } from "react-native";
import { normalize, screenHeight, screenWidth } from "../../utils/Metrics";

const styles = StyleSheet.create({
    container: {
      width: screenWidth,
      height: screenHeight,
      paddingTop: screenHeight*.05,
      backgroundColor:'#fff'
    },
    headerImageStyle:{
      width: screenWidth*.9,
      height: screenWidth*.35,
      resizeMode:'stretch'
    },
    headerTextStyle:{
        fontSize:normalize(22),
        textAlign:'center',
        color:'#111'
    },
    input: {
      width: screenWidth*.9,
      height: screenHeight*.075,
      marginTop: 16,
      paddingHorizontal: 10,
      alignSelf:'center',
      backgroundColor:'#F7F7F9',
      paddingHorizontal: 15,
      borderRadius:5
    },
    errorText: {
      width: screenWidth*.9,
      padding:5,
      color: 'red',
      alignSelf:'center'
    },
    button: {
      marginTop:30,
      width: screenWidth*.9,
      height: screenHeight*.065,
      backgroundColor: '#0386D0', // Customize the button background color
      borderRadius: 5,
      padding: 10,
      alignSelf:'center',
      justifyContent:'center'
    },
    butttonTextStyle:{
      fontSize:15,
      color:'#fff',
      textAlign:'center'
    },
    textStyle:{
      fontSize:14,
      textAlign:'center',
      flexWrap: 'wrap'
    },
    wrapperContainer:{
      width: screenWidth*.7,
      alignSelf:'center',
      marginTop: screenHeight*.015,
    },
    textFieldWrapperStyle:{
      width:screenWidth*.9,
      alignSelf:'center',
      marginTop: screenHeight*.02,
    },
    textFieldLabelStyle:{
      fontSize:14,
      color:'#111'
    },
    socialIconContainer:{
      width: screenWidth*.6,
      alignSelf:'center',
      marginTop: screenHeight*.02,
      flexDirection:'row', 
      justifyContent:'space-around'
    },
    socialIconStyle:{
      width: screenWidth*.12,
      height: screenWidth*.12
    }
});

export default styles;
