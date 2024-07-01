import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Modal, TextInput, Button, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { FIREBASE_APP } from './FirebaseConfig';
import { getAuth } from 'firebase/auth';


const Dashboard = ({ navigation }) => {
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const auth = getAuth(FIREBASE_APP);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };
  useEffect(() => {
    const fetchItems = async () => {
      const collections = ['bedframe', 'chair', 'sofa', 'table'];
      let items = [];
      for (const collection of collections) {
        const snapshot = await firestore().collection(collection).get();
        const docs = snapshot.docs.map(doc => ({
          ...doc.data(),
          key: doc.id,
        }));
        items = items.concat(docs);
      }
      setFurnitureItems(items);
    };

    fetchItems();
  }, []);

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
      createdAt: firestore.FieldValue.serverTimestamp()
    };

    try {
      await firestore().collection(type.toLowerCase()).add(item);
      Alert.alert('Success', 'Item added successfully');
      setModalVisible(false);
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

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Button title="Sign Out" onPress={handleSignOut} color="#D32F2F" />
        <Button title="Add Furniture Item" onPress={() => setModalVisible(true)} color="#007bff" />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Furniture Items</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.bedframe_name || item.chair_name || item.sofa_name || item.table_name || "No Name"}</Text>
      {item.bedframe_img || item.chair_img || item.sofa_img || item.table_img ? (
        <Image
          source={{ uri: item.bedframe_img || item.chair_img || item.sofa_img || item.table_img }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={furnitureItems}
        keyExtractor={item => item.key}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add New Furniture Item</Text>
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
          <Button title="Cancel" onPress={() => setModalVisible(false)} color="#ff0000" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Light blue background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40', // Dark grey text
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
  section: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40', // Dark grey text
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
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
    width: '100%',
  },
});

export default Dashboard;
