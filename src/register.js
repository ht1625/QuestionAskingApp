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
import {register} from '../src/api/user_api';

const { width, height } = Dimensions.get("window");

export default RegisterScreen = (props) => {

  const navigation = useNavigation();
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [NickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegisterPress = () => {
    console.log("register go to api.");
    console.log(email+"*"+password+"*"+FirstName+"*"+LastName+"*"+NickName);
    register({
      username: email,
      password: password,
      appType: "STUDENT",
      firstName: FirstName,
      lastName: LastName,
      nickname: NickName
    })
    .then(result => {
      if (result.status == 201) {
        console.log("kaydediyor");
        AsyncStorage.setItem('token', result.data.jwtToken);
        navigation.navigate('Welcome');
      }else{
        console.log("come from api");
      }
    })
    .catch(err => {
      console.error(err);
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, }}>
      <View style={{ flex: 1, justifyContent: "space-between", padding: 25 }}>
        <Image source={require("../assets/askStudent.png")} style={styles.logo} />
        <View>

          <Text style={{ fontSize: 18,marginLeft: 10 }}>Firstname</Text>
          <Input
            value = {FirstName}
            placeholder='John'
            inputContainerStyle={{ borderBottomColor: darkPurple }}
            onChangeText={  setFirstName }
            keyboardType="default" />

          <Text style={{ fontSize: 18,marginLeft: 10 }}>Lastname</Text>
          <Input
            value = {LastName}
            placeholder='Erick'
            inputContainerStyle={{ borderBottomColor: darkPurple }}
            onChangeText={  setLastName }
            keyboardType="default" />

          <Text style={{ fontSize: 18,marginLeft: 10 }}>Nickname</Text>
          <Input
            value = {NickName}
            placeholder='Eric'
            inputContainerStyle={{ borderBottomColor: darkPurple }}
            onChangeText={ setNickName }
            keyboardType="default" />  

          <Text style={{ fontSize: 18,marginLeft: 10 }}>Email</Text>
          <Input
            value = {email}
            placeholder='example@example.com'
            inputContainerStyle={{ borderBottomColor: darkPurple }}
            onChangeText={  setEmail }
            keyboardType="email-address" />

          <Text style={{ fontSize: 18, marginLeft: 10 }}>Password</Text>
          <Input
            value = {password}
            placeholder='• • • • • • • •'
            inputContainerStyle={{ borderBottomColor: darkPurple }}
            secureTextEntry={true}
            onChangeText={ setPassword } />

        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ flexDirection: "row", alignSelf: "center", marginTop: 15 }}>
          <Text style={{  fontSize: 14 }}>Bir hesabın var mı? </Text>
          <Text style={{  fontSize: 14 }}>Giriş Yap</Text>
        </TouchableOpacity>
        <Button  onPress={onRegisterPress} title="Register" />
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
    height: 74.39,
    marginTop: 25
  },
  line: {
    backgroundColor: darkPurple,
    height: 1,
    width: width - 30,
    alignSelf: "center"
  }
});

