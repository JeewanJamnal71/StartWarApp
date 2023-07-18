import React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import styles from './styles';


const Button = ({onPress, disabled, buttonName, colors}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.btnContainer, {backgroundColor: colors.button}]}>
      <Text style={[styles.btnText, {color: colors.text}]}>{buttonName}</Text>
    </Pressable>
  );
};

export default Button;