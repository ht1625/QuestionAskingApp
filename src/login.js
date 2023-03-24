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
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from 'react';
import { AuthContext } from '../src/AuthContext';
//import { useHistory } from 'react-router-dom';
//import axios from 'axios';

export default LoginScreen = (props) => {

  const navigation = useNavigation();
  //const useHistory = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {

    const requestData = {
      username: username,
      password: password,
      appType: "LECTURER"
    };

    const jwtToken = "Husniye";
    const authContext = useContext(AuthContext);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
        appType: "LECTURER"
      })
    };
    //console.log(requestData);
    fetch('http://192.168.1.156:8082/api/v1/user/login', requestOptions)
      .then(response => {
        response.json()
          .then(data => {
            Alert.alert("Post created at : ",
              data.jwtToken);
              authContext.setAuthState({
                jwtToken: data.jwtToken,
                authenticated: true,
              });
              try {
                 AsyncStorage.setItem(
                  'token',
                  JSON.stringify({
                    jwtToken,
                    refreshToken,
                  }),
                )
              } catch (e) {
                console.log("error while jwt token stored", e);
              }
          });
      })
      .catch((error) => {
        console.log(error);
      });

      console.log(jwtToken);
      //navigation.navigate("Homepage",{jwtToken: jwtToken});

      try {
         AsyncStorage.getItem('token').then((e) => {
          console.log(e);
        })
      } catch (e) {
        console.log("error while getting jwt token", e);
      }
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