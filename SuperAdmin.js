import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput, Button, Alert, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FIREBASE_APP } from './FirebaseConfig';
import CheckBox from '@react-native-community/checkbox';

const SuperAdminDashboard = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await firestore().collection('users').get();
      const usersList = snapshot.docs.map(doc => ({
        ...doc.data(),
        key: doc.id,
      }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditMode(true);
    setModalVisible(true);
  };

  const handleUpdateUser = async () => {
    try {
      await firestore().collection('users').doc(selectedUser.key).update(selectedUser);
      Alert.alert('Success', 'User updated successfully');
      setModalVisible(false);
      setEditMode(false);
      setSelectedUser(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to update user');
      console.error(error);
    }
  };

  const handleChangeRole = (role) => {
    const roles = selectedUser.roles || [];
    if (roles.includes(role)) {
      setSelectedUser({
        ...selectedUser,
        roles: roles.filter(r => r !== role),
      });
    } else {
      setSelectedUser({
        ...selectedUser,
        roles: [...roles, role],
      });
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedUser({
      ...selectedUser,
      [field]: value,
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Super Admin Dashboard</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={() => getAuth(FIREBASE_APP).signOut().then(() => navigation.navigate('Login'))}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.userInfo}>Email: {item.email}</Text>
      <Text style={styles.userInfo}>Roles: {item.roles?.join(', ') || 'No roles assigned'}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleEditUser(item)}>
        <Text style={styles.buttonText}>Edit User</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.key}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
      />

      {selectedUser && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            setEditMode(false);
            setSelectedUser(null);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{editMode ? 'Edit User' : 'User Details'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={selectedUser.email}
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Display Name"
              value={selectedUser.displayName || ''}
              onChangeText={(value) => handleInputChange('displayName', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={selectedUser.phoneNumber || ''}
              onChangeText={(value) => handleInputChange('phoneNumber', value)}
            />
            <View style={styles.roleContainer}>
              <Text style={styles.roleTitle}>Assign Roles:</Text>
              <View style={styles.roleCheckboxContainer}>
                {['User', 'Admin', 'Super Admin', 'Manager'].map(role => (
                  <View key={role} style={styles.roleCheckbox}>
                    <CheckBox
                      value={selectedUser.roles?.includes(role)}
                      onValueChange={() => handleChangeRole(role)}
                    />
                    <Text style={styles.roleText}>{role}</Text>
                  </View>
                ))}
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleUpdateUser}>
              <Text style={styles.buttonText}>Update User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { setModalVisible(false); setEditMode(false); setSelectedUser(null); }}>
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
  },
  userInfo: {
    fontSize: 16,
    color: '#343a40', // Dark grey text
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007bff', // Blue background
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
  },
  roleContainer: {
    marginVertical: 10,
    width: '100%',
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 10,
  },
  roleCheckboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  roleCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleText: {
    fontSize: 16,
    color: '#343a40',
    marginLeft: 5,
  },
});

export default SuperAdminDashboard;
