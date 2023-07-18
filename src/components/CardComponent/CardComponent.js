import React, { useCallback } from 'react';
import {
  Text,
  View,
  Pressable
} from 'react-native';
import {normalize} from '../../utils/Metrics';
import imageConstants from '../../constants/ImageConstants';
import FastImage from 'react-native-fast-image';
import Animated, { useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { speciesColor,themeColor } from '../../constants/colors';
import moment from 'moment';
import styles from './styles';

const CardComponent = React.memo(props => {
  const scaleValue = useSharedValue(1);
  let {item,onSelectItem} = props;
  let imageUrl = item.picture ? item.picture.replace(/\/\d+\/\d+$/, "/500/300") : '';
  let _species = item?.species?.length>0 ? item?.species[0] : null
  const _speciesId = _species ? _species.split('/').filter(Boolean).pop() : _species;
  const _cardColor = _speciesId ? speciesColor[_speciesId] : themeColor.white

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(scaleValue.value, [1, 1.2], [1, 1.2]);
    return {
      transform: [{ scale }],
    };
  });

  const handlePressIn = () => {
    scaleValue.value = 1.1;
  };

  const handlePressOut = () => {
    scaleValue.value = 1;
  };
  
  return (
    <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={()=>onSelectItem(item)}
        >
          {({ pressed }) => (
            <Animated.View
              style={[
                animatedStyle
              ]}
            >
              <View style={[styles.container,{backgroundColor:_cardColor}]}>
                <FastImage
                  style={styles.containerImg}
                  source={{
                    uri: imageUrl,
                    priority: FastImage.priority.high,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  placeholderSource={imageConstants.defaultImage}
                  defaultSource = {imageConstants.defaultImage}
                />
                <View style={{flex: 0.6, paddingLeft: normalize(6), alignSelf: 'center'}}>
                  <Text style={_speciesId ? styles.containerTxt2 : styles.containerTxt1}>{item?.name || "NA"}</Text>
                  <Text style={_speciesId ? styles.containerTxt2 : styles.containerTxt1}>
                    {moment(item?.created).format("DD-MM-yyyy") || "NA"}
                  </Text>
                </View>
              </View>
            </Animated.View>
          )}
    </Pressable>
  );
});


export default CardComponent;
