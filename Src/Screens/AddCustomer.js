import React, { useState, createRef, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../../components/Header";
import Loader from "../Normal/Loader";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import ToastComponent from "../../components/Toaster";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Addcustomer = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [us, setUserAge] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [phone, setPhone] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [userId, setUserId] = useState();

  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

  const [toast, setToast] = useState(null);

  const [isVisible, setIsVisible] = useState(true);

  const handleSubmitButton = () => {
    setErrortext("");
    if (!userName) {
      alert("Please fill Name");
      return;
    }
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }

    if (!userAddress) {
      alert("Please fill Address");
      return;
    }
    if (!phone) {
      alert("Please fill Address");
      return;
    }

    setLoading(true);
    var dataToSend = {
      userId:userId,
      name: userName,
      email: userEmail,
      phone: phone,
      whatsappNo: whatsappNumber,
      address: userAddress,
    };

    fetch(
      "https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/customer/create",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);

        if (responseJson) {
          setUserName("");
          setPhone("");
          setUserAddress("");
          setUserEmail("");
          setWhatsappNumber("");
          setUserAddress("");
          setIsVisible(true);
          setLoading(false);

          setToast({
            text: responseJson.message,
            styles: "green",
          });
          setTimeout(() => {
            setIsVisible(false);
            navigation.navigate("AllCustomers");
          }, 1200);
        } else {
          setErrortext(responseJson.msg);
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
  const getUserData = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem("user");

      if (userDataJson !== null) {
        const userData = JSON.parse(userDataJson);
        setUserId(userData._id);
       console.log("userid",userId);
        setLoading(false); 
      } else {
        return null;
      }
    } catch (error) {
      // Handle error
      console.error("Error retrieving user data: ", error);
      setLoading(false); 
      return null;
    }
  };

  useEffect(() => {
    getUserData();
  }, [userId]);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Loader loading={loading} />
      {toast && (
        <ToastComponent
          message={toast.text}
          styles={toast.styles}
          isVisible={isVisible}
        />
      )}
      <View
        style={{
          height: responsiveScreenHeight(62),
          // width: responsiveScreenWidth(90),
          marginHorizontal: "5%",
          marginVertical: "7%",
          backgroundColor: "#fff",
          borderRadius: 20,
          elevation: 5,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{}}
          contentContainerStyle={
            {
              //
            }
          }
        >
          <Text
            style={{
              marginVertical: 10,
              // left: 100,
              fontSize: 18,
              color: "black",
              marginTop: "12%",
              fontWeight: "400",
              width: "100%",
              textAlign: "center",
            }}
          >
            Add New Customer
          </Text>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                value={userName}
                style={styles.inputStyle}
                onChangeText={(UserName) => setUserName(UserName)}
                underlineColorAndroid="#f000"
                placeholder="Enter Customer Name"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailInputRef.current && emailInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                value={userEmail}
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                underlineColorAndroid="#f000"
                placeholder="Enter Email"
                placeholderTextColor="#8b9cb5"
                keyboardType="email-address"
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                value={phone}
                style={styles.inputStyle}
                onChangeText={(phone) => setPhone(phone)}
                underlineColorAndroid="#f000"
                placeholder="Enter Phone No."
                placeholderTextColor="#8b9cb5"
                keyboardType="numeric"
                ref={ageInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  addressInputRef.current && addressInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                value={whatsappNumber}
                style={styles.inputStyle}
                onChangeText={(whatsappNumber) =>
                  setWhatsappNumber(whatsappNumber)
                }
                underlineColorAndroid="#f000"
                placeholder="Enter Whatsapp Phone No."
                placeholderTextColor="#8b9cb5"
                keyboardType="numeric"
                ref={ageInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  addressInputRef.current && addressInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                value={userAddress}
                style={styles.inputStyle}
                onChangeText={(UserAddress) => setUserAddress(UserAddress)}
                underlineColorAndroid="#f000"
                placeholder="Enter Address"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                ref={addressInputRef}
                returnKeyType="next"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>

            {errortext != "" ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitButton}
            >
              <Text style={styles.buttonTextStyle}>Add Customer </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};
export default Addcustomer;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 8,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
    marginBottom: 80,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 14,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    padding: 30,
  },
});
