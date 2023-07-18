import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { removeAuthToken, removeCredentials } from '../../utils/KeychainStorage';
import imageConstants from '../../constants/ImageConstants';
import styles from './styles';

const MenuComponent=()=>{
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const logout=()=>{
    setVisible(false)
    removeCredentials()
    removeAuthToken()
  };

  const showMenu = () => setVisible(true);

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Menu
        visible={visible}
        anchor={<Pressable onPress={showMenu}>
          <Image source={imageConstants.menuIcon} style={styles.menuStyle}></Image>
        </Pressable>}
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={logout}>Logout</MenuItem>
      </Menu>
    </View>
  );
}

export default MenuComponent;