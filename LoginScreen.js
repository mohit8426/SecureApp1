// LoginScreen.js
import React, { useState,useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image,Button } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { FIREBASE_AUTH } from './FirebaseConfig'; // Make sure this path is correct
import { auth } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "1070770707756-qh3qj15gvcns09qcrj3h2r6vudgeo0o2.apps.googleusercontent.com",
        offlineAccess: true, // If you need offline access
        scopes: ['profile', 'email'] // Add necessary scopesx
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
  
      // Fix the GoogleAuthProvider usage
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
  
      if (userCredential) {
        console.log('Signed in with Google!');
        navigation.navigate('Home'); // Navigate to Home screen on success
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Google Sign-In failed',
        text2: error.message,
      });
    }
    
  }
  

  const handleLogin = () => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        
        Toast.show({
            type: 'success',
            text1: 'Successfully logged in!',
          });
        // Handle successful login
        navigation.navigate('Home');
      })
      .catch((error) => {
        Toast.show({
            type: 'error',
            text1: 'Login failed',
            text2: error.message
          });
        setError(error.message);
      });
  };



  // Placeholder function for Facebook sign-in
  const handleFacebookSignIn = () => {
    // TODO: Implement Facebook sign-in functionality
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
        <Text style={styles.forgotPasswordText}>Forget password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don’t have an account? <Text style={styles.signupLink}>Sign up</Text></Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or login with</Text>
        <View style={styles.dividerLine} />
      </View>

      <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />
      {/* Social Buttons */}
      {/* <View style={styles.container}>
      <Text>{JSON.stringify(error)}</Text>
      {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
      {userInfo ? (
        <Button title="Logout" onPress={logout} />
      ) : (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignIn}
        />
      )}
      <StatusBar style="auto" />
    </View> */}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#f7f7f7',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPasswordText: {
    color: '#007bff',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  signupText: {
    fontSize: 14,
    color: '#666',
    alignSelf: 'center',
  },
  signupLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f7f7f7',
    // You'll need to specify the dimensions that work for your icons
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 10,
  },
  // ... any other styles you need
});

export default LoginScreen;
