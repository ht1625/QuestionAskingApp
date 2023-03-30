import React from 'react';
import {
  Text,
  Image,
  StatusBar,
  View,
  TextInput,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import styles from "../assets/style";
import { useState, useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {user_login,logout} from '../src/api/user_api';

export default LoginScreen = (props) => {

  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {

    user_login({
      username: username.toLocaleLowerCase(),
      password: password,
      appType: "LECTURER"
    })
      .then(result => {
        if (result.status == 201) {
    
          AsyncStorage.setItem('token', result.data.jwtToken);
          navigation.navigate('Homepage');
        }
      })
      .catch(err => {
        console.error(err);
      });
     
  };


  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>QuAsk Login</Text>
            <Image style={styles.image} source={require("../assets/Questions_And_Answers-512.webp")} />
            <StatusBar style="auto" />
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
            <Button style={styles.loginButton} onPress={onLoginPress} title="Login" />
            <Button style={{ color: 'white', backgroundColor: 'red' }} onPress={() => navigation.navigate("Register", { username: username })} title="Register" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}