import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View ,Modal} from 'react-native'

import React, { useState } from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import images from '../IMAGES/images'
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";


const Header = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
      setModalVisible(!modalVisible);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };
  return (
    <View style={{backgroundColor:"#fff"}}>
       <View style={{ flexDirection: 'row', justifyContent: 'space-between',padding:20,elevation: 0.5,borderBottomLeftRadius:10,borderBottomRightRadius:10 }}>

<View style={{ flexDirection: 'row' }}>
    <Text style={{  fontSize: responsiveFontSize(3), fontWeight: 'bold', color: '#8aca02', fontFamily: 'serif' }}>Milk</Text>
    <Text style={{ fontSize: responsiveFontSize(3), fontWeight: 'bold', fontFamily: 'serif',color:"black" }}>Buddy</Text>

</View>
<View style={{ flexDirection: 'row', }}>
    <TouchableOpacity onPress={openModal}>
        <Image  source={images.Notification} style={{ height: 30, width: 30, marginRight: 0 }} />
    </TouchableOpacity>

    <View style={styles.container}>
      

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        
        onRequestClose={closeModal}
      >
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <FontAwesome5 style={{transform: [{ rotate: '45deg' }],}} name="plus" color="white" size={20} />
          </TouchableOpacity>
          <Text style={styles.modalText}>Notification</Text>
        </View>
      </Modal>
    </View>
</View>
</View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      modal: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        // marginVertical:200,
        height:340,
        width:200,borderRadius:10,
        position:"absolute",
        right:10,
        top:75
        
      },
      modalText: {
        fontSize: 20,
        color: '#fff',
        // marginBottom: 20,
      },
      closeButton: {
        position:"absolute",
        top:10,
        right:10,
        fontSize: 18,
        color: 'blue',
      },
})