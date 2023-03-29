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
//import { useLocation } from 'react-router-dom';
import {useNavigation, useRoute} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../src/AuthContext';
import { useState, useContext } from 'react';


export default HomepageScreen = () => {

    async function getUserDetails() {
        let token = await AsyncStorage.getItem('@storage_token') //got this token from successful login
        //console.log(token)
    }
    getUserDetails();

    
    
    //const { state } = useLocation();
    const route = useRoute()
    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                        <Text style={styles.logoText}>QuAsk Homepage</Text>
                        <Text style={styles.logoText1}>{token}</Text>
                        <Image style={styles.image} source={require("../assets/Questions_And_Answers-512.webp")} />
                        <StatusBar style="auto" />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
