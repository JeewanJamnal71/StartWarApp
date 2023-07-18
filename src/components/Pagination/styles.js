import { StyleSheet } from "react-native";

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
      backgroundColor: '#ccc',
    },
    nextButton: {
      backgroundColor: '#007BFF',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    pageText: {
      marginHorizontal: 8,
      fontSize: 16,
    },
  });

export default styles;