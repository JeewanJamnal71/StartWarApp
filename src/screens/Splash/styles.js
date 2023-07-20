import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../utils/Metrics";
import { themeColor } from "../../constants/colors";

const styles = StyleSheet.create({
  splashMainContainer: {
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColor.black2
  },
  splashImage: {
    width: screenWidth,
    height: screenHeight,
    alignSelf: 'center',
  },
});

export default styles;