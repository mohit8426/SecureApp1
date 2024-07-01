import React, { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CartContext } from './CartContext';

const Checkout = ({ navigation }) => {
  const { cartItems } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [pickup, setPickup] = useState(false);

  const handleInputChange = (field, value) => {
    setShippingInfo({
      ...shippingInfo,
      [field]: value,
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const handlePlaceOrder = () => {
    if (!pickup && Object.values(shippingInfo).some(field => field === '')) {
      Alert.alert('Error', 'Please fill out all shipping information.');
    } else {
      Alert.alert('Order Placed', 'Your order has been placed successfully!');
      // Here you would typically send the order to your server
      navigation.navigate('Home'); // Navigate to home or another screen after placing order
    }
  };

  const renderCartItems = () => {
    return cartItems.map(item => (
      <View key={item.key} style={styles.cartItem}>
        <Text style={styles.cartItemText}>{item.name || item.chair_name || item.table_name || item.sofa_name || item.bedframe_name} x {item.quantity || 1}</Text>
        <Text style={styles.cartItemText}>${item.price * (item.quantity || 1)}</Text>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Checkout</Text>
        <View style={styles.summary}>
          <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
        </View>

        <Text style={styles.sectionHeader}>Order Summary</Text>
        {renderCartItems()}

        <Text style={styles.sectionHeader}>Delivery Option</Text>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[styles.optionButton, pickup ? styles.selectedOption : {}]}
            onPress={() => setPickup(true)}
          >
            <Text style={styles.optionText}>Pick Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, !pickup ? styles.selectedOption : {}]}
            onPress={() => setPickup(false)}
          >
            <Text style={styles.optionText}>Shipping</Text>
          </TouchableOpacity>
        </View>

        {!pickup && (
          <>
            <Text style={styles.sectionHeader}>Shipping Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={shippingInfo.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={shippingInfo.address}
              onChangeText={(value) => handleInputChange('address', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={shippingInfo.city}
              onChangeText={(value) => handleInputChange('city', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Postal Code"
              value={shippingInfo.postalCode}
              onChangeText={(value) => handleInputChange('postalCode', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={shippingInfo.country}
              onChangeText={(value) => handleInputChange('country', value)}
            />
          </>
        )}

        <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
          <Text style={styles.orderButtonText}>Place Order</Text>
        </TouchableOpacity>
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
  summary: {
    marginBottom: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  cartItemText: {
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  selectedOption: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  optionText: {
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  orderButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Checkout;
