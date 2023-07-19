import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image, ActivityIndicator, StatusBar } from 'react-native';
import { storeCredentials, generateRandomToken, saveAuthToken } from '../../utils/KeychainStorage';
import NavigationService from '../../navigation/NavigationService';
import { usernameRegex, passwordRegex } from '../../utils/Validations';
import imageConstants from '../../constants/ImageConstants';
import { Formik } from 'formik';
import styles from './styles';

let initialState = {
  username: '',
  password: ''
}
const Login = () => {

  const [socialIcons] = useState([imageConstants.fbImage, imageConstants.instaImage, imageConstants.pinterestImage, imageConstants.linkedinImage]);
  const [formData, setFormData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleLogin = async(values) => {
    setIsLoading(true)
    try{
      let token = await generateRandomToken()
      await storeCredentials(values.username, values.password);
      await saveAuthToken(token)
      setTimeout(() => {
        setIsLoading(false)
        NavigationService.navigate('Dashboard')
      }, 500);
    }catch(errors){
      setIsLoading(false)
    }
    
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Username is required';
    }else if (!usernameRegex.test(values.username)) {
      errors.username = 'Invalid username format';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }else if (!passwordRegex.test(values.password)) {
      errors.password = 'Invalid Password';
    }
    return errors;
  };

  const B=(props)=><Text style={{color:'#0386D0'}}>{props.children}</Text>

  const U=(props)=><Text style={{textDecorationLine:'underline'}}>{props.children}</Text>

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <Formik
              initialValues={formData}
              onSubmit={handleLogin}
              validate={validate}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <Image
                    style={styles.headerImageStyle}
                    source={imageConstants.loginBackground}
                  />
                  <View style={styles.wrapperContainer}>
                    <Text style={styles.headerTextStyle}>Login</Text>
                  </View>
                  <View style={styles.wrapperContainer}>
                    <Text style={styles.textStyle}>By signing you are agreeing to our</Text>
                    <Text style={styles.textStyle}><B>Terms and privacy policy</B></Text>
                  </View>

                  <View style={styles.textFieldWrapperStyle}>
                    <Text style={styles.textFieldLabelStyle}>Username</Text>
                  </View>
                  
                  <TextInput
                    placeholder="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    style={[styles.input]}
                  />
                  {touched.username && errors.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}

                  <View style={styles.textFieldWrapperStyle}>
                    <Text style={styles.textFieldLabelStyle}>Password</Text>
                  </View>

                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  <View style={styles.textFieldWrapperStyle}>
                    <Text style={[styles.textFieldLabelStyle,{textAlign:'right'}]}><B><U>Forgot Password?</U></B></Text>
                  </View>

                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleSubmit}
                    disabled={isLoading ? true : false}
                  >
                    {
                      isLoading ? <ActivityIndicator size="small" color='#fff' /> : 
                      <Text style={styles.butttonTextStyle}>LOGIN</Text>
                    }
                    
                  </TouchableOpacity>

                  <View style={styles.wrapperContainer}>
                    <Text style={[styles.textStyle,{fontSize:16}]}>or connect with</Text>
                  </View>

                  <View style={[styles.socialIconContainer]}>
                    {
                      socialIcons.map((img,i)=>(
                        <Image
                          key={i}
                          style={styles.socialIconStyle}
                          source={img}
                        />
                      ))
                    }
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};



export default Login;
