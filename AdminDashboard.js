// screens/Dashboard.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { firebase } from './FirebaseConfig';

const Dashboard = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Fetch users
    firebase.firestore().collection('users').onSnapshot((snapshot) => {
      const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    });

    // Fetch furniture items
    firebase.firestore().collection('furniture').onSnapshot((snapshot) => {
      const furnitureList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFurniture(furnitureList);
    });

    // Animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const addItem = () => {
    if (newItem) {
      firebase.firestore().collection('furniture').add({
        name: newItem,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setNewItem('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      
      <Text style={styles.sectionTitle}>Users</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.email}</Text>}
      />

      <Text style={styles.sectionTitle}>Furniture Items</Text>
      <FlatList
        data={furniture}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />

      <TextInput
        style={styles.input}
        placeholder="Add new furniture item"
        value={newItem}
        onChangeText={setNewItem}
      />
      <Button title="Add Item" onPress={addItem} />

      <TouchableOpacity style={styles.logoutButton} onPress={() => firebase.auth().signOut().then(() => navigation.navigate('Login'))}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.animatedBox, { opacity: fadeAnim }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  animatedBox: {
    width: 100,
    height: 100,
    backgroundColor: '#00f',
    marginTop: 20,
  },
});

export default Dashboard;
