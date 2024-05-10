import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image,Linking } from 'react-native';
import { getAuth } from 'firebase/auth';
import { FIREBASE_APP } from './FirebaseConfig';

const CourseHome = () => {
  const [userRole, setUserRole] = useState('Regular User');
  const auth = getAuth(FIREBASE_APP);

  useEffect(() => {
    const fetchUserRole = async () => {
      const authUser = auth.currentUser;
      if (authUser && authUser.email) {
        const emailPrefix = authUser.email.split('@')[0];
        if (emailPrefix.toLowerCase().includes('admin')) {
          setUserRole('Admin');
        } else if (emailPrefix.toLowerCase().includes('superadmin')) {
          setUserRole('Super Admin');
        } else if (emailPrefix.toLowerCase().includes('manager')) {
          setUserRole('Manager');
        } else {
          setUserRole('User');
        }
      }
    };

    fetchUserRole();
  }, []);

  const courses = [
    {
      title: 'React - Native Development',
      author: 'Mohit Kulkarni',
      duration: '16 hours',
      image: require('./assets/react 1.png'), // Correct the path if necessary
      url: 'https://dev.d25obo24yveepo.amplifyapp.com/'
    },
    {
      title: 'Flutter Development',
      author: 'Mohit Kulkarni',
      duration: '16 hours',
      image: require('./assets/flutter 1.png'), // Correct the path if necessary
    },
    {
      title: 'Firebase Authentication',
      author: 'Mohit Kulkarni',
      duration: '14 hours',
      image: require('./assets/flutter 2.png'), // Correct the path if necessary
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Courses Available</Text>
        <View style={styles.avatarContainer}>
          <Image
            source={require('./assets/Avatar.png')} // Ensure correct path
            style={styles.avatar}
          />
          <Text style={styles.role}>{userRole}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {courses.map((course, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.courseCard}
            onPress={() => {
              Linking.openURL(course.url).catch(err => console.error("Failed to open URL:", err));
            }}
          >
            <Image
              source={course.image}
              style={styles.courseImage}
            />
            <View style={styles.courseDetails}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseAuthor}>{course.author}</Text>
              <Text style={styles.courseDuration}>{course.duration}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  role: {
    fontSize: 16,
    marginTop: 10,
  },
  contentContainer: {
    padding: 20,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  courseAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  courseDuration: {
    fontSize: 12,
    color: '#666',
  },
});

export default CourseHome;
