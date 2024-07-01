import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, Modal, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { CartContext } from './CartContext';  // Import CartContext

const Buy = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { addToCart } = useContext(CartContext);  // Use CartContext

  useEffect(() => {
    const fetchProducts = async () => {
      const collections = ['chair', 'table', 'sofa', 'bedframe']; // Adjust these to your actual Firestore collection names
      let items = [];
      for (const collection of collections) {
        const snapshot = await firestore().collection(collection).get();
        const docs = snapshot.docs.map(doc => ({
          ...doc.data(),
          key: doc.id,  // Ensuring each item has a unique key
        }));
        items = items.concat(docs);
      }
      setProducts(items);
    };

    fetchProducts();
  }, []);

  const renderImage = (item) => {
    const uri = item.chair_img || item.table_img || item.sofa_img || item.bedframe_img;

    return (
      <Image
        source={{ uri }}
        style={styles.image}
        defaultSource={require('./assets/fallback.png')} // Path to your fallback image
        onError={(e) => {
          console.error('Loading image failed!', e.nativeEvent.error);
        }}
      />
    );
  };

  const openModal = (item) => {
    setSelectedProduct(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Buy Furniture</Text>
        {products.map((item) => (
          <View key={item.key} style={styles.card}>
            {renderImage(item)}
            <Text style={styles.title}>{item.chair_name || item.table_name || item.sofa_name || item.bedframe_name}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => openModal(item)}>
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {selectedProduct && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalView}>
            {renderImage(selectedProduct)}
            <Text style={styles.modalTitle}>{selectedProduct.chair_name || selectedProduct.table_name || selectedProduct.sofa_name || selectedProduct.bedframe_name}</Text>
            <Text style={styles.modalDescription}>{selectedProduct.chair_desc || selectedProduct.table_desc || selectedProduct.sofa_desc || selectedProduct.bedframe_desc}</Text>
            <Text style={styles.modalPrice}>${selectedProduct.price}</Text>
            <TouchableOpacity style={styles.button} onPress={() => { addToCart(selectedProduct); closeModal(); }}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Light mode blue background
  },
  scrollView: {
    marginHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40', // Dark grey text
    marginVertical: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    color: '#343a40', // Dark grey text
    marginBottom: 5,
    textAlign: 'center'
  },
  price: {
    fontSize: 14,
    color: '#007bff', // Blue text
    marginBottom: 10,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#007bff', // Blue background
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
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
    marginVertical: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    color: '#343a40', // Dark grey text
    marginBottom: 10,
    textAlign: 'center',
  },
  modalPrice: {
    fontSize: 18,
    color: '#007bff', // Blue text
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Buy;
