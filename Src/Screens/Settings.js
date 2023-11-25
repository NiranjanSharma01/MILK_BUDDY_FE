import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  responsiveFontSize,
  responsiveScreenHeight,
} from "react-native-responsive-dimensions";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";
import Header from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";


const Settings = ({ navigation }) => {
  const[role,setRole]=useState("")
  const [userId, setUserId] = useState();

  const logout = async () => {
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("pass");
    navigation.navigate("Login");

  };
  const getUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");

      if (user !== null) {
        const userData1 = JSON.parse(user);
        setRole(userData1.role);
       setUserId(userData1._id)
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user data: ", error);
      return null;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [role])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header />
      <View style={{ marginHorizontal: 25, marginVertical: 5 }}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#d3d3d3" }}>
          <View style={{ flexDirection: "row", marginVertical: 10}}>
            
            <View>
             
        <Text style={{color:"black",fontSize:20,fontWeight:600}}>Settings:</Text>
              
            </View>
          </View>
        </View>
        {/* <View> */}

        <View
          style={{
            marginVertical: 20,
          
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 25,
            }}
            onPress={() => {role==="user"? navigation.navigate("UserProfile"): navigation.navigate("MilkmanDetail" ,{userId:userId})}}

          >
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 name="user" color="black" size={20} />
              <Text
                style={{ color: "black", marginLeft: 20, fontWeight: "500" }}
              >
                Personal Data
              </Text>
            </View>
            <TouchableOpacity
            >
              <FontAwesome5 name="chevron-right" color="black" size={20} />
            </TouchableOpacity>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 25,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 name="clipboard-list" color="black" size={20} />
              <Text
                style={{ color: "black", marginLeft: 20, fontWeight: "500" }}
              >
                E- Statement
              </Text>
            </View>
            <TouchableOpacity onPress={() => alert("Currently not availble")}>
              <FontAwesome5 name="chevron-right" color="black" size={20} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 25,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 name="heart" color="black" size={20} />
              <Text
                style={{ color: "black", marginLeft: 20, fontWeight: "500" }}
              >
                Refferl Code
              </Text>
            </View>
            <TouchableOpacity onPress={() => alert("Currently not availble")}>
              <FontAwesome5 name="chevron-right" color="black" size={20} />
            </TouchableOpacity>
          </View>
       
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 25,
            }}
            onPress={() => navigation.navigate("FAQItem")}
          >
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 name="meh-blank" color="black" size={20} />
              <Text
                style={{ color: "black", marginLeft: 20, fontWeight: "500" }}
              >
                FAQs
              </Text>
            </View>
            <TouchableOpacity>
              <FontAwesome5 name="chevron-right" color="black" size={20} />
            </TouchableOpacity>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 25,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 name="users" color="black" size={20} />
              <Text
                style={{ color: "black", marginLeft: 20, fontWeight: "500" }}
              >
                Community
              </Text>
            </View>
            <TouchableOpacity onPress={() => alert("Currently not availble")}>
              <FontAwesome5 name="chevron-right" color="black" size={20} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={logout}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 25,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 name="sign-out-alt" color="black" size={20} />
              <Text style={{ color: "red", marginLeft: 20, fontWeight: "700" }}>
                LogOut
              </Text>
            </View>
            <TouchableOpacity>
              <FontAwesome5 name="chevron-right" color="black" size={20} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              height: responsiveScreenHeight(12),
              borderRadius: 10,
              elevation: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <FontAwesome5 name="headset" color="blue" size={40} />
              <Text
                style={{
                  color: "black",
                  marginLeft: 10,
                  fontSize: responsiveFontSize(2),
                }}
              >
                Feel Free to Ask, We Ready to Help
              </Text>
            </View>
            <View style={{}}></View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
