import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';

const MyMonthYearPicker = ({setSelectYear,setSelectMonth}) => {
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [isPickerVisible, setPickerVisible] = useState(false);
  

  const togglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectYear(year)
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setSelectMonth(month)
  };
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = 1900; year <= currentYear; year++) {
    years.push(year.toString());
  }
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}></Text>
      <Modal visible={isPickerVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Text style={styles.modalLabel}>{selectedYear  ? selectedYear : "Select Year"}</Text>
            <ScrollView style={{height:120}}>
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  onPress={() => handleYearChange(year)}
                >
                  <Text style={{color:"black",fontSize:18,paddingBottom:10}}>{year}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.modalLabel}>{selectedMonth ? selectedMonth: "Select Month"}</Text>
            <ScrollView style={{height:120}}>
              {months.map((month, index) => (
                <TouchableOpacity
                  key={month}
                  onPress={() => handleMonthChange(month)}
                >
                  <Text style={{color:"black",fontSize:18,paddingBottom:10}}>{month}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity onPress={togglePicker} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    // marginBottom: 10,
    color:"black"
  },
  selectedDate: {
   height:35,
    borderWidth: 1,
    borderRadius: 5,
    color:"black"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 10,
    color:"black",
    borderWidth:1,
    padding:5,
borderColor:"black"
  },
  closeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
  },
});

export default MyMonthYearPicker;
