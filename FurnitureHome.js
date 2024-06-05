import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { CartContext } from './CartContext';  // Import CartContext

const FurnitureHome = ({ navigation }) => {
  const [furnitureItems, setFurnitureItems] = useState([]);
  const { addToCart } = useContext(CartContext);  // Use CartContext

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
        <View style={styles.header}>
          <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('Search')}>
            <Text style={styles.searchText}>SEARCH ON GOODZ ...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('ShoppingCart')}>
            <Image source={require('./assets/cart.png')} style={styles.cartImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>GOOD DEALS</Text>
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>FURNITURE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>LIGHTING</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>DECOR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.banner}>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerText}>Give a second life to your furniture</Text>
            <Text style={styles.bannerSubText}>SELL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerText}>Find the best offers of the market</Text>
            <Text style={styles.bannerSubText}>BUY</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>POPULAR PRODUCTS</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {furnitureItems.slice(0, 5).map((item) => (
              <View key={item.key} style={styles.card}>
                <Image
                  source={{ uri: item.chair_img || item.table_img || item.sofa_img || item.bed_img }}
                  style={styles.image}
                />
                <Text style={styles.title}>{item.chair_name || item.table_name || item.sofa_name || item.bed_name}</Text>
                <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.deals}>
          <TouchableOpacity style={styles.dealButton}>
            <Text style={styles.dealText}>Express Delivery 1 working day</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GOOD DEALS</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {furnitureItems.slice(5, 10).map((item) => (
              <View key={item.key} style={styles.card}>
                <Image
                  source={{ uri: item.chair_img || item.table_img || item.sofa_img || item.bed_img }}
                  style={styles.image}
                />
                <Text style={styles.title}>{item.chair_name || item.table_name || item.sofa_name || item.bed_name}</Text>
                <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.navButton}>
            <Image source={require('./assets/home.png')} style={styles.navIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Image source={require('./assets/heart.png')} style={styles.navIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Image source={require('./assets/sell.png')} style={styles.navIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Image source={require('./assets/user.png')} style={styles.navIcon} />
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#e9ecef', // Light grey
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchText: {
    color: '#6c757d', // Grey text
    fontSize: 16,
  },
  cartIcon: {
    marginLeft: 10,
  },
  cartImage: {
    width: 30,
    height: 30,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  categoryButton: {
    backgroundColor: '#ffffff', // White background
    padding: 10,
    borderRadius: 10,
  },
  categoryText: {
    color: '#343a40', // Dark grey text
    fontSize: 14,
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bannerButton: {
    flex: 1,
    backgroundColor: '#ffc107', // Yellow background
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: '#343a40', // Dark grey text
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bannerSubText: {
    color: '#343a40', // Dark grey text
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    marginVertical: 10,
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
    marginRight: 10,
    alignItems: 'center',
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
    color: '#007bff', // Bootstrap primary blue
    fontWeight: 'bold',
    textAlign: 'center'
  },
  deals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  dealButton: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light grey background
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  dealText: {
    color: '#343a40', // Dark grey text
    fontSize: 14,
    textAlign: 'center'
  },
  sustainability: {
    backgroundColor: '#e9ecef', // Light grey background
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  sustainabilityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40', // Dark grey text
    marginBottom: 5,
    textAlign: 'center'
  },
  sustainabilityText: {
    fontSize: 14,
    color: '#6c757d', // Grey text
    marginBottom: 5,
    textAlign: 'center'
  },
  sustainabilityMetric: {
    fontSize: 16,
    color: '#007bff', // Bootstrap primary blue
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  learnMoreButton: {
    backgroundColor: '#007bff', // Bootstrap primary blue
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  learnMoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  seller: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  sellerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40', // Dark grey text
    marginRight: 5,
  },
  sellerRating: {
    fontSize: 14,
    color: '#6c757d', // Grey text
  },
  followButton: {
    backgroundColor: '#28a745', // Bootstrap success green
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  followText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef', // Light grey border
  },
  navButton: {
    alignItems: 'center',
  },
  navIcon: {
    width: 30,
    height: 30,
  }
});

export default FurnitureHome;
