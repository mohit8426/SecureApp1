import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import StartScreen from './StartScreen';
import TermsAndConditionsScreen from './TermsAndConditionsScreen';
import CourseHome from './CourseHome';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import { CartProvider } from './CartContext';
import FurnitureHome from './FurnitureHome';
import ShoppingCart from './ShoppingCart';
import Checkout from './Checkout';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <SafeAreaProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
              <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
              <Stack.Screen name="Course" component={CourseHome} />
              <Stack.Screen name="FurnitureHome" component={FurnitureHome} options={{ title: 'Furniture Home' }} />
              <Stack.Screen name="ShoppingCart" component={ShoppingCart} options={{ title: 'Shopping Cart' }} />
              <Stack.Screen name="Checkout" component={Checkout} options={{ title: 'Checkout' }} />
              {/* Add more screens as needed */}
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
        <Toast />
      </SafeAreaProvider>
    </>
  );
}

export default App;
