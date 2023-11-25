import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
  } from "react-native";
import React, { useState } from 'react'

const Datepicker2 = ({setSelectedDate,selectedDate}) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);


  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDatePickerVisible(false);
  }; 

return (
    <View>
    <TouchableOpacity onPress={()=>  setDatePickerVisible(true)}>
      <Text style={{ color: "black", fontWeight: "bold" }}>
        Select Date:
      </Text>
      <Text style={styles.datePickerButton}>
        {selectedDate.toLocaleDateString("en-GB")}
      </Text>
    </TouchableOpacity>

    <Modal
      animationType="slide"
      transparent={true}
      visible={isDatePickerVisible}
      onRequestClose={()=>setDatePickerVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.datePickerContainer}>
          {[0, 1, 2, 3, 4].map((offset) => {
            
            const date = new Date();
            date.setDate(selectedDate.getDate() - offset);

            const formattedDate = `${date.getFullYear()}-${(
              date.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}-${date
              .getDate()
              .toString()
              .padStart(2, "0")}`;

            return (
              <TouchableOpacity
                key={offset}
                onPress={() => handleDateChange(date)}
                style={styles.dateOption}
              >
                <Text
                  style={{
                    color: "black",
                  }}
                >
                  {formattedDate}
                </Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            onPress={()=>setDatePickerVisible(false)}
            style={styles.closeButton}
          >
            <Text
              style={{
                color: "black",
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
  )
}

export default Datepicker2

const styles = StyleSheet.create({
    datePickerButton: {
        // flex: 1,
        fontWeight: "bold",
        textAlign: "center",
        // backgroundColor: "#f0f0f0",
        color: "black",
        // padding: 1,
        // borderWidth: 0.5,
      },
      modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      datePickerContainer: {
        backgroundColor: "white",
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10,
        color: "black",
      },
      dateOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        color: "black",
      },
      closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#e0e0e0",
        borderRadius: 5,
        alignItems: "center",
        color: "black",
      },
})