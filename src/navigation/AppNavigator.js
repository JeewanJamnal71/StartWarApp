import React from 'react';
import {navigationRef} from '../navigation/NavigationService';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import Dashboard from '../screens/Dashboard/Dashboard';

const Stack = createStackNavigator();

function AppNavigator() {

  return (
    <NavigationContainer ref={navigationRef} >
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;