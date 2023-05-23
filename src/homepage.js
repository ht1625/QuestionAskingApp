import React, {useState} from 'react';
import { Dimensions, Image, Button, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Icon } from 'react-native-elements';
import { darkBlue, darkPurple } from './theme';
import {useNavigation} from "@react-navigation/native";
import {profile,logout} from '../src/api/user_api';
import jwt_decode from 'jwt-decode';
import { useEffect } from "react";
import SliderCard from "./cardSlider";

const { width, height } = Dimensions.get("window");

export default HomepageScreen = (props) => {

    
    const navigation = useNavigation();
    const [username, setUsername] = useState(null);

    const onLogoutPress = () =>{
        logout();
        navigation.navigate("Login")
      }
      const getSubFromToken = async () => {
        try {
            let token = await AsyncStorage.getItem('token');
        
          if (token) {
            const decodedToken = jwt_decode(token);
            const sub = decodedToken.sub;
            setUsername(sub);
            return sub;
          }
        } catch (error) {
          console.log('Error reading token from AsyncStorage:', error);
        }
        return null;
      };
      useEffect(() => {
       console.log(username);
    }, []);

    const cardsQuestion = [
        {
            id: 1,
            branch: 'Fizik',
            lecturer: 'Zeynep',
            pathImage: '../assets/question.png',
            time: '14:08',
            state: 'Çözüldü'
        },
        {
            id: 2,
            branch: 'Kimya',
            lecturer: 'Engindeniz',
            pathImage: '../assets/question.png',
            time: '10:25',
            state: 'Çözüldü'
        },
        {
            id: 1,
            branch: 'Matematik',
            lecturer: 'Hüsniye',
            pathImage: '../assets/question.png',
            time: '08:45',
            state: 'Değerlendirilmedi'
        }
    ];
      
    return (
        
        <View>
            <StatusBar hidden={false} barStyle="dark-content" />
            <ScrollView>
                <View style={styles.container}>
                    <View style={ Platform.OS === "ios" ? {...styles.headerContainer, marginTop:30} : {...styles.headerContainer}}>
                        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
                        <Icon
                            name='help'
                            type='help-outline'
                            color={darkPurple}
                            style={{ alignSelf: "center" }}
                            onPress={() => props.navigation.navigate("Help")}
                        />
                    </View>
                    <View style={styles.containerSlider}>
                        <SliderCard style={{ flex: 1 }}/>
                    </View>
                    {cardsQuestion.map((card) => (
                    <View style={{ justifyContent: "center", alignSelf: "center", padding: 20, paddingBottom: 0 }} key={card.id}>
                      <TouchableOpacity /*onPress={() => props.navigation.navigate("Solution")}*/ style={styles.questionContainer}>
                          <View style={{ flexDirection: "row" }}>
                              <Image resizeMode="cover" source={require("../assets/question.png")} style={styles.questionImage} />
                              <View style={{ alignSelf: "center", marginLeft: 15 }}>
                                  <Text style={{ marginBottom: 15 }}>{card.branch}</Text>
                                  <Text>{card.lecturer}</Text>
                              </View>
                          </View>
                          <View>
                              <Text style={{ marginBottom: 15, textAlign:"right" }}>{card.time}</Text>
                              <Text>{card.state}</Text>
                          </View>
                      </TouchableOpacity>
                    </View>
                    ))}
                </View>
            </ScrollView>      
        </View>
    )
}

const styles = StyleSheet.create({
    containerSlider:{
        height: 200,
        marginVertical: 10,
        width: width - 40,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        borderColor: darkBlue,
        borderWidth: 1,
        justifyContent: "space-between",
        marginTop: 30
    },
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


