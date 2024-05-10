import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const FurnitureHome = () => {
  const [furnitureItems, setFurnitureItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const collections = ['chair', 'table', 'sofa', 'bed']; // Adjust these to your actual Firestore collection names
      let items = [];
      for (const collection of collections) {
        const snapshot = await firestore().collection(collection).get();
        const docs = snapshot.docs.map(doc => ({
          ...doc.data(),
          key: doc.id,  // Ensuring each item has a unique key
        }));
        items = items.concat(docs);
      }
      setFurnitureItems(items);
    };

    fetchItems();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {furnitureItems.map((item) => (
          <View key={item.key} style={styles.card}>
            {item.chair_img || item.table_img || item.sofa_img || item.bed_img ? (
              <Image
                source={{ uri: item.chair_img || item.table_img || item.sofa_img || item.bed_img }} 
                style={styles.image}
                onError={(e) => console.error('Loading image failed!', e.nativeEvent.error)}
              />
            ) : (
              <Text style={styles.noImage}>No Image Available</Text>
            )}
            <Text style={styles.title}>{item.chair_name || item.table_name || item.sofa_name || item.bed_name}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light grey background
  },
  scrollView: {
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  noImage: {
    fontSize: 16,
    color: '#6c757d', // Grey text for "No Image Available"
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#343a40', // Dark grey for text
    marginBottom: 10,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#007bff', // Bootstrap primary blue
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default FurnitureHome;
