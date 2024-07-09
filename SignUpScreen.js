import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_APP } from './FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const addUserToFirestore = async (user) => {
        const userData = {
            uid: user.uid,
            email: user.email || null,
            displayName: user.displayName || null,
            phoneNumber: user.phoneNumber || null,
            photoURL: user.photoURL || null,
            disabled: user.disabled || false,
            metadata: {
                creationTime: user.metadata.creationTime || null,
                lastSignInTime: user.metadata.lastSignInTime || null,
            },
            role: 'user', // Default role
        };

        try {
            // Fetch existing user document to check for an existing role
            const doc = await firestore().collection('users').doc(user.uid).get();
            if (doc.exists && doc.data().role) {
                userData.role = doc.data().role;
            }
            await firestore().collection('users').doc(user.uid).set(userData, { merge: true });
            console.log(`Successfully added user ${user.uid} to Firestore`);
        } catch (error) {
            console.error(`Error adding user ${user.uid} to Firestore:`, error);
        }
    };

    const handleSignup = () => {
        createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                addUserToFirestore(user);
                Toast.show({
                    type: 'success',
                    text1: 'Signup successful',
                    text2: 'You have been successfully registered!'
                });
                // Redirect to home screen or somewhere appropriate
                navigation.navigate('Home');
                console.log('User account created & signed in!', user);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    // Implement these methods with Firebase and appropriate libraries
    const handleGoogleSignup = () => { /* ... */ };
    const handleFacebookSignup = () => { /* ... */ };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Enter your details below & free sign up</Text>
            <TextInput
                style={styles.input}
                placeholder="Your Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Create account</Text>
            </TouchableOpacity>
            <View style={styles.termsContainer}>
                <Text style={styles.termsText}>By creating an account you have to agree with our </Text>
                <TouchableOpacity onPress={() => navigation.navigate('TermsAndConditions')}>
                    <Text style={styles.termsLink}>Read our Terms and Conditions</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Already have an account? <Text style={styles.loginText}>Log in</Text></Text>
            </TouchableOpacity>
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
        marginBottom: 10,
        alignSelf: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
        alignSelf: 'center',
        color: '#666',
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
    termsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    termsText: {
        fontSize: 14,
        color: '#666',
    },
    termsLink: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
    loginLink: {
        fontSize: 14,
        color: '#666',
        alignSelf: 'center',
    },
    loginText: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        alignSelf: 'center',
        marginTop: 10,
    },
    // ... any other styles you need
});

export default SignupScreen;
