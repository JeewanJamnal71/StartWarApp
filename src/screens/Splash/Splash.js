import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import NavigationService from '../../navigation/NavigationService';
import imageConstants from '../../constants/ImageConstants';
import { getAuthToken } from '../../utils/KeychainStorage';
import SplashScreen from "react-native-splash-screen";
import styles from './styles';

const Splash = () => {

  const getInitialData=async()=>{
    try{
      let _authToken = await getAuthToken()
      if(_authToken){
        redirect('Dashboard')
      }else{
        redirect('Login')
      }
    }catch(err){
      redirect('Login')
    }
  }

  const redirect=(screenName)=>{
    SplashScreen.hide();
    setTimeout(()=>{
        NavigationService.replace(screenName); 
    },500)
    
  }

  useEffect(()=>{
    getInitialData()
  },[])

  return (
    <View style={styles.splashMainContainer}>
      <Image
        style={styles.splashImage}
        source={imageConstants.splashImage}
        resizeMode="cover"
      />
    </View>
  );
};



export default Splash;