import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import {
    responsiveFontSize,
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth,
  } from "react-native-responsive-dimensions";
  // import CircularProgress from 'react-native-circular-progress-indicator';
  import images from "../../IMAGES/images";
  import Chart from "../../components/Chart";
  import Chart2 from "../../components/Chart2";
  import Chart3 from "../../components/Chart3";
  import Header from "../../components/Header";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";
  import { useFocusEffect } from "@react-navigation/native";
  
  const Home2 = ({ navigation }) => {
    const [userId, setUserId] = useState();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [length, setLength] = useState();
    const [length1, setLength1] = useState();
    const [id1, setId1] = useState(0);
  
    const getUserData = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem("user");
        // console.log(userDataJson);
        if (userDataJson !== null) {
          const userData = JSON.parse(userDataJson);
          setName(userData.name);
          setId1(userData._id);
          if (id1) {
            fetch(
              `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/customer/getAllcustomers?userId=${id1}`
            )
              .then((response) => response.json())
              .then((data) => {
                // console.log("API Response:", data);
                if (data) {
                  setLength1(data.length);
                  setLength(data.lengthTotalDuePaymentZero);
                } else {
                  navigation.navigate("Login");
                }
              })
              .catch((error) => {
                console.error("API Error:", error);
                // Handle errors here
              });
          }
          return userData;
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Error retrieving user data: ", error);
      }
    };
  
    useFocusEffect(
      React.useCallback(() => {
        getUserData();
      }, [id1])
    );
  
    const currentHour = new Date().getHours();
    let greeting;
  
    if (currentHour >= 5 && currentHour < 12) {
      greeting = 'Good morning 🤗';
    } else if (currentHour >= 12 && currentHour < 17) {
      greeting = 'Good afternoon 🕑';
    } else if (currentHour >= 17 && currentHour < 21) {
      greeting = 'Good evening 🌆';
    } else {
      greeting = 'Good night 😴';
    }

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header />
        <StatusBar hidden={true} />
        <View style={{ marginHorizontal: 10, marginVertical: 12 }}>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  height: responsiveScreenHeight(27),
                  width: responsiveScreenWidth(45),
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  marginBottom: 10,
                  elevation: 5,
  
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("UserProfile")}
                  style={{ alignItems: "center" }}
                >
                  <Image source={images.Avatar} style={styles.avatar} />
  
                  <Text
                    style={{
                      color: "black",
                      fontSize: responsiveScreenFontSize(2.07),
                      textAlign: "center",
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    {name}
                  </Text>
  
                  <FontAwesome5 name="edit" color="black" size={15} />
                </TouchableOpacity>
              </View>
              <View>
                <View
                  style={{
                    height: responsiveScreenHeight(13),
                    width: responsiveScreenWidth(47),
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    marginBottom: 10,
                    elevation: 5,
                    paddingVertical: 22,
                    // marginTop:25,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.greeting}>{greeting} {name}</Text>
                </View>
  
                <View
                  style={{
                    height: responsiveScreenHeight(12.7),
                    width: responsiveScreenWidth(47),
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    marginBottom: 10,
                    elevation: 5,
                    paddingVertical: 22,
  
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    // onPress={() => navigation.navigate("AllCustomers")}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: responsiveScreenFontSize(2),
                        textAlign: "center",
                      }}
                    >
                      Total Due Payment
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: responsiveScreenFontSize(2.5),
                        flexDirection: "row",
                        textAlign: "center",
                      }}
                    >
                      ₹50 
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                height: responsiveScreenHeight(13),
                width: "100%",
                justifyContent: "center",
                backgroundColor: "#8aca02",
                borderRadius: 20,
                elevation: 5,
                paddingVertical: 24,
                alignItems: "center",
              }}
            >
             <Text
              style={{
                color: "white",
                fontSize: responsiveScreenFontSize(2.07),
                paddingHorizontal:"12%",
                textAlign: "center",
                borderBottomWidth:1,
                borderColor:"white",
                bottom:4,
                paddingBottom:4,fontWeight:500
              }}
             >Thought of The Day</Text>
             
                <Text
                  style={{
                    color: "white",
                    // fontSize: responsiveScreenFontSize(2.07),
                    paddingHorizontal:"12%",
                    textAlign: "center",
                  }}
                >
                  Embrace challenges with a smile; they're stepping stones to your growth and resilience.
                </Text>
              
            </View>
            <Text style={{ color: "black", 
        fontSize: responsiveScreenFontSize(2.07),

             marginTop: 10 }}>
              Monthly Payment Details:
            </Text>
  
            <View
              style={{
                height: responsiveScreenHeight(28.5),
                width: responsiveScreenWidth(95.5),
                backgroundColor: "#fff",
                borderRadius: 20,
                // marginBottom: 10,
                elevation: 5,
                // paddingVertical:22,
                marginTop: 10,
                flexDirection: "row",
                overflow: "scroll",
              }}
            >
              <Chart2 />
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  export default Home2;
  
  const styles = StyleSheet.create({
    profile: {
      padding: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    profileName: {
      marginTop: 20,
      // fontSize: SPACING * 2,
      fontWeight: "600",
      color: "black",
      textAlign: "center",
    },
  
    avatar: {
      height: 130,
      width: 130,
      borderRadius: 9999,
    },
    profileAction: {
      width: 28,
      height: 28,
      backgroundColor: "wine",
      borderRadius: 9999,
      position: "absolute",
      right: -4,
      bottom: -10,
      alignItems: "center",
      justifyContent: "center",
    },
    greeting: {
        fontSize: responsiveScreenFontSize(2.07),
        // fontWeight:"400",
        color:"black",
        textAlign:"center",paddingHorizontal:"10%"
      },
  });
  