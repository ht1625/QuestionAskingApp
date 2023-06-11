import React, {useState} from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Icon } from 'react-native-elements';
import { darkBlue, darkPurple } from './theme';
import {useNavigation,useIsFocused} from "@react-navigation/native";
import {getStateOfQuestion,getMessage} from '../src/api/user_api';
import { useEffect } from "react";
import SliderCard from "./cardSlider";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

export default HomepageScreen = (props) => {
    
    const navigation = useNavigation();
    const [username, setUsername] = useState(null);
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const [usernameSen, setUsernameSen] = useState('');
    const [userId, setUserId] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            console.log(username);
            console.log("start");
            getSubFromToken();
            getStateOfQuestions();
            console.log("finish");
        }
    }, [isFocused]);

    const getSubFromToken = async () => {
        try {
            let token = await AsyncStorage.getItem('token');
        
            if (token) {
                const decodedToken = jwt_decode(token);
                setUserId(decodedToken.user_id);
                return sub;
            }
        } catch (error) {
            console.log('Error reading token from AsyncStorage:', error);
        }
        return null;
    };
      
    const getMessages = async (chatId,usernameRec) => { // getMessages fonksiyonunu asenkron hale getirin
        //console.log(chatId);  
        //console.log("getmessages husniye zeynep");
        try {
          const result = await getMessage({ chatId: chatId });
          if (result.status == 200) {
            console.log("mesaj geliyor");
            if (result.data !== null){
              setDefaultMessages(result.data,usernameRec,chatId); // getMessages'den dönen veriyi doğrudan setDefaultMessages'a geçirin
            }
          } else {
            console.log("başlka hata dönüyor");
          }
        } catch (err) {
          console.error(err);
        }
    };
    
    const setDefaultMessages = (messagesTemp,usernameRec,chatId) => {
    console.log("start message set");
    if(messagesTemp !== null){
        const MOCK_LESSONS = [];
        console.log("null değil");
        console.log(messagesTemp);
        messagesTemp.forEach((messageIndex) => {
        let name = "temp";
        let apptype = "STUDENT";
        if(messageIndex.senderId == userId){
            name = usernameSen;
        }else{
            name = usernameRec;
            apptype = "LECTURER";
        }
        const tempMessages = {
            _id: generateRandomValue(),
            chatId: chatId,
            text: messageIndex.content,
            createdAt: messageIndex.createdAt,
            user: {
            _id: messageIndex.senderId,
            name: name,
            appType: apptype,
            chatId: chatId,
            receiver: messageIndex.receiverId
            }
        }
        if(messageIndex.question !== null){
            tempMessages.image = messageIndex.question;
        }
        MOCK_LESSONS.push(tempMessages);
        //console.log("*********");
        });
        //console.log("------------------------------------");
        //console.log(MOCK_LESSONS);
        setMessages(MOCK_LESSONS);
    }else{
        console.log("mesaj null geliyor");
    }
    }
      
    const generateRandomValue = () => {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomValue = '';
        
        for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomValue += characters[randomIndex];
        }
        
        return randomValue;
    }

    const sendChatDetail = (chatId, lecturerId, studentId, status, question, branch, questionId) => {
        storeChatId(chatId);
        setUsernameSen(studentId);
        getMessages(chatId,lecturerId);
        console.log(lecturerId);
        console.log("////////////////");
        if(status == "SOLVED"){
           navigation.navigate('ChatDetail', {chatId: chatId, userId:studentId, usernameRec:lecturerId, defaultMessages: messages});
        }
    }

    const storeChatId = async (chatId) => {
        try {
          await AsyncStorage.setItem('@chatID', chatId)
        } catch (e) {
          // saving error
          console.log("error verdi");
        }
    }

    const getStateOfQuestions = () => {
        console.log("soru durumlarını al**");
        getStateOfQuestion({
        })
        .then(result => {
          if (result.status == 200) {
            //console.log(result.data);
            setQuestion(result.data);
          }else{
            console.log("olmadı kim4**");
          }
        })
        .catch(err => {
          console.error(err);
          console.log("Error");
        });
    } 

    return (
        
        <View>
            <StatusBar hidden={false} barStyle="dark-content" />
            <ScrollView>
                <View style={styles.container}>
                    <View style={ Platform.OS === "ios" ? {...styles.headerContainer, marginTop:30} : {...styles.headerContainer}}>
                        <Image source={require("../assets/askStudent.png")} style={styles.logo} />
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
                    {question.length === 0 ? (
                        <View style={{ padding: 20, justifyContent: "center", alignSelf: "center" }}>
                            <Image source={require("../assets/images/waiting.gif")} resizeMode='cover' style={{ width:200, height:250, marginTop:30 }} />
                        </View>
                    ) : (
                        question.map((card) => (
                        <View style={{ justifyContent: "center", alignSelf: "center", padding: 10, paddingBottom: 0 }} key={card.questionId}>
                            <TouchableOpacity onPress={() => {
                                    sendChatDetail(card.chatId, card.lecturerUserName, card.studentId, card.status, card.question, card.branch, card.questionId);
                                }}
                                style={styles.questionContainer}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image resizeMode="cover" source={{ uri: `data:image/png;base64,${card.question}` }} style={styles.questionImage} />
                                    <View style={{ alignSelf: "center", marginLeft: 15 }}>
                                        <Text style={{ marginBottom: 15 }}>{card.branch}</Text>
                                        <Text>studentId</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ marginBottom: 15, textAlign:"right" }}>time</Text>
                                    <Text style={styles.buttonState}>{card.status}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        ))
                    )}
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
    buttonState: {
        backgroundColor: "#CEBDF4",
        padding: 4,
        borderRadius: 5,
        color: "#FFF"
    },
    container: {
        padding: 20,
        minHeight: height
    },
    containerToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 8,
    },
    text: {
        flex: 1,
        fontSize: 18,
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


