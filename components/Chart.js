import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import { Circle } from 'react-native-svg';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';

const Chart = ({whole,part}) => {
  const calculatedPercentage = ((part / whole) * 100).toFixed(1) || 0;
    return (
        <>
        <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

        {/* <AnimatedCircularProgress
  size={120}
  width={7}
  fill={calculatedPercentage}
  tintColor="#8aca02"
  backgroundColor="#e6f5cc"
  padding={10}
  rotation={-20}
  /> */}
  {calculatedPercentage >=0 &&(

<AnimatedCircularProgress
  size={110}
  width={7}
  fill={calculatedPercentage}
  tintColor="#8aca02"
  rotation={0}

  // onAnimationComplete={() => console.log('onAnimationComplete')}
  backgroundColor="#e6f5cc" />
  )}
  <Text style={{color:"black",fontSize:responsiveScreenFontSize(3.1),position:"absolute"}}>
    {calculatedPercentage}%
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