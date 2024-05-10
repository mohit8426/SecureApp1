import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import LoginScreen from './LoginScreen';
import SignupScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
// import ReCaptchaScreen from './ReCaptchaScreen';
import StartScreen from './StartScreen';
import TermsAndConditionsScreen from './TermsAndConditionsScreen';
import CourseHome from './CourseHome';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import FurnitureHome from './FurnitureHome';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* <Stack.Screen name="ReCaptcha" component={ReCaptchaScreen} /> */}
          <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
          <Stack.Screen name="Course" component={CourseHome} />
          <Stack.Screen name="Furniture" component={FurnitureHome} />
          {/* Add more screens as needed */}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
      </SafeAreaProvider>
    </>
  );
}

export default App;
