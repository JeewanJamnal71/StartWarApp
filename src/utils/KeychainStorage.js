import * as Keychain from 'react-native-keychain';
import NavigationService from '../navigation/NavigationService';

    export const generateRandomToken = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
        }
    
        return token;
    };


    // data  save
    export const storeCredentials = async (username, password) => {
        try {
        return await Keychain.setGenericPassword(username, password);
        } catch (error) {
        return error;
        }
    };
  
    // get data
    export const getCredentials = async(key) => {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
            return credentials
            } else {
                return null
            }
        } catch (error) {
        return error;
        }
    };
  
    // remove all data
    export const removeCredentials = async () => {
        try {
            await Keychain.resetGenericPassword();
        } catch (error) {
        return error;
        }
    };

    // Save authentication token
    export const saveAuthToken = async (token) => {
        try {
        return await Keychain.setInternetCredentials('authToken', 'your_service', token);
        } catch (error) {
        console.error('Error saving authentication token:', error);
        }
    };

    // Retrieve authentication token
    export const getAuthToken = async () => {
        try {
        const credentials = await Keychain.getInternetCredentials('authToken');
        if (credentials) {
            const { password: token } = credentials;
            return token
        } else {
            return null
        }
        } catch (error) {
        console.error('Error retrieving authentication token:', error);
        }
    };

    // Retrieve authentication token
    export const removeAuthToken = async () => {
        try {
         await Keychain.resetInternetCredentials('authToken');
         NavigationService.reset('Login')
        } catch (error) {
        console.error('Error retrieving authentication token:', error);
        }
    };

  