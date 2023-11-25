import React, { useState, createRef, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import images from "../../IMAGES/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastComponent from "../../components/Toaster";
import Loader from "./Loader";

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [toast, setToast] = useState(null);
  const passwordInputRef = createRef();

 

  const handleSubmitPress = () => {
    setErrortext("");

    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }

    setLoading(true);

    fetch(
      "https://milkbuddy-be-git-main-niranjansharma01.vercel.app/api/v1/user/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail, // Use the user's input for email
          password: userPassword, // Use the user's input for password
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        
        if (response.success === true) {
          setLoading(false);

          AsyncStorage.setItem("user", JSON.stringify(response.data));
          AsyncStorage.setItem("userData", JSON.stringify(userEmail));
          setToast({
            text: response.message,
            styles: "green",
          });
          // console.log(response.data.role);
          setTimeout(() => {
            setIsVisible(false);
            if (response.data.role === "vendor") {
              navigation.navigate("Parent");
            } else {
              navigation.navigate("Parent2");
            }
          }, 1200);
        } else {
          setErrortext(
            response.message || "Please check your email id or password"
          );
          alert(response.message || "Please check your email id or password");
          setLoading(false);
        }
      })
      .catch((error) => {
        // Hide Loader
        setLoading(false);
        alert("Error: " + error.message);
      });
  };

  // Make sure you have the necessary states and variables defined (userEmail, userPassword, setLoading, setErrortext, etc.) before using this function.

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      {toast && (
        <ToastComponent
          message={toast.text}
          styles={toast.styles}
          isVisible={isVisible}
        />
      )}

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center" }}>
              <Image
                source={images.Cow_Splash1}
                style={{
                  width: 250,
                  height: 250,
                  resizeMode: "contain",
                  margin: 1,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
            >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate("Signup")}
            >
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: '#8aca02',
    alignContent: "center",
  },
  SectionStyle: {
    // color:"#FFFFFF",
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    // color: '#FFFFFF',
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
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
    color: "black",
  },
  registerTextStyle: {
    // color: '#FFFFFF',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
    color: "black",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
