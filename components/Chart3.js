import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import { responsiveFontSize, responsiveScreenFontSize } from 'react-native-responsive-dimensions';

const Chart = ({color,color1,size,color2}) => {
 
    return (
        <>
        <View style={{display:"flex",alignItems:"center"}}>

        <AnimatedCircularProgress
  size={85}
  width={4}
  fill={80}
  tintColor="white"
  backgroundColor="rgba(0,0,0,0.1)"
  padding={10}
  rotation={-20}
  />
  <Text style={{color:"white",fontSize:responsiveScreenFontSize(3),position:"absolute",top:31}}>
    80%
  </Text>
        </View>
      
  {/* <View >

  <Text style={{color:"black",fontSize:responsiveScreenFontSize(2.3),textAlign:"center"}}>Complete Payment</Text>
  <Text  style={{color:"black",fontSize:responsiveScreenFontSize(3),flexDirection:"row",textAlign:"center"}}>
   <Text style={{color:"#8aca02"}}>80</Text> of <Text style={{color:"gray"}}>100</Text>
  </Text>
  </View> */}
</>
    )
}

export default Chart

const styles = StyleSheet.create({})