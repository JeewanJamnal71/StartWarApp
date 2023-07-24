import React, { useState, useCallback } from 'react';
import { View, TextInput, Image} from 'react-native';
import imageConstants from '../../constants/ImageConstants';
import { setLoading } from '../../redux/slices/starwarDataSlice';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import styles from './styles';

const SearchBar = React.memo(({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const handleSearchDebounced = useCallback(
    debounce((text) => {
      onSearch(text);
    }, 1000),
    [onSearch]
  );

  const handleSearch = (text) => {
    setSearchText(text);
    dispatch(setLoading(true))
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
});

export default SearchBar;
