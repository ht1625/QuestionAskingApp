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
  TouchableWithoutFeedback
} from 'react-native';
import styles from '../assets/style';
import {useNavigation, useRoute} from "@react-navigation/native";

export default RegisterScreen = () => {

  const navigation = useNavigation()
  const route = useRoute()

  const onLoginPress = () => {};

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>QuAsk Register {route.params.username}</Text>
              <Image style={styles.image} source={require("../assets/Questions_And_Answers-512.webp")} /> 
              <StatusBar style="auto" />
              <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
              <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
              <Button style={styles.fbLoginButton} onPress={() => onLoginPress()} title="Register" />
              <Button style={styles.loginButton} onPress={() => navigation.navigate("Login")} title="Login" />
            </View>
          </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
