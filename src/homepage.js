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
import { useLocation } from 'react-router-dom';

export default HomepageScreen = () => {

    const { state } = useLocation();

    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                        <Text style={styles.logoText}>QuAsk Homepage</Text>
                        <Text style={styles.logoText}>{state.jwtToken}</Text>
                        <Image style={styles.image} source={require("../assets/Questions_And_Answers-512.webp")} />
                        <StatusBar style="auto" />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
