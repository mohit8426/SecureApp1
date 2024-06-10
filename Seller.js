import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Seller = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddItem = async () => {
    if (!name || !type || !description || !productId || !quantity || !imageUrl) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const item = {
      [`${type}_name`]: name,
      type: type.toLowerCase(),
      [`${type}_desc`]: description,
      [`${type}_productId`]: productId,
      quantity: quantity,
      [`${type}_img`]: imageUrl,
    };

    try {
      await firestore().collection(type.toLowerCase()).add(item);
      Alert.alert('Success', 'Item added successfully');
      setName('');
      setType('');
      setDescription('');
      setProductId('');
      setQuantity('');
      setImageUrl('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add item');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sell Your Furniture</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Type (chair, table, sofa, bedframe)"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Product ID"
        value={productId}
        onChangeText={setProductId}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <Button title="Add Item" onPress={handleAddItem} color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff', // Light mode blue background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40', // Dark grey text
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default Seller;
