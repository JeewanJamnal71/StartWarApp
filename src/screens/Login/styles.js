import { StyleSheet } from "react-native";
import { normalize, screenHeight, screenWidth } from "../../utils/Metrics";
import { themeColor } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
      width: screenWidth,
      height: screenHeight,
      backgroundColor: themeColor.white
    },
    scrollView:{
      paddingVertical:screenHeight*.08,
      backgroundColor:themeColor.white
    },
    headerImageStyle:{
      width: screenWidth*.9,
      height: screenWidth*.35,
      resizeMode:'stretch'
    },
    headerTextStyle:{
        fontSize:normalize(22),
        textAlign:'center',
        color: themeColor.black
    },
    input: {
      width: screenWidth*.9,
      height: screenHeight*.075,
      marginTop: 16,
      paddingHorizontal: 10,
      alignSelf:'center',
      backgroundColor:themeColor.lightGreyColor,
      paddingHorizontal: 15,
      borderRadius:5
    },
    errorText: {
      width: screenWidth*.9,
      padding:5,
      color: themeColor.red,
      alignSelf:'center'
    },
    button: {
      marginTop:30,
      width: screenWidth*.9,
      height: screenHeight*.065,
      backgroundColor: themeColor.default, // Customize the button background color
      borderRadius: 5,
      padding: 10,
      alignSelf:'center',
      justifyContent:'center'
    },
    butttonTextStyle:{
      fontSize:15,
      color: themeColor.white,
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
      color: themeColor.black
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
