import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import FontAwesome from "react-native-vector-icons/dist/FontAwesome";
import React, { useEffect, useState } from "react";
import Images from "../IMAGES/images";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Header from "./Header";
import { useRoute } from "@react-navigation/native";
import Loader from "../Src/Normal/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StarRating from "react-native-star-rating";
import Feather from "react-native-vector-icons/dist/Feather";
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';

const MilkmanDetail = ({ navigation }) => {
  const [selected, setSelected] = useState();
  const [value, setValue] = useState("All Products");
  const [loading, setLoading] = useState();
  const [rating, setRating] = useState(false);
  const [rating1, setRating1] = useState(0);
  const options1 = ["All Products", "Contect Details"];
  const [data, setdata] = useState();
  const [name, setName] = useState("");
  const [productId, setProductId] = useState();
  const [inputFields, setInputFields] = useState([{}]);
  const route = useRoute();
  const { userId } = route.params;
  const { id } = route.params;
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = () => {
    const options = {
      title: 'Select Profile Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setSelectedImage(source);
  }
});
};


  const addInputField = () => {
    setInputFields([...inputFields, {}]);
  };

  const handleInputChange = (text, index, field) => {
    const newInputFields = [...inputFields];
    newInputFields[index][field] = text;
    setInputFields(newInputFields);
  };

  const deleteInputField = (index) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  const handleDialPress = () => {
    const url = `tel:${data.phone}`;
    Linking.openURL(url);
  };

  const handleMessagePress = () => {
    const url = `sms:${data.phone}`;
    Linking.openURL(url);
  };
  const fetchData = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem("user");

    if (user !== null) {
      const userData1 = JSON.parse(user);

      const response = await fetch(
        `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/user/getUserById?userId=${
          userId ? userId : id
        }`
      );

      if (!response) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();

      if (jsonData.data) {
        setLoading(false);
        setdata(jsonData.data);
        const foundFollower = jsonData.data.followers.some((follower) => {
          // console.log("follower.userId:", follower.userId); // Log the userId for each follower
          // console.log("userId1:", userData1._id); // Log the userId1
          return follower.userId === userData1._id;
        });
        setSelected(!foundFollower);
        // console.log("foundFollower:", foundFollower);
      } else {
        setLoading(false);

        console.log(jsonData.message, "API request failed");
      }
    } else {
      return null;
    }
  };

  useEffect(async () => {
    const user = await AsyncStorage.getItem("user");
    const userData1 = JSON.parse(user);

    setName(userData1._id);

    if (userId || id) {
      fetchData();
    }
  }, []);

  const updateData = async () => {
    const user = await AsyncStorage.getItem("user");

    if (user !== null) {
      const userData1 = JSON.parse(user);
      if (userData1._id && id) {
        try {
          const response = await fetch(
            `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/user/toggleFollow?userId=${
              userData1._id
            }&vendorId=${id || userId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                // Add any additional headers as needed
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          fetchData();

          const responseData = await response.json();
          // console.log("Updated data:", responseData);
          return responseData;
        } catch (error) {
          console.error("Error updating data:", error);
          throw error; // Propagate the error to the calling function/component
        }
      }
    } else {
      return null;
    }
  };

  const itemDataToUpdate = {
    customerId:name,
    rating: rating1,
    review: review,
  };
// console.log(itemDataToUpdate);
  const Rating = () => {
    fetch(
      `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/user/createReview?userId=${id}&productId=${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers your API requires
        },
        body: JSON.stringify(itemDataToUpdate),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        fetchData();
        // Handle success
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });

    setRating(!rating);
    console.log("rating", rating);
  };

  const onStarRatingPress = (rating1) => {
    setRating1(rating1);
  };

const Data={
  products:inputFields
}
  const handelSubmit = () => {
  
    fetch(
      `https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/user/CreateProduct?userId=${userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      })
      .then((response) => response.json())
      .then((responseJson) => {
       console.log(responseJson);
         setIsOpen(false);
         fetchData()

      })

   
  };

 


  return (
    <>
      <Header />
      {loading && <Loader />}

      <View style={{}}>
        <View style={{}}>
          <View style={{ marginVertical: 4 }}>
            <View style={{ marginHorizontal: 25 }}> 
              <View
                style={{
                  padding: 8,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                onPress={selectImage}
                >

                <Image
                  source={Images.Avatar}
                  style={{
                    height: 88,
                    width: 88,
                    borderRadius: 50,
                    // borderColor: "black",
                    borderWidth: 4,
                    padding: 5,
                  }}
                />
                </TouchableOpacity>
                <View style={{ textAlign: "center" }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: "black",
                      fontWeight: 400,
                      textAlign: "center",
                    }}
                  >
                    {data ? data.products.length : ""}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: "black",
                      fontWeight: 400,
                      textAlign: "center",
                    }}
                  >
                    Products
                  </Text>
                </View>
                <TouchableOpacity
                // onPress={()=>navigation.navigate("Following")}
                >
                  <View style={{ textAlign: "center" }}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: "black",
                        fontWeight: 400,
                        textAlign: "center",
                      }}
                    >
                      {data ? data.noOfFollowers : ""}
                    </Text>
                    <Text
                      style={{
                        fontSize: 17,
                        color: "black",
                        fontWeight: 400,
                        textAlign: "center",
                      }}
                    >
                      Folowers
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: "2%" }}>
                <Text
                  style={{
                    // fontSize: 17,
                    color: "black",
                    fontWeight: 400,
                    width: "39%",
                    textAlign: "center",
                    right: 5,
                  }}
                >
                  {data ? data.name : ""}
                </Text>
              </View>
            </View>
            {!userId && (
              <View
                style={{
                  padding: 5,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginHorizontal: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    marginVertical: 3,
                    width: "41%",
                    left: "19%",
                  }}
                >
                  <Text
                    onPress={() => (setSelected(!selected), updateData())}
                    style={[
                      {
                        borderRadius: 5,

                        backgroundColor: "#8aca02",

                        color: "white",
                        fontWeight: "400",
                        // fontSize: responsiveFontSize(2),
                        textAlign: "center",
                        paddingVertical: 10,
                      },
                      selected === false && {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        borderRadius: 5,
                      },
                    ]}
                  >
                    {selected ? "Follow" : "Unfollow"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    // backgroundColor: "#8aca02",
                    width: "41%",
                    left: "20%",
                    marginHorizontal: 4,
                    marginVertical: 3,
                  }}
                  onPress={handleMessagePress}
                >
                  <Text
                    style={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      color: "white",
                      fontWeight: "400",
                      // fontSize: responsiveFontSize(2),
                      textAlign: "center",
                      paddingVertical: 10,
                      borderRadius: 5,
                    }}
                  >
                    Message
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    // backgroundColor: "#8aca02",
                    left: "5.5%",
                    marginHorizontal: 7,
                    marginVertical: 3,
                  }}
                  onPress={handleDialPress}
                >
                  <Text
                    style={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      color: "white",
                      fontWeight: "400",
                      fontSize: responsiveFontSize(2),
                      textAlign: "center",
                      paddingVertical: 10,
                      paddingHorizontal: 17,
                      borderRadius: 5,
                    }}
                  >
                    <FontAwesome
                      name="phone"
                      color="white"
                      size={18.5}
                      top={10}
                      style={{
                        zIndex: 999,
                        marginTop: 5,
                        marginHorizontal: 5,
                      }}
                    />
                    {/* Call */}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: "5%",
          marginBottom: 5,
          backgroundColor: "white",
          // paddingVertical:2,
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        {options1.map((data) => (
          <TouchableOpacity onPress={() => setValue(data)}>
            <Text
              style={[
                {
                  color: "rgba(0,0,0,0.6)",
                  // fontSize: 17,
                  fontWeight: 400,
                  textAlign: "center",
                  width: 158,
                  paddingVertical: 5,
                },
                data === value
                  ? {
                      color: "#8aca02",
                      borderBottomWidth: 2, // Adjust the width as needed
                      borderBottomColor: "#8aca02", // Change the color to your preference
                      borderBottomStyle: "solid",
                      // width: 150,
                    }
                  : {
                      textAlign: "center",
                      borderBottomColor: "#8aca02",
                      borderBottomStyle: "solid",
                      // width: 170,
                      paddingVertical: 5,
                    },
              ]}
            >
              {data}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {value === "All Products" ? (
        <>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              //  alignContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              marginHorizontal: "3%",
              marginVertical: "2%",
            }}
          >
            {userId ? (
              <TouchableOpacity
                onPress={() => setIsOpen(true)}
                style={{
                  borderRadius: 5,
                  backgroundColor: "#8aca02",
                  width: "40%",
                  left: "8%",
                  marginBottom: "4%",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    paddingVertical: 5,
                  }}
                >
                  Add New Product
                </Text>
              </TouchableOpacity>
            ) : (
              ""
            )}

            {isOpen === true && (
              <View
                style={{
                  backgroundColor: "white",
                  position: "absolute",
                  marginHorizontal: "2%",
                  width: "97%",
                  zIndex: 999,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
              >
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
                  <View
                    key={index}
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
                      {index === 1 && (
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
                    textAlign: "center",
                    padding: 2,
                  }}
                  name="plus"
                  color="white"
                  onPress={addInputField}
                  size={22}
                />
                <TouchableOpacity
                  onPress={handelSubmit}
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#8aca02",
                    width: "40%",
                    left: "31%",
                    marginBottom: "4%",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      paddingVertical: 5,
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {data && data.products.length !== 0 ? (
              data.products.map((data) => (
                <TouchableOpacity
                  onPress={() => (setRating(!rating), setProductId(data._id))}
                  style={{
                    width: "96%",
                    marginHorizontal: "2.5%",
                    justifyContent: "space-between",
                    backgroundColor: "#fff",
                    borderRadius: 5,
                    marginBottom: 10,
                    elevation: 0.5,
                    flexDirection: "row",
                    paddingHorizontal: "3%",
                    paddingVertical: "2%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      width: "25%",
                    }}
                  >
                    {data.name}
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      width: "20%",
                    }}
                  >
                    {data.price} ₹/kg
                  </Text>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={data.avgrating}
                    selectedStar={(rating1) => onStarRatingPress(rating1)}
                    fullStarColor={"gold"}
                    starSize={15}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ color: "black", marginLeft: 10 }}>
                No product Found
              </Text>
            )}
            {rating === true && (
              <View
                style={{
                  position: "absolute",
                  left: 5,
                  right: 5,
                  backgroundColor: "rgb(255, 255, 255)",
                  paddingVertical: 30,
                  paddingHorizontal: 40,
                  borderRadius: 15,
                  top: -5,
                }}
              >
                <Text style={{ color: "black", marginVertical: 10 }}>
                  Rate This Product :
                </Text>
                <View style={{ width: "60%" }}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={rating1 || data.ratings}
                    selectedStar={(rating1) => onStarRatingPress(rating1)}
                    fullStarColor={"gold"}
                    starSize={22}
                  />
                </View>
                <TextInput
               
                onChangeText={(pin)=>setReview(pin)}
                  placeholder="Write Review . . ."
                  placeholderTextColor="gray"
                  style={{
                    borderBottomColor: "#A9A9A9",
                    borderWidth: 0.5,
                    top: 12,
                    color: "black",
                  }}
                ></TextInput>
                <TouchableOpacity
                  onPress={Rating}
                  style={{ backgroundColor: "#8aca02", marginVertical: 22 }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      paddingVertical: 5,
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      ) : (
        <ScrollView style={{ marginBottom: "5%" }}>
          <View
            style={{
              paddingHorizontal: 20,
              top: "1%",
            }}
          >
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: "black",
                fontWeight: "400",
                marginBottom: 2,
              }}
            >
              Full Name
            </Text>
            <View
              style={{
                flexDirection: "row",
                height: 40,
              }}
            >
              <TextInput
                placeholder="Enter Full Name"
                value={data ? data.name : ""}
                placeholderTextColor="#8b9cb5"
                style={{
                  flex: 1,
                  color: "#8b9cb5",
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#dadae8",
                }}
              />
            </View>

            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: "black",
                fontWeight: "400",
                marginBottom: 2,
                marginTop: 10,
              }}
            >
              Email Address
            </Text>
            <View
              style={{
                flexDirection: "row",
                height: 40,
                // marginTop: 10,
              }}
            >
              <TextInput
                placeholder="Enter Email"
                value={data ? data.email : ""}
                placeholderTextColor="#8b9cb5"
                style={{
                  flex: 1,
                  color: "#8b9cb5",
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#dadae8",
                }}
              />
            </View>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: "black",
                fontWeight: "400",
                marginBottom: 2,
                marginTop: 10,
              }}
            >
              Phone Number
            </Text>
            <View
              style={{
                flexDirection: "row",
                height: 40,
                // marginTop: 10,
              }}
            >
              <TextInput
                placeholder="Enter Phone No"
                value={data ? data.phone : ""}
                placeholderTextColor="#8b9cb5"
                keyboardType="numeric"
                style={{
                  flex: 1,
                  color: "#8b9cb5",
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#dadae8",
                }}
              />
            </View>

            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: "black",
                fontWeight: "400",
                marginBottom: 2,
                marginTop: 10,
              }}
            >
              Whatsapp Number
            </Text>
            <View
              style={{
                flexDirection: "row",
                height: 40,
                // marginTop: 10,
              }}
            >
              <TextInput
                placeholder="Enter Whatsapp No."
                value={data ? data.whatsappNumber : ""}
                placeholderTextColor="#8b9cb5"
                keyboardType="numeric"
                style={{
                  flex: 1,
                  color: "#8b9cb5",
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#dadae8",
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: "black",
                  fontWeight: "400",
                  marginBottom: 2,
                  marginTop: 10,
                }}
              >
                State
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: "black",
                  fontWeight: "400",
                  marginBottom: 2,
                  marginTop: 10,
                  width: "48%",
                }}
              >
                City
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  height: 40,
                  // marginTop: 10,
                  width: "49%",
                }}
              >
                <TextInput
                  placeholder="Enter State"
                  value={data.address ? data.address.state : ""}
                  placeholderTextColor="#8b9cb5"
                  style={{
                    flex: 1,
                    color: "#8b9cb5",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#dadae8",
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 40,
                  // marginTop: 10,
                  width: "49%",
                }}
              >
                <TextInput
                  placeholder="Enter City"
                  value={data.address ? data.address.city : ""}
                  placeholderTextColor="#8b9cb5"
                  style={{
                    flex: 1,
                    color: "#8b9cb5",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#dadae8",
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: "black",
                  fontWeight: "400",
                  marginBottom: 2,
                  marginTop: 10,
                }}
              >
                Landmark
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: "black",
                  fontWeight: "400",
                  marginBottom: 2,
                  marginTop: 10,
                  width: "48%",
                }}
              >
                Street No
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  height: 40,
                  // marginTop: 10,
                  width: "49%",
                }}
              >
                <TextInput
                  placeholder="Enter Landmark"
                  value={data.address ? data.address.landmark : ""}
                  placeholderTextColor="#8b9cb5"
                  style={{
                    flex: 1,
                    color: "#8b9cb5",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#dadae8",
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 40,
                  // marginTop: 10,
                  width: "49%",
                }}
              >
                <TextInput
                  placeholder="Enter Street No"
                  value={data.address ? data.address.streetNo : ""}
                  placeholderTextColor="#8b9cb5"
                  style={{
                    flex: 1,
                    color: "#8b9cb5",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#dadae8",
                  }}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: "black",
                fontWeight: "400",
                marginBottom: 2,
                marginTop: 10,
              }}
            >
              Pincode No
            </Text>

            <View
              style={{
                flexDirection: "row",
                height: 40,
                marginBottom: 10,
                width: "49%",
              }}
            >
              <TextInput
                placeholder="Enter Pincode No"
                value={data.address ? data.address.pincode : ""}
                placeholderTextColor="#8b9cb5"
                style={{
                  flex: 1,
                  color: "#8b9cb5",
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#dadae8",
                }}
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default MilkmanDetail;

const styles = StyleSheet.create({});
