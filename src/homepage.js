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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useContext } from 'react';
import {profile,logout} from '../src/api/user_api';

export default HomepageScreen = () => {
    const navigation = useNavigation();

    const onTestPress = () => {
             
       profile()
          .then(result => {
            if (result.status == 200) {
              navigation.navigate('Homepage');

            }
          })
          .catch(err => {
            console.error(err);
          });

      };
      const onLogoutPress = () =>{
        logout();
        navigation.navigate("Login")
      }
    
        return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                        <Text style={styles.logoText}>QuAsk Homepage</Text>
                        <Image style={styles.image} source={require("../assets/Questions_And_Answers-512.webp")} />
                        <Button style={styles.loginButton} onPress={onTestPress} title="test" />
                        <Button style={styles.loginButton} onPress={onLogoutPress} title="logout" />
                        <StatusBar style="auto" />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
