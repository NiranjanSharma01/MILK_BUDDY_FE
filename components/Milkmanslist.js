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
import StarRating from "react-native-star-rating";

const Milkmanslist = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState("city");
  const [userId1, setUserId1] = useState();
  const [rating1, setRating1] = useState(0);

  const options1 = ["pincode", "city", "landmark"];

  const OpenText = () => {
    setOpen(!open);
  };

  const Status = (val) => {
    setOpen(false);
    setValue(val);
  };

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

  const updateSearch = async (text) => {
    setSearch(text);

    try {
      const response = await fetch(
        `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/user/searchUser?${value}=${text}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();

      if (jsonData.data && jsonData.data.length > 0) {
        setError(null);
        setData1(jsonData.data);
      } else {
        setData1([]);
        setError("No results found");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/user/getAllUser`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      if (jsonData.data) {
        setData(jsonData.data);
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
    updateSearch(search);
    fetchData();
  }, [value, search]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const maxLetters = 8; // Adjust the maximum number of letters as needed
  const onStarRatingPress = (rating1) => {
    setRating1(rating1);
    console.log(rating1);
  };
  return (
    <>
      <Header />
      {loading && <Loader />}
      <View
        style={{
          paddingHorizontal: 10,
          backgroundColor: "white",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Search....."
          onChangeText={updateSearch}
          placeholderTextColor={"black"}
          value={search}
          style={styles.input01}
        />
        <FontAwesome5
          style={{ position: "absolute", top: 23, left: 20 }}
          name="search"
          color="black"
          size={15}
        />

        <FontAwesome5
          top={22}
          left={4}
          name="sliders-h"
          color="black"
          size={15}
          onPress={OpenText}
        />

        <View style={{ flexDirection: "column", position: "relative" }}>
          <Text
            onPress={OpenText}
            style={{
              color: "black",
              borderRadius: 5,
              textAlign: "center",
              top: 13,
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.05)",
              paddingVertical: 9,
              width: 131,
            }}
          >
            Search By: {value ? value : "City"}
          </Text>

          {open === false && (
            <View
              style={{
                position: "absolute",
                top: 50,
                zIndex: 999,
              }}
            >
              {options1.map((data, index) => (
                <View
                  style={{ flexDirection: "column", backgroundColor: "white" }}
                  key={index}
                >
                  <Text
                    style={{
                      color: "black",
                      borderWidth: 1,
                      borderColor: "#ccc",
                      padding: 7,
                      borderRadius: 5,
                      paddingHorizontal: 4,
                      width: 131,
                      marginVertical: 2,
                    }}
                    onPress={() => (Status(data), OpenText())}
                  >
                    Search by: {data}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
      <ScrollView style={{ zIndex: -1 }}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Text style={{ color: "black" }}>
            {error.message} {error}
          </Text>
        ) : data1 && data1.length > 0 ? (
          <View style={{ marginHorizontal: 15, paddingBottom: "17%" }}>
            {data1
              .filter((e) => e.role === "vendor")
              .map((prodictListdata) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MilkmanDetail", {
                      id: prodictListdata._id,
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
                        {truncateText(prodictListdata.name, maxLetters)}
                      </Text>
                      <View style={{}}>
                        <View style={{ flexDirection: "row", marginBottom: 3 }}>
                          <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={prodictListdata.ratings}
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
                          {prodictListdata.ratings} Rating
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
                        {prodictListdata ? prodictListdata.noOfFollowers : ""}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        ) : data && data.length > 0 ? (
          <View style={{ marginHorizontal: 15, paddingBottom: "17%" }}>
            {data
              .filter((e) => e.role === "vendor")
              .map((prodictListdata) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MilkmanDetail", {
                      id: prodictListdata._id,
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
                        {truncateText(prodictListdata.name, maxLetters)}
                      </Text>
                      <View style={{}}>
                        <View style={{ flexDirection: "row", marginBottom: 3 }}>
                          <FontAwesome5
                            name="star"
                            color="#8aca02"
                            fontSize={20}
                            style={{ margin: 1 }}
                          />
                          <FontAwesome5
                            name="star"
                            color="#8aca02"
                            fontSize={20}
                            style={{ margin: 1 }}
                          />
                          <FontAwesome5
                            name="star"
                            color="#8aca02"
                            fontSize={20}
                            style={{ margin: 1 }}
                          />
                          <FontAwesome5
                            name="star"
                            color="#8aca02"
                            fontSize={20}
                            style={{ margin: 1 }}
                          />
                          <FontAwesome5
                            name="star"
                            color="#8aca02"
                            fontSize={20}
                            style={{ margin: 1 }}
                          />
                        </View>
                        <Text
                          style={{
                            color: "#A9A9A9",
                            bottom: 2,
                            fontSize: 12,
                          }}
                        >
                          {prodictListdata.ratings} Rating
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
                        50
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        ) : null}
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

// Your data and constants...
