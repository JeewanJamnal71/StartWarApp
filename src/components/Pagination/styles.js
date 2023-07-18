import { StyleSheet } from "react-native";
import { themeColor } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    button: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    prevButton: {
      backgroundColor: themeColor.darkGreyColor,
    },
    nextButton: {
      backgroundColor: themeColor.default,
    },
    buttonText: {
      color: themeColor.white,
      fontWeight: 'bold',
    },
    pageText: {
      marginHorizontal: 8,
      fontSize: 16,
    },
  });

export default styles;