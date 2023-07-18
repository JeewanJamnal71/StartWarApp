import { StyleSheet } from "react-native";
import { normalize, screenHeight, screenWidth } from "../../utils/Metrics";

const styles = StyleSheet.create({
    headerContainer:{
      width:screenWidth*.9,
      flexDirection:'row',
      paddingVertical:5
    },
    closeButtonStyle:{
      width:screenWidth*.08,
      alignItems:'center'
    },
    container: {
      width:screenWidth,
      height:screenHeight,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#00000099'
    },
    modalView: {
      width: screenWidth*.9,
      height:screenHeight*.6,
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 25,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    headingTextStyle: {
      fontSize:18,
      textAlign: 'center',
      color:'#111',
      fontWeight: 'bold'
    },
    textStyle: {
      fontSize:14,
      color:'#111',
      marginTop:5
    },
  });

export default styles