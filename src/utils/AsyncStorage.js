import AsyncStorage from '@react-native-async-storage/async-storage';

//Store data in localstorage
export const storeItem = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    return error;
  }
};

// get data from localstorage
export const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    return error;
  }
};

// clear all data in localstorage
export const clearLocalStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    return error;
  }
};

// remove data from localstore
export const removeItem = async key => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    return error;
  }
};
