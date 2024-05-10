// StartScreen.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const StartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/mobile.png')} // Replace with your local path to the image
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Quick and easy learning</Text>
      <Text style={styles.subtitle}>
        Easy and fast learning at any time to help you improve various skills
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonOutline]}
        onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.buttonText, styles.buttonOutlineText]}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007bff',
  },
  buttonOutlineText: {
    color: '#007bff',
  },
});

export default StartScreen;
