import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import Header from "../../components/Header";
import { useRoute } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";
import Loader from "./Loader";
import ToastComponent from "../../components/Toaster";

const CustomerProfile = ({ navigation }) => {
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [whatsappNumber, setWhatsappNumber] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [selectedValue, setSelectedValue] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rate, setRate] = useState();
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(true);
  const [dataToUpdate, setDataToUpdate] = useState("");
  const [updatedData, setUpdatedData] = useState("");
  const [value, setValue] = useState();
  const [value1, setValue1] = useState();
  const [id, setId] = useState();
  const [toast, setToast] = useState(null);

  const [isVisible, setIsVisible] = useState(true);

  const updateData = (customerId) => {
    fetch(
      `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/customer/updateCustomer/?customerId=${customerId}`,
      {
        method: "PATCH", // Use 'PUT' for updates.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          phone: phoneNumber,
          whatsappNo: whatsappNumber,
          address: address,
          email: email,
          rate: rate,
          month: month,
          year: year,
          status: value1,
        }), // Send the updated data in JSON format.
      }
    )
      .then((response) => response.json())

      .then((data) => {
        if (!data) {
          throw new Error("Network response was not ok");
        }
        // alert(data.message);
        // console.log(data);
        setOpen(true);
        setToast({
          text: data.message,
          styles: "green",
        });
        setTimeout(() => {
          setIsVisible(false);
          navigation.navigate("AllCustomers");
        }, 1200);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        // Handle error cases here.
      });
  };

  const route = useRoute();
  const { customerId } = route.params;

  const Deletecustomer = async (customerId) => {
    fetch(
      `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/customer/delete/?customerId=${customerId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response) {
          throw new Error("Network response was not ok");
        }
if(response.status===201){
  setToast({
    text:"Customer Deleted Successfully",
    styles:"green"
  });
  setTimeout(() => {
    setIsVisible(false);
    navigation.navigate("AllCustomers")
  }, 1200); 
}
       
      })

      .catch((error) => {
        console.error("DELETE Request Failed:", error);
      });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/customer/getCustomerById?customerId=${customerId}`
      );

      if (!response) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      // const data1=jsonData.customers

      if (jsonData) {
        setData(jsonData.customer.monthlyData);
        setName(jsonData.customer.name);
        setPhoneNumber(jsonData.customer.phone);
        setWhatsappNumber(jsonData.customer.whatsappNo);
        setAddress(jsonData.customer.address);
        setEmail(jsonData.customer.email);
        setId(jsonData.customer._id);
      } else {
        setError(jsonData.message || "API request failed");
      }
      if (jsonData.customer.deleted === true) {
        setValue("Inactive");
      } else {
        setValue("Active");
      }
    } catch (err) {
      alert("smoething went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const currentMonthData = data.find((data) => data.month === month);

    if (currentMonthData) {
      const currentMonthRate = currentMonthData.rate;
      console.log(`The rate for ${month} is: ${currentMonthRate}`);
      setRate(currentMonthRate);
    } else {
      console.log(`Data for ${month} not found.`);
    }
  }, [id]);

  const options = ["Monthly Details", "Yearly Details"];
  const options1 = ["Active", "Inactive"];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedValue(option);
    toggleModal();
  };
  // console.log(selectedValue);
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const handleInputChange = (field, text) => {
    setOpen(false);
    switch (field) {
      case "name":
        setName(text);
        break;
      case "phoneNumber":
        setPhoneNumber(text);
        break;
      case "whatsappNumber":
        setWhatsappNumber(text);
        break;
      case "address":
        setAddress(text);
        break;
      case "email":
        setEmail(text);
        break;
      case "rate":
        setRate(text);
        break;
      default:
        break;
    }
    setUpdatedData({
      name: name,
      phone: phoneNumber,
      whatsappNo: whatsappNumber,
      address: address,
      email: email,
      rate: rate,
      month: month,
      year: year,
    });
    console.log(name);
  };
  const OpenText = () => {
    setOpen1(!open1);
  };
  // console.log("value",value);
  const Status = (data) => {
    setOpen1(true);
    setOpen(false);
    setValue(data);
    if (data === "Active") {
      setValue1(false);
    } else {
      setValue1(true);
    }
    //  console.log(value1);
  };

  return (
    <View>
      <Header />

      {loading ? (
        <Loader />
        ) : (
          <View style={styles.container}>
          {toast && <ToastComponent message={toast.text} styles={toast.styles} isVisible={isVisible} />}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.heading}>Customer Profile :</Text>
            {open === false && (
              <TouchableOpacity onPress={() => updateData(customerId)}>
                <Text
                  style={{
                    backgroundColor: "#8aca02",
                    paddingHorizontal: 20,
                    paddingVertical: 7,
                    borderRadius: 20,
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => Deletecustomer(customerId)}>
              <Text
                style={{
                  backgroundColor: "red",
                  paddingHorizontal: 20,
                  paddingVertical: 7,
                  borderRadius: 20,
                  color: "white",
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
            {/* <FontAwesome5
            onPress={() => Deletecustomer(customerId)}
            style={{ top: 9 }}
            name="trash"
            color="#d11a2a"
            size={15}
          /> */}
          </View>
          <Text style={styles.text}>Customer Name:</Text>

          <TextInput
            style={styles.input}
            // placeholder="Name"
            value={name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <Text style={styles.text}>Phone Number:</Text>

          <TextInput
            style={styles.input}
            // placeholder="Phone Number"
            keyboardType="numeric"
            maxLength={10}
            value={phoneNumber}
            onChangeText={(text) => handleInputChange("phoneNumber", text)}
          />
          <Text style={styles.text}>WhatsApp Number:</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={10}
            // placeholder="WhatsApp Number"
            value={whatsappNumber}
            onChangeText={(text) => handleInputChange("whatsappNumber", text)}
          />
          <Text style={styles.text}>Address:</Text>

          <TextInput
            style={styles.input}
            // placeholder="Address"
            value={address}
            onChangeText={(text) => handleInputChange("address", text)}
          />
          <Text style={styles.text}>Email:</Text>

          <TextInput
            style={styles.input}
            // placeholder="Email"
            value={email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <Text style={styles.text}>Status:</Text>

          <Text
            style={[
              {
                fontSize: 14,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 6,
                borderRadius: 5,
              },
              value === "Inactive" ? { color: "red" } : { color: "green" },
            ]}
            onChangeText={(text) => handleInputChange("status", text)}
            onPress={OpenText}
          >
            {value}
          </Text>
          {open1 === false && (
            <>
              {options1.map((data, index) => (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text
                    style={[
                      {
                        width: "20%",
                        fontSize: 14,
                        marginBottom: 10,
                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 6,
                        borderRadius: 5,
                        textAlign: "center",
                      },
                      data === "Inactive"
                        ? { color: "white", backgroundColor: "red" }
                        : { color: "white", backgroundColor: "green" },
                    ]}
                    key={index}
                    onPress={() => Status(data)}
                  >
                    {data}
                  </Text>
                </View>
              ))}
            </>
          )}
          <Text style={styles.text}>This Month Rate:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange("rate", text)}
          >
            {rate}
          </TextInput>

          <View style={styles.container1}></View>

          <Text style={styles.heading}>Transaction Details :</Text>

          <View style={styles.container1}>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.input1}>
                {selectedValue || "Select an option"}
              </Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={toggleModal}
            >
              <View style={styles.modalContainer}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => handleOptionSelect(option)}
                    style={styles.optionItem}
                  >
                    <Text>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
          </View>
          {selectedValue === "Monthly Details" ? (
            <ScrollView style={{ height: 160 }}>
              {data.map((data) => (
                <Text style={styles.input1}>
                  {data.month} {data.year} : {data.totalAmount}
                </Text>
              ))}
            </ScrollView>
          ) : selectedValue === "Yearly Details" ? (
            <Text style={{ color: "black" }}>Not Available Now</Text>
          ) : (
            ""
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
    color: "black",
  },
  text: {
    fontSize: 13,
    color: "black",
  },
  input: {
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 2,
    borderRadius: 5,
    color: "gray",
    paddingLeft: 4,
  },
  input1: {
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 6,
    borderRadius: 5,
    color: "black",
  },
  label: {
    fontSize: 14,
    color: "black",
  },
  container1: {
    // flex: 1,
    // padding: 20,
    justifyContent: "center",
    color: "black",
    top: 5,
  },
  selectedValue: {
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 11,
    borderRadius: 5,
    color: "black",
    top: -14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "black",
  },
  optionItem: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "80%",
    alignItems: "center",
    color: "black",
  },
});

export default CustomerProfile;
