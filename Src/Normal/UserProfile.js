import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,Image
} from "react-native";
import Header from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./Loader";
import axios from "axios";
import { responsiveScreenHeight } from "react-native-responsive-dimensions";
import images from '../../IMAGES/images'

const UserProfile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

  const update = async (test) => {
    const config = {
      method: "PUT",
      url: "https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/user/update",
      // url: 'https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/user/update',
      data: test,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios(config);
    return response;
  };

  const updateData = () => {
    const test = {
      email: email,
      name: name,
      username: username,
      phone: phoneNumber,
      whatsappNumber: whatsappNumber,
    };
    update(test).then((response) => {
      // console.log("response", response);

      if (response) {
        console.log("response",response.message);
      }
    });
    
  };

  const getUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");

      if (user !== null) {
        const userData1 = JSON.parse(user);
        setName(userData1.name);
        setUsername(userData1.username);
        setPhoneNumber(userData1.phone);
        setWhatsappNumber(userData1.whatsappNumber);
        setEmail(userData1.email);
// console.log(userData1.role);
        setLoading(false); // Move setLoading inside the if block
        return userData1;
      } else {
        return null;
      }
    } catch (error) {
      // Handle error
      console.error("Error retrieving user data: ", error);
      setLoading(false); // Move setLoading inside the catch block
      return null;
    }
  };

  useEffect(() => {
    getUserData();
  }, [email]);

  const handleInputChange = (field, text) => {
    setOpen(false);
    switch (field) {
      case "username":
        setUsername(text);
        break;
      case "name":
        setName(text);
        break;
      case "phoneNumber":
        setPhoneNumber(text);
        break;
      case "whatsappNumber":
        setWhatsappNumber(text);
        break;

      case "email":
        setEmail(text);
        break;
      default:
        break;
    }
  };

  return (
    <View>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <Image source={images.Avatar} style={styles.avatar} />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
             marginVertical:5
            }}
          >
            {open === false && (
              <TouchableOpacity onPress={updateData}>
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
          </View>
          <Text style={styles.text}>User Name</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(text) => handleInputChange("username", text)}
          />
          <Text style={styles.text}>Name</Text>
          <TextInput
            style={styles.input}
            // placeholder="Name"
            value={name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <Text style={styles.text}>User Phone No :</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={10}
            value={phoneNumber}
            onChangeText={(text) => handleInputChange("phoneNumber", text)}
          />
          <Text style={styles.text}>User WhatsApp Number</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={10}
            value={whatsappNumber}
            onChangeText={(text) => handleInputChange("whatsappNumber", text)}
          />

          <Text style={styles.text}>User Email</Text>

          <Text style={styles.input1}>{email}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: responsiveScreenHeight(72),
      display:"flex",
    marginHorizontal:"5%",
    marginVertical:"7%",
     backgroundColor: '#fff',
     borderRadius: 20,
     elevation: 5,
     justifyContent: "center",
     alignContent: "center",
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 9999,
    left:"28%"
},
  heading: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 10,
    color: "black",
  },
  input: {
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 7,
    borderRadius: 5,
    color: "gray",
  },
  input1: {
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 13,
    borderRadius: 5,
    color: "gray",
  },
  label: {
    fontSize: 16,
    color: "black",
  },
  container1: {
    // flex: 1,
    // padding: 20,
    justifyContent: "center",
    color: "black",
  },
  selectedValue: {
    fontSize: 17,
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
  text: {
    fontSize: 13,
    color: "black",
  },
});

export default UserProfile;
