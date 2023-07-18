import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from './styles'

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  let _totalPages = Math.ceil(totalPages/10)
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.prevButton]}
        onPress={onPrevPage}
        disabled={currentPage === 1}
      >
        <Text style={styles.buttonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.pageText}>{currentPage}/{_totalPages}</Text>  
      <TouchableOpacity
        style={[styles.button, styles.nextButton]}
        onPress={onNextPage}
        disabled={currentPage === totalPages}
      >
        <Text style={styles.buttonText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;
