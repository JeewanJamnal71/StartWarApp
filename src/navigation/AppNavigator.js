import React, {useEffect, useState} from 'react';
import {navigationRef} from '../navigation/NavigationService';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import Dashboard from '../screens/Dashboard/Dashboard';
import MenuComponent from '../components/MenuComponent/MenuComponent';
import { themeColor } from '../constants/colors';
import NavigationService from '../navigation/NavigationService';
import { getAuthToken } from '../utils/KeychainStorage';
import SplashScreen from "react-native-splash-screen";

const Stack = createStackNavigator();

function AppNavigator() {

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
      NavigationService.replace(screenName);
  }

  useEffect(()=>{
    getInitialData()
  },[])

  return (
    <NavigationContainer ref={navigationRef} >
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          options={{
            headerShown: false,
          }} 
          component={Login} />

          <Stack.Screen 
          name="Dashboard" 
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: themeColor.default, // Set the header background color
            }, 
            headerTintColor: themeColor.white, // Set the header text color
            headerTitleStyle: {
              fontWeight: '600', // Set the header title style
            },
            headerLeft: () => null, // remove default back button
            headerRight: () => (  // add custom compponent
              <MenuComponent />
            )
          }}
          component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;