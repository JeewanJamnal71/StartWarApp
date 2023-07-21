import { StyleSheet } from "react-native";
import { normalize, screenHeight, screenWidth } from "../../utils/Metrics";
import { themeColor } from "../../constants/colors";

const styles = StyleSheet.create({
    headerContainer:{
      width:screenWidth*.8,
      flexDirection:'row',
      paddingVertical:5,
      justifyContent: 'flex-end',
      marginBottom: 10
    },
    closeButtonStyle:{
      width:screenWidth*.07,
      alignItems:'center',
      backgroundColor: themeColor.white,
      elevation:5,
      borderRadius: 10000000,
    },
    closeButtonTextStyle:{
      fontSize: normalize(15),
      color: themeColor.black, 
      fontWeight: 'bold'
    },
    container: {
      width:screenWidth,
      height:screenHeight,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeColor.modalBgColor
    },
    modalView: {
      width: screenWidth*.9,
      backgroundColor: themeColor.modalBgColor2,
      borderRadius: normalize(20),
      shadowColor: themeColor.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalViewSubContainer: {
      width:screenWidth*.8,
      alignSelf:'center',
      marginVertical:screenHeight*.02
    },
    headingTextStyle: {
      width: screenWidth*.35,
      fontSize:normalize(16),
      color: themeColor.black,
      fontWeight: '600'
    },
    textStyle: {
      fontSize:14,
      color: themeColor.black,
    },
    headerCardContainerWrapper:{
      width:screenWidth*.8,
      flexDirection:'row',
      elevation:5,
      backgroundColor:themeColor.white,
      borderRadius:normalize(10),
      padding: 15,
      justifyContent:'space-between'
    },
    headerCardContainerTextWrapper:{
      width: screenWidth*.35, 
      paddingVertical: 12
    },
    headerCardContainerTitle:{
      fontSize: normalize(9), 
      marginTop: normalize(10),
      color: themeColor.fontHighLightedText
    },
    headerCardContainerText:{
      fontSize: normalize(12),
      color: themeColor.black,
    },
    imageStyle:{
      width: screenWidth*.35, 
      height: screenHeight*.25, 
      resizeMode:'stretch', 
      borderRadius:normalize(10)
    },
    optionWrapper:{
      width:screenWidth*.6,
      flexDirection:'row',
      elevation:5,
      backgroundColor:themeColor.white,
      borderRadius:normalize(20),
      padding: 10,
      justifyContent:'space-around',
      marginTop: screenHeight*.02, 
      alignSelf:'center'
    },
    selectedOptionColor:{
      paddingVertical:5, 
      paddingHorizontal:15, 
      backgroundColor: themeColor.default, 
      borderRadius:normalize(15)
    }, 
    unselectedOptionColor:{
      paddingVertical:5, 
      paddingHorizontal:15, 
      backgroundColor: themeColor.white, 
      borderRadius:normalize(15)
    },
    selectedOptionTextColor:{
      color: themeColor.white,
      fontWeight:'bold'
    }, 
    unselectedOptionTextColor:{
      color: themeColor.default
    },
    cardItemsWrapper:{
      flexDirection:'row',
      justifyContent:'space-between', 
      marginTop: screenHeight*.025
    },
    cardItemStyle:{
      width:screenWidth*.24, 
      height: screenHeight*.1,
      elevation:5,
      backgroundColor:themeColor.white,
      alignItems:'center',
      justifyContent:'center', 
      borderRadius:normalize(15)
    },
    cardHeadingStyle:{
      fontSize: normalize(12),
      fontWeight:'bold',
      color: themeColor.black
    },
    cardTextStyle:{
      fontSize: normalize(10),
      color: themeColor.fontHighLightedText
    },
    cardItemStyle2:{
      width:screenWidth*.8, 
      height: screenHeight*.11,
      elevation:5,
      backgroundColor:themeColor.white,
      justifyContent:'center', 
      borderRadius:normalize(15),
      paddingHorizontal:15
    },
  });

export default styles