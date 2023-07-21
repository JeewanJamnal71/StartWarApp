import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native';
import styles from './style';
import { normalize, screenHeight, screenWidth } from '../../utils/Metrics';
import Loader from '../../utils/Loader';
import imageConstants from '../../constants/ImageConstants';
import { themeColor } from '../../constants/colors';
import moment from 'moment';

const ModalComponent = React.memo((props) => {
  const {data, homeData, modalVisible, onClose,loading, error} = props;
  const B=(props)=><Text style={{fontWeight: 'bold'}}>{props.children}</Text>
  const [isHomeLandSelected, setIsHomeLandSelected] = useState(false)

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
                <View style={{width:screenWidth*.8,alignSelf:'center',marginVertical:screenHeight*.02, }}>
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
                    <Image source={data?.image ? {uri: data.image} : imageConstants.splashImage} style={styles.imageStyle}></Image>
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
                      <Text style={styles.cardTextStyle}>{isHomeLandSelected ? homeData?.name || 'N/A' : data.mass+' kg'|| '0'+' kg'}</Text>
                    </View>
                    <View style={styles.cardItemStyle}>
                      <Text style={styles.cardHeadingStyle}>{isHomeLandSelected ? 'Climate' : 'Height'}</Text>
                      <Text style={styles.cardTextStyle}>{isHomeLandSelected ? homeData?.climate || 'N/A' : data.height+" m" || '0'+" m"}</Text>
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
                        <Text style={styles.cardHeadingStyle}>Residents</Text>
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