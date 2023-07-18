import { StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../../utils/Metrics";
import { themeColor } from "../../constants/colors";

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingTop:screenHeight*.03,
      height:screenHeight,
      backgroundColor: themeColor.white
    },
    contentContainer:{
      width:screenWidth,
      alignItems:'center',
      backgroundColor:themeColor.white,
      paddingVertical:screenHeight*.02,
    },
    paginationContainer:{
      paddingVertical:10
    },
    searchBarStyle:{
      width:screenWidth*.8,
      height:screenHeight*.08, 
      borderColor:themeColor.black,
      borderWidth:1,
      alignSelf:'center',
      borderRadius:5
    },
    textStyle:{
      width:screenWidth*.8,
      alignSelf:'center',
      fontSize:16,
      marginTop:10
    }
  });

  export default styles;