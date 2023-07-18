import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import Strings from '../constants/Strings';

const Loader = props => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" />
      <Text style={styles.loaderTextStyle}>{Strings.loading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderTextStyle: {
    color: '#111',
    marginTop: 10,
    fontWeight: '600',
  },
});

export default Loader;
