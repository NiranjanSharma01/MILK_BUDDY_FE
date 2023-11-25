import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import images from "../../IMAGES/images";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Splash = ({ navigation }) => {
  const [id, setId] = useState("");
  const [id1, setId1] = useState(0);

  const getUserData = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem("user");
      // console.log(userDataJson);
      if (userDataJson !== null) {
        const userData = JSON.parse(userDataJson);
        setId1(userData._id);

        if (id1) {
          fetch(
            `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/user/getUserById?userId=${id1}`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.data) {
                if (data.data._id === id1 && userData.role === "vendor") {
                  navigation.navigate("Parent");
                } else if (data.data._id === id1 && userData.role === "user") {
                  navigation.navigate("Parent2");
                } else {
                  navigation.navigate("Login");
                }
              } else {
                navigation.navigate("Login");
              }
            })
            .catch((error) => {
              console.error("API Error:", error);
              alert(error)
              // Handle errors here
            });
        }
        return userData;
      } else {
        navigation.navigate("Login");
        console.log("error");
      }
    } catch (error) {
      navigation.navigate("Login");

      console.error("Error retrieving user data: ", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [id1])
  );

  return (
    <ImageBackground source={images.Grass_Splash} style={{ flex: 1 }}>
      <View style={{}}>
        <View style={{ marginHorizontal: 25 }}>
          <View
            style={{
              marginVertical: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={images.Cow_Splash1}
              style={{
                height: responsiveScreenHeight(30),
                width: responsiveScreenWidth(80),
              }}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({});
