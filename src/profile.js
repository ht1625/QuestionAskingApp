import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { profile } from '../src/api/user_api';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const ProfileTableRow = ({ title, value }) => {
  return (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={[styles.cell, styles.rightCell]}>
        {title === 'Rate' ? (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={24} color="gold" />
            <Ionicons name="star" size={24} color="gold" />
            <Ionicons name="star" size={24} color="gold" />
            <Ionicons name="star" size={24} color="gold" />
          </View>
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  const [studentData, setStudentData] = useState('');

  useEffect(() => {
    console.log('data çekmeye hazırlanıyor...');
    profile()
      .then((result) => {
        console.log(result.data);
        setStudentData(result.data);
      })
      .catch((error) => {
        console.log('Hata:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={{
            uri:
              'https://cdn-icons-png.flaticon.com/512/194/194936.png'      
        }}
          style={styles.profileImage}
        />
        <ProfileTableRow title="First Name" value="Jessica" />
        <ProfileTableRow title="Last Name" value="Morlon" />
        <ProfileTableRow title="Nick Name" value="MathGirl" />
        <ProfileTableRow title="Phone Number" value="+90 555 555 5555" />
        <ProfileTableRow title="Email" value="erick@gmail.com" />
        <ProfileTableRow title="Rate" value="" />
        <ProfileTableRow title="Question Count" value="15" />
        <ProfileTableRow title="Branch" value="Mathematic" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
  },
  profile: {
    flex: 1,
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightCell: {
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});

export default ProfileScreen;