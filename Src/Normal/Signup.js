import React, { useState, createRef, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/dist/Feather";
import Loader from "./Loader";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import ToastComponent from "../../components/Toaster";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = (props) => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[state,setState]=useState("")
  const[city,setCity]=useState("")
  const[landmark,setLandmark]=useState("")
  const[pin,setPin]=useState()
  const[street,setStreet]=useState()
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("select one..");
  const [isVisible, setIsVisible] = useState(true);
  const [toast, setToast] = useState(null);
  const options = ["user", "vendor"];

  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    toggleDropdown();
  };
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

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
    if (!phone) {
      alert("Please fill Age");
      return;
    }
    if (!confirmPassword) {
      alert("Please fill Confirm Password");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    } 
    if (selectedOption==="select one..") {
      alert("Please fill role");
      return;
    } 

    setLoading(true);
    var dataToSend = {
      username: userName,
      name: name,
      email: userEmail,
      phone: phone,
      whatsappNumber: whatsappNumber,
      password: userPassword,
      role:selectedOption,
      address:{
        state:state,
        city:city,
        landmark:landmark,
        pincode:pin,
        streetNo:street
      },
      confirmPassword: confirmPassword,
      products:inputFields
    };
//  console.log(dataToSend);
    fetch(
      "https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/user/signup",
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
        // console.log(responseJson.user);
        if (responseJson.success === true) {
          AsyncStorage.setItem("user", JSON.stringify(responseJson.user));
          setToast({
            text: responseJson.message,
            styles: "green",
          });
          // console.log(response.data.role);
          setTimeout(() => {
            setIsVisible(false);
            if (responseJson.user.role === "vendor") {
              props.navigation.navigate("Parent");
            } else {
              props.navigation.navigate("Parent2");
            }
          }, 1200);
          // setIsRegistraionSuccess(true);
        } else {
          alert(responseJson.msg)
          setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
  
  const [inputFields, setInputFields] = useState([{}]);

  const addInputField = () => {
    setInputFields([...inputFields, {}]);
  };

  const handleInputChange = (text, index, field) => {
    const newInputFields = [...inputFields];
    newInputFields[index][field] = text;
    setInputFields(newInputFields);
  };

// console.log(inputFields);

  const deleteInputField = (index) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

 
  return (
    <View style={{ flex: 1 }}>
       {toast && (
        <ToastComponent
          message={toast.text}
          styles={toast.styles}
          isVisible={isVisible}
        />
      )}

      <Loader loading={loading} />
      <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
        <FontAwesome5
          style={{ padding: 20 }}
          color="black"
          size={30}
          name="angle-left"
        />
      </TouchableOpacity>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
       

        <KeyboardAvoidingView style={{marginHorizontal:"7%"}} enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Enter UserName"
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
              style={styles.inputStyle}
              onChangeText={(name) => setName(name)}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              keyboardType="text"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
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
              style={styles.inputStyle}
              onChangeText={(phone) => setPhone(phone)}
              underlineColorAndroid="#f000"
              placeholder="Enter Phone No."
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              maxLength={10}
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
              style={styles.inputStyle}
              onChangeText={(whatsappNumber) =>
                setWhatsappNumber(whatsappNumber)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Whatsapp Phone No."
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              maxLength={10}
              ref={ageInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                addressInputRef.current && addressInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <TouchableOpacity
            onPress={toggleDropdown}
            style={styles.SectionStyle}
          >
            <Text
              style={[
                {
                  flex: 1,
                  color: "black",
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderWidth: 1,
                  borderRadius: 30,
                  borderColor: "#dadae8",
                  padding: 8,
                },selectedOption==="select one.." ?{color:"#8b9cb5"}:{}
              ]}
            >
              {selectedOption}
             
            </Text>
          </TouchableOpacity>

          {isOpen && (
            <View>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOptionSelect(option)}
                  style={styles.SectionStyle}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: "black",
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderWidth: 1,
                      borderRadius: 30,
                      borderColor: "#dadae8",
                      padding: 8,
                    }}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {selectedOption === "vendor" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // marginHorizontal: "10%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    height: 40,
                    marginTop: 10,
                    width: "49%",
                  }}
                >
                  <TextInput
                    placeholder="Enter State"
                    placeholderTextColor="#8b9cb5"
                    style={{
                      flex: 1,
                      color: "black",
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderWidth: 1,
                      borderRadius: 30,
                      borderColor: "#dadae8",
                    }}
                    onChangeText={(state)=>setState(state)}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    height: 40,
                    marginTop: 10,
                    width: "49%",
                  }}
                >
                  <TextInput
                    placeholder="Enter City"
                    placeholderTextColor="#8b9cb5"
                    onChangeText={(city)=>setCity(city)}
                    style={{
                      flex: 1,
                      color: "black",
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderWidth: 1,
                      borderRadius: 30,
                      borderColor: "#dadae8",
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // marginHorizontal: "10%",
                  marginBottom: 7,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    height: 40,
                    marginTop: 10,
                    width: "49%",
                  }}
                >
                  <TextInput
                    placeholder="Enter Landmark"
                    placeholderTextColor="#8b9cb5"
                    onChangeText={(landmark)=>setLandmark(landmark)}
                    style={{
                      flex: 1,
                      color: "black",
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderWidth: 1,
                      borderRadius: 30,
                      borderColor: "#dadae8",
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    height: 40,
                    marginTop: 10,
                    width: "49%",
                  }}
                >
                  <TextInput
                    placeholder="Enter Pincode"
                    placeholderTextColor="#8b9cb5"
                    onChangeText={(pin)=>setPin(pin)}
                    style={{
                      flex: 1,
                      color: "black",
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderWidth: 1,
                      borderRadius: 30,
                      borderColor: "#dadae8",
                    }}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View
                  style={{
                    flexDirection: "row",
                    height: 40,
                    marginTop: 10,
                    width: "49%",
                  }}
                >
                  <TextInput
                    placeholder="Enter StreetNo."
                    placeholderTextColor="#8b9cb5"
                    onChangeText={(Street)=>setStreet(Street)}
                    style={{
                      flex: 1,
                      color: "black",
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderWidth: 1,
                      borderRadius: 30,
                      borderColor: "#dadae8",
                    }}
                  />
                </View>
              <Text
            style={{
              color: "black",
              top: 5,
              fontSize: responsiveFontSize(2.2),
              fontWeight: "400",
            }}
          >
            Add Product
          </Text>
          
              {inputFields.map((value, index) => (
              <View key={index}
                style={{
                  borderWidth: 1,
                  borderColor: "#dadae8",
                  borderRadius: 30,
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: 40,
                  marginTop: 15,
                  position: "relative",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50%",
                    borderRightWidth: 1,
                    borderColor: "#dadae8",
                  }}
                >
                  <TextInput
                    placeholder="Product.."
                    value={value.name}
                    onChangeText={(text) =>
                      handleInputChange(text, index, "name")
                    }
                    placeholderTextColor="#8b9cb5"
                    style={{ color: "black", width: "50%" }}
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50%",
                  }}
                >
                <TextInput
                    placeholder="Price...."
                    value={value.price}
                    onChangeText={(text) =>
                      handleInputChange(text, index, "price")
                    }
                    placeholderTextColor="#8b9cb5"
                    keyboardType="numeric"
                    style={{ color: "black", width: "90%", paddingEnd: 30 }}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 9,
                    right: 8,
                  }}
                >
                  {index===1 &&(

                  <Feather
                    name="trash"
                    color="black"
                    onPress={() => deleteInputField(index)}
                    size={18}
                  />
                  )}
                </TouchableOpacity>
              </View>
            ))}
             <Feather
              style={{
                backgroundColor: "#8aca02",
                width: 25,
                borderRadius: 50,
                left: "90%",
                marginTop: 10,
                // bottom: 12,
                textAlign:"center",padding:2
              }}
              name="plus"
              color="white"
              onPress={addInputField}
              size={22}
            />
            </View>
            
          )}
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current && ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(confirmPassword) =>
                setConfirmPassword(confirmPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter ConfirmPassword"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current && ageInputRef.current.focus()
              }
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
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default Signup;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 8,
    
    margin: 5,
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
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
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
    fontSize: 18,
    padding: 30,
  },
});
