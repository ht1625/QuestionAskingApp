import React, { useContext, useEffect } from 'react';
import { BackHandler, Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, View, } from 'react-native';
import { darkPurple, whiteColor } from './theme';
import { Button, } from 'react-native-elements';
import AnimatedLottieView from 'lottie-react-native';
import { useNavigation } from "@react-navigation/native";


const { width, height } = Dimensions.get("window");



export default welcome = (props) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} showHideTransition={true} barStyle="dark-content" />

            <ImageBackground source={require("../assets/images/welcome-bg.png")} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 1, justifyContent: "space-around" }}>
                    <Image source={require("../assets/images/logo-light.png")} style={styles.logo} />
                    <AnimatedLottieView source={require('../assets/images/confetti.json')} autoPlay loop />
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 18, color: whiteColor, }}>Her şey hazır!</Text>
                        <Text style={{ fontSize: 18, color: whiteColor }}>QueX’le soru çözmeye başla!</Text>
                    </View>

                    <Button title="Başla" onPress={() => navigation.navigate("Tab")} titleStyle={{ color: darkPurple, fontFamily: "Nunito-Bold" }} buttonStyle={{ backgroundColor: whiteColor }} containerStyle={{ backgroundColor: whiteColor, width: width * .6, paddingVertical: 5, alignSelf: "center", }} />
                </View>
            </ImageBackground>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        alignItems: "center",
        width: width,
        height: height
    },
    logo: {
        alignSelf: "center",
        width: 195.65,
        height: 74.39
    }
});
