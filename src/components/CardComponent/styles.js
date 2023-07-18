import { normalize, screenHeight, screenWidth } from "../../utils/Metrics";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      width: screenWidth*.8,
      justifyContent: 'center',
      marginTop: normalize(10),
      marginBottom: normalize(5),
      elevation: 4,
      borderRadius: 8,
      backgroundColor:'#ffffff',
      shadowColor: '#000000',
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    containerImg: {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      width: screenWidth*.8,
      height: screenHeight*.25,
      // resizeMode: 'contain',
      
    },
    containerTxt: {
      width: screenWidth*.8,
      padding: normalize(2),
    },
    contentContainer:{
      width:screenWidth,
      alignItems:'center',
      paddingVertical:screenHeight*.04
    }
});

export default styles