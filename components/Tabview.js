import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/dist/Feather";
// import Colors from '../../Theme/Colors';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import Header from "./Header";
import { Button } from "react-native-elements";

function Tabview() {
  const [isOpen, setIsOpen] = useState();
  const [currentValue, setCurrentValue] = useState([]);
  const [inputFields, setInputFields] = useState([]);

  const addInputField = () => {
    setInputFields([...inputFields, ""]);
  };

  const handleInputChange = (text, index) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = text;
    setInputFields(newInputFields);
  };
  // const items = [
  //   { label: "Milk", value: "Milk" },
  //   { label: "Panner", value: "Panner" },
  //   { label: "Ghee", value: "Ghee" },
  //   { label: "chach", value: "chach" },
  //   { label: "Mava", value: "Mava" },
  // ];
  const deleteInputField = (index) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };
  return (
    <>
      <Header />
      <ScrollView style={{ marginHorizontal: "5%", marginVertical: "5%" }}>
        <View
          style={{
            padding: 20,
            height: "100%",
            display: "flex",
            // marginHorizontal:"5%",
            // marginVertical:"7%",
            backgroundColor: "#fff",
            borderRadius: 20,
          
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              fontWeight: "500",
              color: "black",
              bottom: 10,
              marginVertical: 10,
              // right: 5,
              width:"100%",
                 textAlign:"center"
            }}
          >
            {" "}
            Join Us
          </Text>

          {/* <Text style={{ fontSize: responsiveFontSize(2), color: "black", fontWeight: '400', marginBottom: 2 }}>Full Name</Text> */}
          <View
            style={{
              flexDirection: "row",
              height: 40,
            }}
          >
            <TextInput
              placeholder="Enter Full Name"
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
            />
          </View>

          {/* <Text style={{ fontSize: responsiveFontSize(2), color: "black", fontWeight: '400', marginBottom: 2,marginTop:10}}>Email Address</Text> */}
          <View
            style={{
              flexDirection: "row",
              height: 40,
              marginTop: 10,
            }}
          >
            <TextInput
              placeholder="Enter Email"
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
            />
          </View>
          {/* <Text style={{ fontSize: responsiveFontSize(2), color: "black", fontWeight: '400', marginBottom: 2,marginTop:10 }}>Phone Number</Text> */}
          <View
            style={{
              flexDirection: "row",
              height: 40,
              marginTop: 10,
            }}
          >
            <TextInput
              placeholder="Enter Phone No"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
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

          {/* <Text style={{ fontSize: responsiveFontSize(2), color: "black", fontWeight: '400', marginBottom: 2,marginTop:10 }}>Whatsapp Number</Text> */}
          <View
            style={{
              flexDirection: "row",
              height: 40,
              marginTop: 10,
            }}
          >
            <TextInput
              placeholder="Enter Whatsapp No."
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
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
            style={{ flexDirection: "row", justifyContent: "space-between" }}
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
            style={{ flexDirection: "row", justifyContent: "space-between" }}
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
          {/* <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ marginVertical: 10 }}>
              <DropDownPicker
                items={items}
                open={isOpen}
                value={currentValue}
                setOpen={() => setIsOpen(!isOpen)}
                setValue={(val) => setCurrentValue(val)}
                autoScroll
                placeholder="Select Your Products"
                placeholderStyle={{ color: "#8b9cb5", fontSize: 16 }}
                showTickIcon={false}
                showArrowIcon={true}
                disableBorderRadius={true}
                onPress={() => setIsOpen(!isOpen)}
                multiple={true}
                
                mode="BADGE"
                badgeColors={["gray"]}
                badgeDotColors={["white"]}
                badgeTextStyle={{ color: "white" }}
                style={{ borderColor: "#dadae8" }}
              />
            </View>
            <View style={{ marginHorizontal: 17 }}>
              {currentValue.map((data, index) => (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#dadae8",
                    borderRadius: 5,
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: "52%",
                    marginBottom: 15,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50%",
                      borderRightWidth: 1,
                      borderColor: "#dadae8",
                      padding: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {data}
                    </Text>
                  </View>
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
                      placeholder="Price...."
                      placeholderTextColor="#8b9cb5"
                      keyboardType="numeric"
                      style={{ color: "black", width: "50%" }}
                    />
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginHorizontal: "3%",
                    }}
                  >
                    <Feather name="trash" color="black" size={18} />
                  </View>
                </View>
              ))}
            </View>
          </View> */}
          <Text
            style={{
              color: "black",
              top: 15,
              fontSize: responsiveFontSize(2.2),
              fontWeight: "400",
            }}
          >
            Add Product
          </Text>
          <View
            onChangeText={(text) => handleInputChange(text, index)}
            style={{
              borderWidth: 1,
              borderColor: "#dadae8",
              borderRadius: 30,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 40,
              marginBottom: 15,
              position: "relative",
              top: 25,
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
                placeholderTextColor="#8b9cb5"
                keyboardType="numeric"
                style={{ color: "black", width: "90%", paddingEnd: 30 }}
              />
            </View>
          </View>
          <View style={{ top: 10 }}>
            {inputFields.map((value, index) => (
              <View
                onChangeText={(text) => handleInputChange(text, index)}
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
                  <Feather
                    name="trash"
                    color="black"
                    onPress={() => deleteInputField(index)}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            ))}
            {/* <Button title="Add Input Field" onPress={addInputField} /> */}
            <Feather
              style={{
                backgroundColor: "#8aca02",
                width: "7.8%",
                borderRadius: 50,
                left: "90%",
                marginVertical: 7,
                // bottom: 12,
              }}
              name="plus"
              color="white"
              onPress={addInputField}
              size={22}
            />
          </View>
          <TouchableOpacity
            // onPress={() => navigation.navigate("Screen2")}
            style={{
              backgroundColor: "#8aca02",
              borderWidth: 0,
              color: "#FFFFFF",
              borderColor: "#8aca02",
              height: 40,
              alignItems: "center",
              borderRadius: 30,
              marginLeft: 35,
              marginRight: 35,
              marginTop: 20,
              marginBottom: 5,
              
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                paddingVertical: 8,
                fontSize: 16,
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

export default Tabview;

// function Screen1({ navigation }) {
//   return (

//   );
// }

// function Screen2() {

//   console.log("currentValue", isOpen);
//   return (

//   );
// }
