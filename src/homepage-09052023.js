import React from 'react';
import { Dimensions, Image, Button, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Icon } from 'react-native-elements';
import { darkBlue, darkPurple } from './theme';
import {useNavigation} from "@react-navigation/native";
import {profile,logout} from '../src/api/user_api';

const { width, height } = Dimensions.get("window");

export default HomepageScreen = () => {

    const navigation = useNavigation();

    const onLogoutPress = () =>{
        logout();
        navigation.navigate("Login")
      }

    return (
        
        <View>
            <StatusBar hidden={false} barStyle="dark-content" />
            <ScrollView style={{}}>
                <View style={styles.container}>
                    <View style={ Platform.OS === "ios" ? {...styles.headerContainer, marginTop:30} : {...styles.headerContainer}}>
                        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
                        <Icon
                            name='settings'
                            type='simple-line-icon'
                            color={darkPurple}
                            style={{ alignSelf: "center" }}
                            //onPress={() => props.navigation.navigate("Settings")}
                        />
                    </View>
                    <View style={{ justifyContent: "center", alignSelf: "center", padding: 20 }}>
                      <TouchableOpacity /*onPress={() => props.navigation.navigate("Solution")}*/ style={styles.questionContainer}>
                          <View style={{ flexDirection: "row" }}>
                              <Image resizeMode="cover" source={require("../assets/question.png")} style={styles.questionImage} />
                              <View style={{ alignSelf: "center", marginLeft: 15 }}>
                                  <Text style={{ marginBottom: 15 }}>dskjaşdk</Text>
                                  <Text>dskjaşdk</Text>
                              </View>
                          </View>
                          <View>
                              <Text style={{ marginBottom: 15, textAlign:"right" }}>10:53</Text>
                              <Text>Değerlendirilmedi</Text>
                          </View>
                      </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        minHeight: height
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center"
    },
    image: {
        flex: 1,
        alignItems: "center"
    },
    logo: {
        alignSelf: "center",
        width: 138.25,
        height: 52.15
    },
    questionContainer: {
        height: 100,
        marginVertical: 10,
        width: width - 40,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 8,
        borderColor: darkBlue,
        borderWidth: 1,
        justifyContent: "space-between"
    },
    questionImage: {
        width: 80,
        height: 80,
    },
});


