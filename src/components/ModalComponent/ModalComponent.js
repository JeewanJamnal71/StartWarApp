import React from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import { screenWidth } from '../../utils/Metrics';
import Loader from '../../utils/Loader';

const ModalComponent = React.memo((props) => {
  const {data, homeData, modalVisible, onClose,loading, error} = props;
  const B=(props)=><Text style={{fontWeight: 'bold'}}>{props.children}</Text>

  return (
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        >
            <View style={styles.container}>
              <View style={styles.modalView}>
                <View style={styles.headerContainer}>
                  <Text style={[styles.headingTextStyle,{width:screenWidth*.7}]}>{data?.name}</Text>
                  <TouchableOpacity onPress={()=>onClose()} style={styles.closeButtonStyle}>
                    <Text style={styles.headingTextStyle}>X</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.textStyle}><B>Height</B>: {data.height || '0'}m</Text>
                <Text style={styles.textStyle}><B>Mass</B>: {data?.mass || '0'}kg</Text>
                <Text style={styles.textStyle}><B>Created Date</B>: {data?.createdDate}</Text>
                <Text style={styles.textStyle}><B>Number of films</B>: {data?.filmsLength || '0'}</Text>
                <Text style={styles.textStyle}><B>DOB</B>: {data?.dob}</Text>
                <Text style={[styles.headingTextStyle,{marginTop:10}]}>Homeland Details-</Text>
                {
                  error ? <Text style={styles.textStyle}>ERROR: {error}</Text> :
                  loading ? <Loader /> :
                  <>
                    <Text style={styles.textStyle}><B>Name</B>: {homeData?.name}</Text>
                    <Text style={styles.textStyle}><B>Terrain</B>: {homeData?.terrain}</Text>
                    <Text style={styles.textStyle}><B>Climate</B>: {homeData?.climate}</Text>
                    <Text style={styles.textStyle}><B>Amount of residents</B>: {homeData?.residents?.length || '0'}</Text>
                  </>
                }
              </View>
            </View>
      </Modal>
  );
});

export default ModalComponent;