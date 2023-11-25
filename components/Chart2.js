import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const Chart2 = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [1020, 1045, 2028, 800, 1099, 1043, 1005, 1012, 2088, 2002, 3009, 2000],
     
      },
    ],
    legend: ['Payment Details'],
  };
  const chartConfig = {
    
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `#8aca02`,
    barPercentage: 1,
    useShadowColorFromDataset: false, 
    paddingHorizontal:10,
    paddingVertical:10
  };
  // const screenWidth = Dimensions.get('window').width;
  
  return (
    <>
    <ScrollView horizontal={true}>
      <View style={{}}>
      <BarChart
  style={chartConfig}
  data={data}
  width={800}
  height={210}
  yAxisLabel="₹"
  chartConfig={chartConfig}
  verticalLabelRotation={35}
/>
      </View>
    </ScrollView>
    </>
  );
};

export default Chart2;

const styles = StyleSheet.create({});
