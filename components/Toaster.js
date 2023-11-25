import React, { useState, useEffect } from 'react';
import { View, Text,Image } from 'react-native';
import image from "../IMAGES/images";
const ToastComponent = ({ message,isVisible }) => {
// console.log(message);


  return (
    <View style={{position:"absolute",top:30,left:50,zIndex:999}} >
      {isVisible===true && (
        <View
          style={{
            backgroundColor:'black',
            padding: 10,
            borderRadius: 8,
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"row"
          }}
        >
            <Image source={image.GIF} />
          <Text style={{ color:  'white' }}>  {message}</Text>
        </View>
       )}
    </View>
  );
};

export default ToastComponent;
