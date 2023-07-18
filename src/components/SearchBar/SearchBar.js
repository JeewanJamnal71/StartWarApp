import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import debounce from 'lodash/debounce';
import styles from './styles';


const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchDebounced = useCallback(
    debounce((text) => {
      onSearch(text);
    }, 300),
    [onSearch]
  );

  const handleSearch = (text) => {
    setSearchText(text);
    handleSearchDebounced(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <Button title="Search" onPress={() => handleSearch(searchText)} />
    </View>
  );
};

export default SearchBar;
