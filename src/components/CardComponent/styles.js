import { StyleSheet } from "react-native";
import { themeColor } from "../../constants/colors";
import { normalize, screenHeight, screenWidth } from "../../utils/Metrics";

const styles = StyleSheet.create({
    container: {
      width: screenWidth*.8,
      justifyContent: 'center',
      marginTop: normalize(10),
      marginBottom: normalize(5),
      elevation: 4,
      borderRadius: 8,
      backgroundColor:themeColor.white,
      shadowColor: themeColor.black,
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    containerImg: {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      width: screenWidth*.8,
      height: screenHeight*.25,
      
    },
    containerTxt1: {
      width: screenWidth*.8,
      padding: normalize(2),
      fontWeight:'600'
    },
    containerTxt2: {
      width: screenWidth*.8,
      padding: normalize(2),
      color: themeColor.white,
      fontWeight:'600'
    },
    contentContainer:{
      width:screenWidth,
      alignItems:'center',
      paddingVertical:screenHeight*.04
    }
});

export default styles