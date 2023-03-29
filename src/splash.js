import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import { useNavigation } from "@react-navigation/native";

import {StyleSheet, Text, View} from 'react-native';

export default function Splash({}) {
  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 2000);
  });
  const navigation = useNavigation();
  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('token');
    if (!dataToken) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Homepage');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Splash</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontWeight: '800',
    fontSize: 30,
    color: 'white',
  },
});