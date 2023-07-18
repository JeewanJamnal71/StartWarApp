import { StyleSheet } from "react-native";
import { normalize } from "../../utils/Metrics";

const styles = StyleSheet.create({
    btnContainer: {
      marginTop: normalize(20),
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: normalize(5),
    },
    btnText: {
      textAlign: 'center',
      padding: normalize(10),
    },
});

export default styles