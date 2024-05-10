// TermsAndConditionsScreen.js

import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';

const TermsAndConditionsScreen = ({ navigation }) => {
  const handleAccept = () => {
    // Actions to take when the user accepts the terms and conditions
    // For example, update state, store acceptance in AsyncStorage, etc.
    
    // Then navigate back to the Signup screen
    navigation.goBack();
  };

  return (
    
    <View style={styles.container}>
      <ScrollView style={styles.termsContainer}>
        <Text style={styles.title}>Terms and Conditions</Text>
        {/* Your Terms and Conditions text here */}
        <Text style={styles.termsText}>
          {/* This text is just placeholder content. Replace it with your actual terms and conditions. */}
          Please read these terms and conditions carefully before using Our Service...
        </Text>
        {/* A button that when pressed, accepts the terms and conditions */}
        <Button title="Accept" onPress={handleAccept} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  termsText: {
    fontSize: 16,
    marginBottom: 15,
    // More styles for the terms text such as line height, etc.
  },
  // Add styles for the accept button if needed
});

export default TermsAndConditionsScreen;
