import React, { useState, useCallback } from 'react';
import { View, TextInput, Image} from 'react-native';
import imageConstants from '../../constants/ImageConstants';
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
      <Image 
        source={imageConstants.searchIcon}
        style={styles.searchIconStyle}></Image>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};

export default SearchBar;
