import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Header from '../../components/Header';
const faqs = [
    {
      question: 'What is the purpose of this app?',
      answer: 'The app helps users to...',
    },
    {
      question: 'What is the purpose of this app?',
      answer: 'The app helps users to...',
    },
    {
      question: 'What is the purpose of this app?',
      answer: 'The app helps users to...',
    },
    {
      question: 'What is the purpose of this app?',
      answer: 'The app helps users to...',
    },
]
const FAQItem = ({ question, answer }) => {

  const [expanded, setExpanded] = useState(false);
  const rotateValue = new Animated.Value(0);

  const toggleAnswer = () => {
    setExpanded(!expanded);
    Animated.timing(rotateValue, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const rotateIcon = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View>
<Header/>
    <View style={styles.faqItem}>

        {faqs.map((data)=>(

      <TouchableOpacity onPress={toggleAnswer}>
        <Text style={styles.question}>{data.question}</Text>
         <Text style={styles.answer}>
          {data.answer}
        </Text> 
      </TouchableOpacity>
        ))}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  faqItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    color:'black'
  },
  question: {
    fontWeight: 'bold',
    color:'black'
  },
  answer: {
    overflow: 'hidden',
    fontSize: 16,
    color:'black',
    
 
  },
});

export default FAQItem;
