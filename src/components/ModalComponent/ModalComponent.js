import React from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import { screenWidth } from '../../utils/Metrics';
import moment from 'moment';
import Loader from '../../utils/Loader';

const ModalComponent = (props) => {
  const {data, homeData, modalVisible, onClose,loading, error} = props;
  const B=(props)=><Text style={{fontWeight: 'bold'}}>{props.children}</Text>
  const _height = data?.height !== "" ? parseInt(data?.height) : data?.height;
  const heightInMeter = _height !== "" ? _height/100 : _height;
  let createdData = data?.created ? moment(data.created).format("DD-MM-yyyy") : "";

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
                <Text style={styles.textStyle}><B>Height</B>: {heightInMeter}m</Text>
                <Text style={styles.textStyle}><B>Mass</B>: {data?.mass}kg</Text>
                <Text style={styles.textStyle}><B>Created Date</B>: {createdData}</Text>
                <Text style={styles.textStyle}><B>Number of films</B>: {data?.films?.length || '0'}</Text>
                <Text style={styles.textStyle}><B>DOB</B>: {data?.birth_year}</Text>
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
};

export default ModalComponent;