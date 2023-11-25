import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const InterestCalculator = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [interestType, setInterestType] = useState('normal');
  const [interestRate, setInterestRate] = useState('');
  const [compoundPeriod, setCompoundPeriod] = useState('');

  const calculateInterest = () => {
    // Perform interest calculation based on the form values
    // You can implement the calculation logic here
    console.log('Calculate interest logic goes here');
  };

  return (
    <View>
      <Text >Amount:</Text>
      <TextInput
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
      />

      <Text>Date:</Text>
      <TextInput
        value={date}
        onChangeText={(text) => setDate(text)}
        keyboardType="numeric" // You might want to use a date picker instead
      />

      <Text>Interest Type:</Text>
      {/* <Picker
        selectedValue={interestType}
        onValueChange={(itemValue) => setInterestType(itemValue)}
      > */}
        {/* <Picker.Item label="Normal" value="normal" />
        <Picker.Item label="Compound" value="compound" /> */}
      {/* </Picker>/ */}

      {interestType === 'normal' && (
        <>
          <Text>Interest Rate:</Text>
          <TextInput
            value={interestRate}
            onChangeText={(text) => setInterestRate(text)}
            keyboardType="numeric"
          />
        </>
      )}

      {interestType === 'compound' && (
        <>
          <Text>Compound Period:</Text>
          <TextInput
            value={compoundPeriod}
            onChangeText={(text) => setCompoundPeriod(text)}
            keyboardType="numeric"
          />
        </>
      )}

      <Button title="Calculate Interest" onPress={calculateInterest} />
    </View>
  );
};

export default InterestCalculator;
