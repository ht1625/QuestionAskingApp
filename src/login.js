import React from 'react';
import { darkPurple, lightBlue } from './theme';
import {
  Text,
  Image,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {user_login} from '../src/api/user_api';

const { width, height } = Dimensions.get("window");
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
        console.log("geliyor");
        AsyncStorage.setItem('token', result.data.jwtToken);
        navigation.navigate('Welcome');
      }
    })
    .catch(err => {
      console.error(err);
    });
     
  };


  return (
    <KeyboardAvoidingView style={{ flex: 1, }}>
      <View style={{ flex: 1, justifyContent: "space-between", padding: 25 }}>
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        <View>
          <Text style={{ fontSize: 18,marginLeft: 10 }}>Email</Text>
          <Input
            value = {username}
            placeholder='example@example.com'
            inputContainerStyle={{ borderBottomColor: darkPurple }}
            onChangeText={  setUsername }
            keyboardType="email-address" />
          <Text style={{ fontSize: 18, marginLeft: 10 }}>Password</Text>
          <Input
            value = {password}
            placeholder='• • • • • • • •'
            inputContainerStyle={{ borderBottomColor: darkPurple }}
            secureTextEntry={true}
            onChangeText={ setPassword } />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ flexDirection: "row", alignSelf: "center", marginTop: 15 }}>
          <Text style={{  fontSize: 14 }}>Bir hesabın yok mu? </Text>
          <Text style={{  fontSize: 14 }}>Kaydol</Text>
        </TouchableOpacity>
        <Button  onPress={onLoginPress} title="Login" />
        <View />
   
      </View>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 15
  },
  proggressBarFirst: {
    width: (width / 4) - 12,
    height: 8,
    marginRight: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: darkPurple
  },
  proggressBarLast: {
    backgroundColor: lightBlue,
    width: (width / 4) - 12,
    height: 8,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  proggressBar: {
    backgroundColor: lightBlue,
    width: (width / 4) - 12,
    height: 8,
    marginRight: 4,
  },
  logo: {
    alignSelf: "center",
    width: 195.65,
    height: 74.39
  },
  line: {
    backgroundColor: darkPurple,
    height: 1,
    width: width - 30,
    alignSelf: "center"
  }
});

