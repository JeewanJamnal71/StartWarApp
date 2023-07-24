import React, { useState } from 'react';
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
  // const [isLongPress, setIsLongPress] = useState(false)
  let {item,onSelectItem} = props;
  let mass = item?.mass && item?.mass !== 'unknown' && item?.mass !== 'n/a' ? item?.mass+' kg' : 'N/A';
  let height = isNaN(item?.height) ? 'N/A' : item?.height+' m' ;

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(scaleValue.value, [1, 1.2], [1, 1.2]);
    return {
      transform: [{ scale }],
    };
  });

  const handleLongPress = () => {
    // setIsLongPress(true)
    scaleValue.value = 1.1;
  };

  const handlePressOut = () => {
    // setIsLongPress(false)
    scaleValue.value = 1;
  };
  
  return (
    <View style={styles.rootContainerStyle}>
      <Pressable
          onLongPress={handleLongPress}
          onPressOut={handlePressOut}
          onPress={()=>{
            handlePressOut();
            onSelectItem(item)
          }}
          // android_ripple={{color: isLongPress ? themeColor.white : item?.cardColor, borderless: true}}
          testID='card-component'
          >
            {({ pressed }) => (
              <Animated.View style={[animatedStyle]}
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
                        <Text style={styles.containerHeadingStyle}>{item?.name|| "NA"}</Text>
                        <Text style={styles.containerTxt}>
                          {moment(item?.createdDate).format("DD-MM-yyyy") || "NA"}
                        </Text>

                        {/* Wrapper for Weight/Height text contant */}
                        <View style={styles.textSubContainer}>
                          <View style={[styles.textSubLeftContainer,{borderColor: themeColor.white}]}>
                            <Text style={styles.containerHeadingStyle}>Weight</Text>
                            <Text style={styles.containerTxt}>{mass}</Text>
                          </View>
                          <View style={[styles.textSubRightContainer,{borderColor: themeColor.white}]}>
                            <Text style={styles.containerHeadingStyle}>Height</Text>
                            <Text style={styles.containerTxt}>{height}</Text>
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
