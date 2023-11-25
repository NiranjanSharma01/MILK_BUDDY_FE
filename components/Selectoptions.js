Selectoptions;
// Import necessary React Native components
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Define your UI component
const Selectoptions = ({ navigation }) => {
  // Dummy data for services
  const services = [
    "Search Milkmans Near You",
    "Manage daily Milk Details",
    "Manage Borrow/Landing",
    "List"
  ];
  const Onclick = (service) => {
    if (service === "Search Milkmans Near You") {
      navigation.navigate("Milkmanslist");

    } else if (service === "Manage daily Milk Details") {
      navigation.navigate("Parent");
    } else if(service==="List") {
      navigation.navigate("Tabview")
    }else{

    }
    console.log(`Selected service: ${service}`);
  };

  return (
    <View style={styles.container}>
      {/* Heading */}
      {/* <Text style={styles.heading}>Your App Name</Text> */}

      {/* Services */}
      <View style={styles.servicesContainer}>
        {services.map((service, index) => (
          <TouchableOpacity
            key={index}
            style={styles.serviceButton}
            onPress={() => {
              Onclick(service);
            }}
          >
            <Text style={styles.serviceButtonText}>{service}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "black",
  },

  servicesContainer: {
    width: "100%",
    alignItems: "center",
  },

  serviceButton: {
    backgroundColor: "#8aca02",
    padding: 10,
    marginVertical: 7,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  serviceButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

// Export the component
export default Selectoptions;
