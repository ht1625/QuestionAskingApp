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
import {useNavigation} from "@react-navigation/native";
import { useState } from 'react';
//import axios from 'axios';

export default LoginScreen = () => {

  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const isHermes = () => !!global.HermesInternal;

  const onLoginPress = () => {

    const requestData = {
      username: username,
      password: password,
      appType: "LECTURER"
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: username,
        password: password,
        appType: "LECTURER"
      })
    };

    fetch('http://192.168.1.69:8082/api/v1/user/login/', requestData)
    .then(response => {
      response.json()
          .then(data => {
              Alert.alert("Post created at : ", 
              data.jwtToken);
          });
    })
    .catch((error) => {
      console.log(error);
    });

    //console.log(res);
              
    /*const express = require('express');
    const cors = require('cors');

    const app = express();

    // 👇️ configure CORS
    app.use(cors());

    app.get('/products/:id', function (req, res, next) {
      res.json({msg: 'This is CORS-enabled for all origins!'});
    });

    const PORT = 3456;

    app.listen(PORT, function () {
      console.log(`CORS-enabled web server listening on port ${PORT}`);
    });


    axios.post('http://localhost:8082/api/v1/user/login', requestData)
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });*/

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
              <Button style={{ color:'white', backgroundColor:'red' }} onPress={() => navigation.navigate("Register", {username: username})} title="Register" />
            </View>
          </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}