import { StyleSheet } from "react-native";
import { normalize, screenHeight, screenWidth } from "../../utils/Metrics";
import { themeColor } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
      width:screenWidth*.75,
      flexDirection: 'row',
      alignItems:'center',
      borderWidth: 1.2,
      borderColor: themeColor.darkGreyColor,
      borderRadius: normalize(25),
      paddingLeft: 8,
      backgroundColor: themeColor.white,
      alignSelf:'center',
      elevation: 5
    },
    input: {
      flex: 1,
      height: screenHeight*.07,
      fontSize: 16,
      paddingHorizontal: 10
    },
    searchIconStyle:{
      width: normalize(15),
      height: normalize(15)
    }
  });

export default styles;