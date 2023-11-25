import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import Loader from "../Normal/Loader";
import Header from "../../components/Header";
import ToastComponent from "../../components/Toaster";
import Datepicker2 from "../../components/datepicker2"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
const DailyData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [morning, setMorning] = useState("");
  const [evening, setEvening] = useState("");
  const [customerId, setcustmerId] = useState("");
  const [open, setOpen] = useState(true);
  const [inputValues, setInputValues] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userId, setUserId] = useState();
  const [toast, setToast] = useState(null);

  const [isVisible, setIsVisible] = useState(true);
 
  const getUserData = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem("user");
      if (userDataJson !== null) {
        const userData = JSON.parse(userDataJson);
        setUserId(userData._id);
        if(userId){
          try {
            const response = await fetch(
              `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/customer/getAllcustomers?userId=${userId}`

            );
      
            if (!response.ok) {
              throw new Error("Network response was not ok");
              
            }
      
            const jsonData = await response.json();
      
            if (jsonData) {
              const data1 = jsonData.customers;
              setData(data1);
              setLoading(false);
            } else {
              setLoading(false);
              setError(jsonData.message || "API request failed");
            }
          } catch (err) {
            setLoading(false);
            alert("Something went wrong");
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
    // console.log(customerId);
    // console.log(inputValues);

    fetch(
      `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/customer/dailyData/?customerId=${customerId}`,
      {
        method: "PATCH", // Use 'PUT' for updates.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValues),
      }
    )
      .then((response) => response.json())

      .then((data) => {
        if (!data) {
          throw new Error("Network response was not ok");
        }
   setOpen(true)
        setToast({
          text: data.message,
          styles: "green",
        });
        setTimeout(() => {
          setIsVisible(false);
        }, 1200);
        setOpen(false);
       
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  // const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const month1 = currentDate.toLocaleString("default", { month: "long" });
  const day = currentDate.getDate().toString().padStart(2, "0");
  // const formattedDate = `${year}-${month}-${day}`;

  // const []

  const handleChangeMorning = (id, text) => {
    setOpen(true);
    setcustmerId(id);
    setMorning(text);
  };

  const handleChangeEvening = (id, text) => {
    setOpen(true);

    setcustmerId(id);
    setEvening(text);
  };
  useEffect(() => {
    const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
    setInputValues({
      morningQty: morning,
      eveningQty: evening,
      date: formattedDate,
      customQty: 0,
    });
  }, [morning, evening]);

  return (
    <View>
      <Loader loading={loading} />
      {toast && (
        <ToastComponent
          message={toast.text}
          styles={toast.styles}
          isVisible={isVisible}
        />
      )}

      <View style={styles.header}>
        <Header />
      </View>
      <View></View>
      <ScrollView style={{ height: "87%" }}>
        {data.filter((e)=>e.userId === userId ).map((item, index) => (
          <View key={item._id} style={styles.container1}>
            <View style={styles.table}>
              <View style={styles.row1}>
                <Text style={styles.cell}>{item.name}</Text>
              </View>
              <View style={styles.row1}>
                <Text style={styles.subCell}>
                  {month1} {year}
                </Text>

                <View style={styles.column}>
                  {item.monthlyData
                    .filter((e) => e.month === month1)
                    .map((item1) => (
                      <Text style={styles.subCell}>
                        Price/Liter:{item1.rate}
                      </Text>
                    ))}
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.columnHeader}>Date</Text>
                <Text style={styles.columnHeader}>Morning</Text>
                <Text style={styles.columnHeader}>Evening</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.columnHeader}>
                 <Datepicker2 selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </Text>
                <TextInput
                  // value={inputValues[item._id]?.morning}
                  keyboardType="numeric"
                  onChangeText={(text) => handleChangeMorning(item._id, text)}
                  style={styles.columnHeader}
                />
                <TextInput
                  // value={inputValues[item._id]?.evening}
                  keyboardType="numeric"
                  onChangeText={(text) => handleChangeEvening(item._id, text)}
                  style={styles.columnHeader}
                />
              </View>
            </View>
            {open === true && item._id === customerId && (
              <TouchableOpacity
                onPress={() => updateData(item._id)}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonTextStyle}>save</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DailyData;

const styles = StyleSheet.create({
  header: {
    height: "10%",
  },
  body: {
    height: "90%",
  },
  container: {
    width: "100%",
    height: "100%",
  },
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
    marginTop: 15,
    marginHorizontal: 40,
    color: "black",

    // Use column to separate rows
  },
  row: {
    flexDirection: "row",
    // borderWidth: 1,
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
    // marginBottom: 1,
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
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginLeft: 200,
    // marginRight: 70,
    marginTop: 10,
    // marginBottom: 10,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    // paddingVertical: 8,
    fontSize: 14,
  },
  table: {
    borderWidth: 0.5,
    borderColor: "black",
    // margin: 10,
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
    padding: 1,
    borderWidth: 0.5,
  },
  tableCell: {
    flex: 1,
    padding: 1,
    textAlign: "center",
    borderWidth: 0.5,
    borderColor: "black",
    color: "black",
  },
  
});
