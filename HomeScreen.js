// HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions } from 'react-native';
import { getAuth } from 'firebase/auth';
import { FIREBASE_APP } from './FirebaseConfig';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [userRole, setUserRole] = useState('regular user');
  const auth = getAuth(FIREBASE_APP);

  useEffect(() => {
    const fetchUserRole = async (authUser) => {
      if (authUser && authUser.email) {
        // Extract a part of the email to determine role
        const emailPrefix = authUser.email.split('@')[0];
        // Check if the email prefix contains admin, superadmin, or manager
        if (emailPrefix.toLowerCase().includes('admin')) {
          setUserRole('Admin');
        } else if (emailPrefix.toLowerCase().includes('superadmin')) {
          setUserRole('Super Admin');
        } else if (emailPrefix.toLowerCase().includes('manager')) {
          setUserRole('Manager');
        } else {
          setUserRole('User'); // Default to 'User' for all other emails
        }
      }
    };
  
    // Trigger the role fetch when there is a current user
    if (auth.currentUser) {
      fetchUserRole(auth.currentUser);
    }
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  // Determine the GIF to display based on user role
  const getRoleGif = (role) => {
    switch (role) {
      case 'Admin':
        return require('./assets/admin.gif'); // Replace with your local path to the admin GIF
      case 'Super Admin':
        return require('./assets/superadmin.gif'); // Replace with your path to the superadmin GIF
      case 'Manager':
        return require('./assets/manager.gif'); // Replace with your path to the manager GIF
      default:
        return require('./assets/user.gif'); // Replace with your path to the regular user GIF
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Secure App</Text>
      <Text style={styles.roleText}>Your role: {userRole}</Text>
      <Image
        source={getRoleGif(userRole)}
        style={styles.roleImage}
        resizeMode="contain"
      />
      <Button title="Sign Out" onPress={handleSignOut} color="#D32F2F" />
      
      <Button title="Go to Courses" onPress={() => navigation.navigate('Course')} color="#D32F2F" />

      <Button title="Go to Furnitures" onPress={() => navigation.navigate('Furniture')} color="#D32F2F" />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEFF1',
    padding: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#37474F',
    marginBottom: 20,
  },
  roleText: {
    fontSize: 20,
    color: '#37474F',
    marginBottom: 30,
  },
  roleImage: {
    width: width * 0.8, // 80% of screen width
    height: height * 0.3, // 30% of screen height
    marginBottom: 30,
  },
  // ... other styles if needed
});

export default HomeScreen;
