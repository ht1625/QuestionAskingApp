import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import { BackHandler, Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, View, } from 'react-native';

const { width, height } = Dimensions.get("window");
export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 2000);
  });

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('token');
    if (!dataToken) {
      navigation.replace('Login');
    } else {
      navigation.replace('Homepage');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} barStyle="dark-content" />
      <ImageBackground source={require("../assets/images/splash-bg.png")} resizeMode="cover" style={styles.image}>
    
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:width,
    height:height
  },
  logo: {
    alignSelf: "center",
    width: 195.65,
    height: 74.39
}
});