import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Header from "./Header";
import Loader from "../Src/Normal/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import StarRating from "react-native-star-rating";

const Milkmanslist = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId1, setUserId1] = useState();
  const [rating1, setRating1] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/user/getUserById?userId=${
            userId1
          }`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const jsonData = await response.json();
// console.log(jsonData.data.following);
      if (jsonData.data) {
        setData(jsonData.data.following);
      } else {
        setError(jsonData.message || "API request failed");
      }

      if (jsonData.customer.deleted === true) {
        setValue("Inactive");
      } else {
        setValue("Active");
      }
    } catch (err) {
      // Handle errors
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId1]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const maxLetters = 8; // Adjust the maximum number of letters as needed



  const getUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");

      if (user !== null) {
        const userData1 = JSON.parse(user);

        setUserId1(userData1._id); 

      } else {
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user data: ", error);
      return null;
    }
  };

  useEffect(() => {
    // console.log('Effect is running');
    getUserData();
  }, [userId1]);


 
  useFocusEffect(
    React.useCallback(() => {
    // console.log('Screen focused, fetching data again');

        fetchData();
    }, [userId1])
  );
// console.log(data);
  const onStarRatingPress = (rating1) => {
    setRating1(rating1);
    // console.log(rating1);
  };
  return (
    <>
      <Header />
     
      <Text style={{color:"black",fontSize:17,fontWeight:500,marginHorizontal:"4%",marginVertical:"3%"}}>Following list</Text>
      <ScrollView style={{ zIndex: -1 }}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Text style={{color:"black"}}>
            {error.message} {error}
          </Text>
        ) : data && data.length > 0 ? (
          <View style={{ marginHorizontal: 15, paddingBottom: "17%" }}>
            {data
             
              .map((prodictListdata) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MilkmanDetail", {
                      id: prodictListdata.vendorId,
                    })
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 6,
                    padding: 4,
                    borderRadius: 8,
                    elevation: 2,
                    backgroundColor: "white",
                  }}
                  key={prodictListdata._id}
                >
                   <View
                    style={{
                      backgroundColor: "black",
                      padding: 1,
                      borderRadius: 50,
                      left: "4%",
                    }}
                  >
                    <Image
                      source={prodictListdata.image}
                      style={{
                        borderRadius: 50,
                        height: 70,
                        width: 70,
                      }}
                    />
                  </View> 
                  <View style={{ marginLeft: 20, flexDirection: "row" }}>
                    <View style={{ top: "5%" }}>
                      <Text
                        style={{
                          marginBottom: 9,
                          fontSize: responsiveFontSize(2.2),
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        
                          {truncateText(prodictListdata.name,maxLetters)}
                        
                      </Text>
                      <View style={{}}>
                      <View style={{ flexDirection: "row", marginBottom: 3 }}>
                          <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={prodictListdata.rating}
                            selectedStar={(rating1) =>
                              onStarRatingPress(rating1)
                            }
                            fullStarColor={"gold"}
                            starSize={15}
                          />
                        </View>
                        <Text
                          style={{
                            color: "#A9A9A9",
                            bottom: 2,
                            fontSize: 12,
                          }}
                        >
                          {prodictListdata.rating} Rating
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        left: "40%",
                        borderLeftWidth: 0.5,
                        borderLeftColor: "#A9A9A9",
                        borderLeftStyle: "solid",
                        justifyContent: "center",
                        paddingLeft: "12%",
                        marginVertical: "10%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: "black",
                          fontWeight: "400",
                          borderRadius: 5,
                        }}
                      >
                        Followers
                      </Text>
                      <Text
                        style={{
                          marginBottom: 10,
                          color: "#A9A9A9",
                          fontSize: 12,
                          color: "#8aca02",
                        }}
                      >
                        {prodictListdata ? prodictListdata.noOfFollowers :""}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        )  : null}
      </ScrollView>
    </>
  );
};

export default Milkmanslist;

const styles = StyleSheet.create({
  input01: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    width: "52%",
    paddingHorizontal: 30,
    height: 40,
    marginVertical: 11,
    color: "black",
  },
});

