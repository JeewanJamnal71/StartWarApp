import React from 'react';
import { Provider } from 'react-redux';
import {store, persistor} from './src/redux/store'; 
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';

function App(){
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
        <Toast />
      </PersistGate>
    </Provider>
  );
}

export default App;
