import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
// import {ScrollView} from 'react-native-gesture-handler'
import Swiper from "react-native-swiper";
import Header from "../../components/Header";
import Loader from "../Normal/Loader";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastComponent from "../../components/Toaster";


const Payment = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [testVar, setTestvar] = useState(false);
  const [id, setId] = useState();
  const [payment, setPayment] = useState();
  const [open, setOpen] = useState(true);
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [userId, setUserId] = useState();
  const [status, setStatus] = useState();
  const [toast, setToast] = useState(null);

  const [isVisible, setIsVisible] = useState(true);
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = 2020; year <= currentYear; year++) {
    years.push(year.toString());
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [selectMonth, setSelectMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());

  const getUserData = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem("user");
      if (userDataJson !== null) {
        const userData = JSON.parse(userDataJson);
        setUserId(userData._id);
        // setLoading(true); 
        if(userData._id){
          try {
            const response = await fetch(
              `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/customer/getAllcustomers?userId=${userData._id}`
            );
      
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
      
            const jsonData = await response.json();
      
            
            if (jsonData.customers) {
              setError(null)
              setData(jsonData.customers);
              setLoading(false);
            } else {
              setData([])
              setLoading(false);
              setError(jsonData.message || "API request failed");
    
            }
          } catch (err) {
            setLoading(false);
            alert("smoething went wrong");
          } finally {
            setLoading(false);
          }
        }
      } else {
        return null;
      }
    } catch (error) {
      
      console.error("Error retrieving user data: ", error);
      setLoading(false); 
      return null;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [userId])
  );

  const updateData = () => {
    // console.log("dfghjkcvbnm",payment);
    fetch(
      `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/customer/updateCustomer/?customerId=${id}`,
      {
        method: "PATCH", // Use 'PUT' for updates.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          month: month,
          year: year,
          receiveAmount: payment,
          status:status
        }),
      }
    )
      .then((response) => response.json())

      .then((data) => {
        if (!data) {
          throw new Error("Network response was not ok");
        }
        setToast({
          text: data.message,
          styles: "green",
        });
        setTimeout(() => {
          setIsVisible(false);
        }, 1200);
       
        setOpen(true);
        getUserData();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
 
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const Datafilter = (data) => {
    const result1 = new Date(data).toLocaleDateString("en-GB");
    return result1;
  };
  return (
    <View>
      <Loader loading={loading} />
      <View style={styles.header}>
        <Header />
      </View>
      {toast && (
        <ToastComponent
          message={toast.text}
          styles={toast.styles}
          isVisible={isVisible}
        />
      )} 
      {data.length !== 0 &&(
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          top: 10,
          justifyContent: "center",
        }}
      >
        <FontAwesome5
          style={{ top: 6, marginRight: 10 }}
          name="sliders-h"
          color="black"
          size={20}
        />
        <View style={{ width: "100" }}>
          <TouchableOpacity
            onPress={() => setPickerVisible(!isPickerVisible)}
            style={styles.selectedDate}
          >
            <Text style={{ color: "black", padding: 8 }}>
              {selectedMonth && selectedYear
                ? `${selectedMonth} ${selectedYear}`
                : "Select Year and Month:"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      )}
      <Modal visible={isPickerVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Text style={styles.modalLabel}>
              {selectedYear ? selectedYear : "Select Year"}
            </Text>
            <ScrollView style={{ height: 120 }}>
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  onPress={() => (setSelectedYear(year), setSelectYear(year))}
                >
                  <Text
                    style={{ color: "black", fontSize: 18, paddingBottom: 10 }}
                  >
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.modalLabel}>
              {selectedMonth ? selectedMonth : "Select Month"}
            </Text>
            <ScrollView style={{ height: 120 }}>
              {months.map((month, index) => (
                <TouchableOpacity
                  key={month}
                  onPress={() =>( setSelectedMonth(month),
                    setSelectMonth(month))}
                >
                  <Text
                    style={{ color: "black", fontSize: 18, paddingBottom: 10 }}
                  >
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => setPickerVisible(!isPickerVisible)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {loading ? (
        <Loader />
      ) : data.length===0 ? (
        <Text style={{color:"black"}}>
          {error}
        </Text>
      ) : data ? (
      <ScrollView>
        <View>
          <Swiper
            showsButtons={true}
            dotStyle={{ display: "none" }}
            activeDotStyle={{ display: "none" }}
          >
            {data !==undefined &&
              data.map((value, index) => (
                <View style={styles.container1}>
                  <View style={styles.table}>
                    <View style={styles.row1}>
                      <Text style={styles.cell}> {value.name}</Text>
                    </View>
                    <View style={styles.row1}>
                <Text style={styles.subCell}>
                {selectMonth} {selectYear}
                </Text>

                <View style={styles.column}>
                  {value.monthlyData
                    .filter((e) => e.month === selectMonth)
                    .map((item1) => (
                      <Text style={styles.subCell}>
                        Price/Liter: {item1.rate}
                      </Text>
                    ))}
                </View>
              </View>
                    
                    <View style={styles.tableRow}>
                      <Text style={styles.columnHeader}>Date</Text>
                      <Text style={styles.columnHeader}>Morning</Text>
                      <Text style={styles.columnHeader}>Evening</Text>
                    </View>
                  </View>
                  <ScrollView style={{ height: "40%" }}>
                    <View style={styles.table}>
                      {value.monthlyData
                        .filter(
                          (data) =>
                            data.year == selectYear &&
                            data.month === selectMonth
                        )
                        .map((dds) =>
                          dds.dailyData.map((val) => (
                            <>
                              <View style={styles.tableRow}>
                                <Text style={styles.columnHeader}>
                                  {Datafilter(val.date)}
                                </Text>
                                <Text style={styles.columnHeader}>
                                  {val.morningQty}
                                </Text>
                                <Text style={styles.columnHeader}>
                                  {val.eveningQty}
                                </Text>
                              </View>
                            </>
                          ))
                        )}
                    </View>
                  </ScrollView>
                  {value.monthlyData
                    .filter((data) => data.month === selectMonth)
                    .map((dds) => (
                      <View style={styles.tableRow}>
                        <Text style={styles.columnHeader}>Total</Text>
                        <Text style={styles.columnHeader}>
                          {dds.totalMorningQty}
                        </Text>
                        <Text style={styles.columnHeader}>
                          {dds.totalEveningQty}
                        </Text>
                      </View>
                    ))}
                  {value.monthlyData
                    .filter((data) => data.month === selectMonth)
                    .map((dds) => (
                      <View>
                        <View>
                          <View style={styles.row2}>
                            <Text style={styles.cell}>
                              Total Milk: {dds.totalQuantity}
                            </Text>
                          </View>
                          <View style={styles.row2}>
                            <Text style={styles.cell}>
                              Total Payment: {dds.totalAmount}
                            </Text>
                          </View>
                          <View style={styles.row2}>
                            <Text style={styles.cell}>
                              Due Payment:{" "}
                              {dds.totalAmount -
                                (dds.receiveAmount ? dds.receiveAmount : 0)}
                            </Text>
                          </View>
                          <View style={styles.row2}>
                            <Text style={styles.cell}>
                              Receive Payment Yet: {dds.receiveAmount}
                            </Text>
                          </View>
                          <View style={styles.row2}>
                            <TextInput
                              onChangeText={(val) => (
                                setId(value._id), setOpen(false),
                                setPayment(val),
                                setStatus(value.deleted)
                              )}
                              keyboardType="numeric"
                              placeholderTextColor={"gray"}
                              placeholder="Add Receive Payment"
                              style={styles.cell}
                            />
                          </View>

                          <View style={styles.row2}></View>
                        </View>
                      </View>
                    ))}
                  {open === false ? (
                    <TouchableOpacity
                      onPress={updateData}
                      style={styles.buttonStyle}
                    >
                      <Text style={styles.buttonTextStyle}>Save</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("DailyData")}
                      style={styles.buttonStyle}
                    >
                      <Text style={styles.buttonTextStyle}>
                        Update Daily Data
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
          </Swiper>
        </View>
      </ScrollView>):""}
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  container1: {
    flexDirection: "column",
    marginHorizontal: 40,
    color: "black",
    marginTop: 25,
  },
  row: {
    flexDirection: "row",
    borderColor: "black",
    color: "black",
  },
  input: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "black",
    padding: 1,
    color: "black",
  },

  row1: {
    flexDirection: "row",
  },
  row2: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "black",
    padding: 2,
    textAlign: "center",
    color: "black",
  },
  column: {
    flex: 1,
    flexDirection: "row",
  },
  subCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "black",
    padding: 2,
    textAlign: "center",
    color: "black",
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 70,
    marginRight: 70,
    padding: 3,
    marginTop: 8,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 8,
    fontSize: 14,
  },
  table: {
    borderWidth: 0.5,
    borderColor: "black",
  },
  tableRow: {
    flexDirection: "row",
    // borderBottomWidth: 0.5,
    borderColor: "black",
  },
  columnHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    color: "black",
    borderWidth: 0.3,
  },
  tableCell: {
    flex: 1,
    padding: 1,
    textAlign: "center",
    borderWidth: 0.5,
    borderColor: "black",
    color: "black",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    color: "black",
  },
  selectedDate: {
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: 300,
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: "black",
    borderWidth: 1,
    padding: 5,
    borderColor: "black",
  },
  closeButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
  },
});
