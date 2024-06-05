import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CartContext } from './CartContext';

const ShoppingCart = ({ navigation }) => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>My Shopping Bag</Text>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty</Text>
        ) : (
          cartItems.map((item) => (
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
              <View style={styles.details}>
                <Text style={styles.title}>{item.chair_name || item.table_name || item.sofa_name || item.bed_name}</Text>
                <View style={styles.quantityControl}>
                  <TouchableOpacity onPress={() => updateQuantity(item.key, -1)} style={styles.quantityButton}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(item.key, 1)} style={styles.quantityButton}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.price}>${item.price * item.quantity}</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => removeFromCart(item.key)}>
                <Text style={styles.buttonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.checkoutButtonText}>Proceed to checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  noImage: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 10,
  },
  details: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 5,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343a40',
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  totalContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 50,
  }
});

export default ShoppingCart;
