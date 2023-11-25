import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";
import Loader from "../Normal/Loader";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AllCustomers({ navigation }) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [data1, setData1] = useState();
  const [data2, setData2] = useState("No Data Found");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState();
  const [value1, setValue1] = useState();
  const [userId, setUserId] = useState();
  const OpenText = () => {
    setOpen(!open);
  };
  const Status = (val) => {
    setOpen(false);
    setValue(val);
  };

  const getUserData = async () => {
    // setLoading(true);
    try {
      const userDataJson = await AsyncStorage.getItem("user");
      if (userDataJson !== null) {
        const userData = JSON.parse(userDataJson);
        setUserId(userData._id);
        if (userId) {
          try {
            const response = await fetch(
              `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/customer/getAllcustomers?userId=${userId}`
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const jsonData = await response.json();
            // console.log(jsonData);

            if (jsonData.customers) {
              setError(null);
              const data5 = jsonData.customers;
              // console.log("dfgh", data5);
              setData(data5);
              setList(data5);
              setLoading(false);

              if (data.deleted === false) {
                setData2(data);
                setStatus("Inactive");
              } else {
                setData2(data);
                setStatus("Active");
              }
            } else {
              setLoading(false);

              setData([]);
              setError(jsonData.message);
            }
          } catch (err) {
            setLoading(false);
          } finally {
            setLoading(false);
          }
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error retrieving user data: ", error);
      setLoading(false);
      return null;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [userId])
  );

  useEffect(() => {
    const activeArr = list.filter((data) => !data.deleted);
    const inActiveArr = list.filter((data) => data.deleted);

    value === "Active"
      ? setData(activeArr)
      : value === "Inactive"
      ? setData(inActiveArr)
      : setData(list);
  }, [value]);

  const updateSearch = async (text) => {
    setSearch(text);

    try {
      const response = await fetch(
        `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/customer/search?name=${text}&userId=${userId}`
      );

      if (!response) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      if (jsonData.data && jsonData.data.length > 0) {
        setData1(jsonData.data);
        setError(null); // Reset the error if data is found
      } else {
        // No results found
        setData1([]);
        setError("No results found");
      }
    } catch (err) {
      setError("Something went wrong"); // Handle network errors
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };
  const options1 = ["All", "Active", "Inactive"];

 
  return (
    <>
      <Header />
      <View
        style={{
          width: 250,
          paddingHorizontal: 10,
          backgroundColor: "white",
          width: "100%",
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Search Customer..."
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
          left={15}
          name="sliders-h"
          color="black"
          size={15}
          onPress={OpenText}
        />
        {/* <View style={{}}> */}
        <View style={{ flexDirection: "column", position: "relative" }}>
          <Text
            onPress={OpenText}
            style={[
              {
                color: "black",
                borderRadius: 8,
                width: 75,
                height: 30,
                textAlign: "center",
                top: 15,
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.07)",
                padding: 5,
              },
              value === "Inactive"
                ? { color: "red" }
                : value === "All"
                ? { color: "black" }
                : { color: "green" },
            ]}
          >
            {value ? value : "All"}
          </Text>

          {open === false && (
            <View
              style={{
                position: "absolute",
                backgroundColor: "white",
                top: 0,
                zIndex: 999,
              }}
            >
              {options1.map((data, index) => (
                <View style={{ flexDirection: "column", top: 20 }}>
                  <Text
                    style={[
                      {
                        width: 75,
                        fontSize: 14,

                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 6,
                        borderRadius: 5,
                        textAlign: "center",
                      },
                      data === "Inactive"
                        ? {
                            color: "white",
                            backgroundColor: "red",
                            marginBottom: 20,
                          }
                        : data === "All"
                        ? { color: "black" }
                        : { color: "white", backgroundColor: "green" },
                    ]}
                    key={index}
                    onPress={() => (Status(data), OpenText())}
                  >
                    {data}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          // backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 12,
          paddingRight: 12,
          // paddingTop: 8,
          paddingBottom: 5,
          zIndex: -1,
          borderBottomWidth: 1,
        }}
      >
        <Text style={styles.title1}> Customer </Text>
        <Text style={styles.title1}> Pending Payment </Text>
        <Text style={styles.title1}>Status</Text>
      </View>

      {loading ? (
        <Loader />
      ) : error ? (
        <Text style={styles.title1}>
          {error.message} {error}
        </Text>
      ) : data1 ? (
        <ScrollView style={styles.container}>
          {data1.map((item) => (
            <>
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("CustomerProfile", {
                    customerId: item._id,
                  })
                }
                style={styles.item}
              >
                <Text style={styles.title5}>{item.name}</Text>

                <Text style={styles.title}>
                  ₹
                  {item.totalDuePaymentuntilNow
                    ? item.totalDuePaymentuntilNow
                    : "Na"}
                </Text>

                {item.deleted === true ? (
                  <Text style={styles.title3}> Inactive </Text>
                ) : (
                  <Text style={styles.title2}>Active</Text>
                )}
              </TouchableOpacity>
            </>
          ))}
        </ScrollView>
      ) : data ? (
        <ScrollView style={styles.container}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate("CustomerProfile", { customerId: item._id })
              }
              style={styles.item}
            >
              <Text style={styles.title5}>{item.name}</Text>

              <Text style={styles.title}>
                ₹
                {item.totalDuePaymentuntilNow
                  ? item.totalDuePaymentuntilNow
                  : 0}
              </Text>

              {item.deleted === true ? (
                <Text style={styles.title3}> Inactive </Text>
              ) : (
                <Text style={styles.title2}>Active</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}
    </>
  );
}

export default AllCustomers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    marginBottom: 60,
    color: "black",
    width: "100%",
    backgroundColor: "#fff",
    zIndex: -1,
  },
  item: {
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 6,
    marginTop: 2,
    // marginHorizontal: 10,
    paddingHorizontal: 16,
    color: "black",
    borderBottomWidth: 1,
    borderColor: "#8080803d",
    width: "100%",
  },
  title: {
    fontSize: 14,
    color: "black",
    textAlign: "left",
    width: "37%",
  },
  title5: {
    fontSize: 14,
    color: "black",
    textAlign: "left",
    width: "43%",
  },
  title2: {
    fontSize: 14,
    color: "#8aca02",
    textAlign: "left",
    // width: 39,
  },
  title3: {
    fontSize: 14,
    color: "red",
    textAlign: "left",
    // width: 52,
    // zIndex: 0,
    marginRight: -6,
  },
  title1: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
  },
  input01: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    width: "60%",
    paddingHorizontal: 30,
    height: 40,
    marginVertical: 11,
    color: "black",
  },
});
