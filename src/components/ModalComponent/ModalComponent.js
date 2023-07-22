import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity, Image, Pressable } from 'react-native';
import styles from './style';
import FastImage from 'react-native-fast-image';
import imageConstants from '../../constants/ImageConstants';
import moment from 'moment';

const ModalComponent = React.memo((props) => {
  const {data, homeData, modalVisible, onClose,loading, error} = props;
  const B=(props)=><Text style={{fontWeight: 'bold'}}>{props.children}</Text>
  const [isHomeLandSelected, setIsHomeLandSelected] = useState(false)

  let mass = data?.mass && data?.mass !== 'unknown' && data?.mass !== 'n/a' ? data?.mass+' kg' : 'N/A';
  let height = isNaN(data?.height) ? 'N/A' : data?.height+' m' ;

  const selectOption=()=>{
    setIsHomeLandSelected(!isHomeLandSelected)
  }

  return (
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        >
            <View style={styles.container}>
              <View style={[styles.modalView]}>
                <View style={styles.modalViewSubContainer}>
                  <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={()=>onClose()} style={styles.closeButtonStyle}>
                      <Text style={styles.closeButtonTextStyle}>X</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.headerCardContainerWrapper}>
                    <View style={styles.headerCardContainerTextWrapper}>
                      <Text style={styles.headingTextStyle} numberOfLines={2}>{data?.name  || 'N/A'}</Text>
                      <Text style={styles.headerCardContainerTitle} >DOB</Text>
                      <Text style={styles.headerCardContainerText}>{data?.dob || 'N/A'}</Text>
                      <Text style={styles.headerCardContainerTitle} >Created</Text>
                      <Text style={styles.headerCardContainerText}>{moment(data?.createdDate).format("DD-MM-yyyy") || 'N/A'}</Text>              
                    </View>
                    <FastImage
                      testID='profile-image'
                      style={styles.imageStyle}
                      source={{
                        uri: data?.image,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}
                      placeholderSource={imageConstants.defaultImage}
                            defaultSource = {imageConstants.defaultImage}
                    />
                  </View> 


                  <View style={styles.optionWrapper}>
                    <Pressable style={isHomeLandSelected ? styles.unselectedOptionColor : styles.selectedOptionColor} onPress={selectOption}>
                      <Text style={isHomeLandSelected ? styles.unselectedOptionTextColor : styles.selectedOptionTextColor}>About</Text>
                    </Pressable>
                    <Pressable style={isHomeLandSelected ? styles.selectedOptionColor : styles.unselectedOptionColor} onPress={selectOption}>
                      <Text style={isHomeLandSelected ? styles.selectedOptionTextColor : styles.unselectedOptionTextColor}>Homeland</Text>
                    </Pressable>
                  </View>

                  <View style={styles.cardItemsWrapper}>
                    <View style={styles.cardItemStyle}>
                      <Text style={styles.cardHeadingStyle}>{isHomeLandSelected ? 'Name' : 'Weight'}</Text>
                      <Text style={styles.cardTextStyle}>{isHomeLandSelected ? homeData?.name || 'N/A' : mass}</Text>
                    </View>
                    <View style={styles.cardItemStyle}>
                      <Text style={styles.cardHeadingStyle}>{isHomeLandSelected ? 'Climate' : 'Height'}</Text>
                      <Text style={styles.cardTextStyle}>{isHomeLandSelected ? homeData?.climate || 'N/A' : height}</Text>
                    </View>
                    <View style={styles.cardItemStyle}>
                      <Text style={styles.cardHeadingStyle}>{isHomeLandSelected ? 'Residents' : 'Gender'}</Text>
                      <Text style={styles.cardTextStyle}>{isHomeLandSelected ? homeData?.residents?.length || '0' : data?.gender || 'N/A'}</Text>
                    </View>
                  </View>

                  <View style={styles.cardItemsWrapper}>
                    {
                      isHomeLandSelected ?
                      <View style={styles.cardItemStyle2}>
                        <Text style={styles.cardHeadingStyle}>Terrain</Text>
                        <Text style={styles.cardTextStyle} numberOfLines={1}>{homeData?.terrain || 'N/A'}</Text>
                      </View> :
                      <View style={styles.cardItemStyle}>
                        <Text style={styles.cardHeadingStyle}>Films</Text>
                        <Text style={styles.cardTextStyle}>{data?.filmsLength || '0'}</Text>
                      </View>
                    }
                    

                  </View>

                </View>

              </View>
            </View>
      </Modal>
  );
});

export default ModalComponent;