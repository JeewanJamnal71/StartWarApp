import { StyleSheet } from "react-native";
import { themeColor } from "../../constants/colors";
import { normalize, screenHeight, screenWidth } from "../../utils/Metrics";

const styles = StyleSheet.create({
    rootContainerStyle:{
      width:screenWidth*.8,
      alignItems: 'flex-end',
      marginTop: screenHeight*.08
    },
    container: {
      width: screenWidth*.7,
      borderRadius: normalize(15),
      flexDirection:'row'
    },
    imageContainer:{
      width: screenWidth*.25
    },
    imageContainer2:{
      position:'absolute',
      top: -screenHeight*.05,
      left: -screenWidth*.12,
      width: screenWidth*.34,
      height: screenHeight*.22,
    },
    imgStyle: {
      borderRadius:normalize(20),
      width: screenWidth*.34,
      height: screenHeight*.22,
    },
    containerTxt: {
      fontSize: 13,
      color: themeColor.white,
      fontWeight:'600'
    },
    containerHeadingStyle: {
      fontSize: 16,
      color: themeColor.white,
      fontWeight:'bold',
    },
    textMainContainer:{
      width: screenWidth*.4,
      marginVertical: screenHeight*.02
    },
    textSubContainer:{
      flexDirection:'row',
      marginVertical: screenHeight*.03
    },
    textSubLeftContainer:{
      borderRightWidth:1,
      paddingRight:10
    },
    textSubRightContainer:{
      borderLeftWidth:1,
      paddingLeft:10
    }
});

export default styles