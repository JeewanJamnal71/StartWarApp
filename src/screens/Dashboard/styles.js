import { StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../../utils/Metrics";

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingTop:screenHeight*.04,
      height:screenHeight
    },
    contentContainer:{
      width:screenWidth,
      alignItems:'center',
      backgroundColor:'#fff',
      paddingVertical:screenHeight*.04,
    },
    paginationContainer:{
      paddingVertical:10
    },
    searchBarStyle:{
      width:screenWidth*.8,
      height:screenHeight*.08, 
      borderColor:'#111',
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