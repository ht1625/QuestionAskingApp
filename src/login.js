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
} from 'react-native';
import styles from "../assets/style";
import {useNavigation} from "@react-navigation/native";
import { useState } from 'react';

export default LoginScreen = () => {

  const navigation = useNavigation();
  const [username, setUsername] = useState('');

  const onLoginPress = () => {};

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>QuAsk Login</Text>
              <Image style={styles.image} source={require("../assets/Questions_And_Answers-512.webp")} />
              <StatusBar style="auto" />
              <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
              <TextInput value={username} onChangeText={setUsername} placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
              <Button style={styles.loginButton} onPress={onLoginPress} title="Login" />
              <Button style={{ color:'white', backgroundColor:'red' }} onPress={() => navigation.navigate("Register", {username: username})} title="Register" />
            </View>
          </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}