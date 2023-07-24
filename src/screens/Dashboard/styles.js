import { StyleSheet } from "react-native";
import { screenWidth, screenHeight, normalize } from "../../utils/Metrics";
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
      marginTop: screenHeight*.04,
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
    },
    headerContainerStyle:{
      width:screenWidth*.9, 
      alignSelf:'center',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom: screenHeight*.02,
    },
    scrollViewStyle:{
      backgroundColor: themeColor.white
    }
  });

  export default styles;