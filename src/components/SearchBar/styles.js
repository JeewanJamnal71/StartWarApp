import { StyleSheet } from "react-native";
import { screenWidth } from "../../utils/Metrics";
import { themeColor } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
      width:screenWidth*.8,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: themeColor.darkGreyColor,
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor: themeColor.white,
      alignSelf:'center'
    },
    input: {
      flex: 1,
      height: 40,
    },
  });

export default styles;