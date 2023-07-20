import React, { useCallback } from 'react';
import {
  Text,
  View,
  Pressable
} from 'react-native';
import imageConstants from '../../constants/ImageConstants';
import FastImage from 'react-native-fast-image';
import Animated, { useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';
import { themeColor } from '../../constants/colors';
import moment from 'moment';
import styles from './styles';

const CardComponent = React.memo(props => {
  const scaleValue = useSharedValue(1);
  let {item,onSelectItem} = props;

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
    
    <View style={styles.rootContainerStyle}>
      <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={()=>onSelectItem(item)}
          testID='card-component'
          >
            {({ pressed }) => (
              <Animated.View
                style={[
                  animatedStyle
                ]}
              >
                <Shadow>
                  <View style={[styles.container,{backgroundColor:item?.cardColor}]}>
                    <View style={styles.imageContainer}>  
                      <View style={styles.imageContainer2}>
                        <Shadow>
                          <FastImage
                            style={styles.imgStyle}
                            source={{
                              uri: item?.image,
                              priority: FastImage.priority.high,
                              cache: FastImage.cacheControl.immutable,
                            }}
                            resizeMode={FastImage.resizeMode.stretch}
                            placeholderSource={imageConstants.defaultImage}
                            defaultSource = {imageConstants.defaultImage}
                          />
                        </Shadow>
                      </View>
                    </View>

                    {/* List Item right side text contant */}
                    <View style={styles.textMainContainer}>
                        <Text style={item?.speciesId ? styles.containerHeadingStyle2 : styles.containerHeadingStyle1}>{item?.name|| "NA"}</Text>
                        <Text style={item?.speciesId ? styles.containerTxt2 : styles.containerTxt1}>
                          {moment(item?.created).format("DD-MM-yyyy") || "NA"}
                        </Text>

                        {/* Wrapper for Weight/Height text contant */}
                        <View style={styles.textSubContainer}>
                          <View style={[styles.textSubLeftContainer,{borderColor: item?.speciesId ? themeColor.white : themeColor.black}]}>
                            <Text style={item?.speciesId ? styles.containerHeadingStyle2 : styles.containerHeadingStyle1}>Weight</Text>
                            <Text style={item?.speciesId ? styles.containerTxt2 : styles.containerTxt1}>{item?.mass}kg</Text>
                          </View>
                          <View style={[styles.textSubRightContainer,{borderColor: item?.speciesId ? themeColor.white : themeColor.black}]}>
                            <Text style={item?.speciesId ? styles.containerHeadingStyle2 : styles.containerHeadingStyle1}>Height</Text>
                            <Text style={item?.speciesId ? styles.containerTxt2 : styles.containerTxt1}>{item?.height}m</Text>
                          </View>
                        </View>
                    </View>
                    
                  </View>
                </Shadow>
              </Animated.View>
            )}
      </Pressable>
    </View>
  );
});


export default CardComponent;
