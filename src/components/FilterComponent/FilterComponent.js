import React, { useState, useCallback } from 'react';
import { View, Image, Pressable} from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { setLoading } from '../../redux/slices/starwarDataSlice';
import imageConstants from '../../constants/ImageConstants';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import styles from './styles';

const FilterComponent = React.memo(({ filterType, onFilter }) => {
  console.log(filterType)
  const dispatch = useDispatch()
  const [showFilter, setShowFilter] = useState(false)

  const showHideFilter=()=>setShowFilter(!showFilter)

  const handleFilterDebounced = useCallback(
    debounce((text) => {
      onFilter(text)
    }, 1000),
    [onFilter]
  );

  const selectedFilter =(text) => { 
    setShowFilter(false)
    dispatch(setLoading(true))
    handleFilterDebounced(text) 
  }

  return (
    <View style={styles.container}>
        <Menu
            visible={showFilter}
            anchor={<Pressable onPress={showHideFilter}>
            <Image source={imageConstants.filterIcon} style={styles.menuStyle}></Image>
            </Pressable>}
            onRequestClose={showHideFilter}
        >
            <MenuItem style={filterType === 'homeland' ? styles.selectedItemColor : styles.unselectedItemColor} 
              onPress={()=>selectedFilter('homeland')}>Homeland</MenuItem>
            <MenuDivider />
            <MenuItem style={filterType === 'film' ? styles.selectedItemColor : styles.unselectedItemColor}
              onPress={()=>selectedFilter('film')}>Film</MenuItem>
            <MenuDivider />
            <MenuItem style={filterType === 'species' ? styles.selectedItemColor : styles.unselectedItemColor}
              onPress={()=>selectedFilter('species')}>Species</MenuItem>
            <MenuDivider />
            <MenuItem style={filterType === 'none' || filterType === null ? styles.selectedItemColor : styles.unselectedItemColor}
              onPress={()=>selectedFilter('none')}>None</MenuItem>
        </Menu>
    </View>
  );
});

export default FilterComponent;
