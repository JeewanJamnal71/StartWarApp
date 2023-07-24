import { StyleSheet } from "react-native";
import { normalize, screenHeight, screenWidth } from "../../utils/Metrics";
import { themeColor } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
      width:screenWidth*.12,
      alignItems:'center',
      justifyContent: 'center'
    },
    menuStyle:{
        width: normalize(25), 
        height: normalize(25),
        resizeMode: 'contain'
    },
    selectedItemColor:{
      backgroundColor: themeColor.darkGreyColor
    },
    unselectedItemColor:{
      backgroundColor: themeColor.white
    },
  });

export default styles;