import React from "react";
import { Image,View, SafeAreaView, StyleSheet,Text } from 'react-native';
import { useEffect, useState } from "react";
import ContactRow from './components/contactRow';
import { useNavigation,useIsFocused } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import {getChat} from '../src/api/user_api';
import { Buffer } from "buffer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getMessage} from '../src/api/user_api';

const ChatScreen = (props) => {

    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [chatArr, setChatArr] = useState('');
    const [usernameSen, setUsernameSen] = useState(''); 
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const isFocused = useIsFocused();

    const getTokenAsync = async () => {
        let token = await AsyncStorage.getItem('token');
        setToken(token);
        const decodedToken = parseJwt(token);
        //console.log("****deneme*****");
        //console.log(decodedToken);
        setUserId(decodedToken.user_id);
        setUsernameSen(decodedToken.sub);
        setToken(decodedToken);
    };

    useEffect(() => {
        if (isFocused) {
          console.log("start");
          getTokenAsync();
          console.log(userId);
          getChats();
          console.log("///////***");
          console.log(chatArr);
          console.log("**/////*");
        }
    }, [isFocused]);

    const getChats = () => {
        console.log("getChats");
        getChat().then(result => {
            setChatArr(result.data);
            console.log("GetChatFromAPi");
        }).catch(error => {
            console.log('Hata:', error);
        });
    }
    
    const parseJwt = (token) => {
        const parts = token.split('.').map((part) =>
          Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()
        );
        const payload = JSON.parse(parts[1]);
        return payload;
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
        console.log("--------/////-------------//////-------------------------");
        if(messagesTemp !== null){
          const MOCK_LESSONS = [];
          console.log("null değil");
          console.log(messagesTemp+"8888");
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
          console.log("------------------------------------");
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

    const getMessagesAndRouteDetail = (chatId, userId, usernameRec, createdAt, lecturerId, status) =>{
        getMessages(chatId,usernameRec);
        console.log("****************mesajlar*************");
        console.log(messages);
        console.log("*************************************");
        let statusChat = true;
        if(status == "CLOSED"){
            statusChat = false;
        }
        navigation.navigate('ChatDetail', {chatId: chatId, userId:userId, usernameRec:usernameRec, defaultMessages: messages, createdAt: createdAt, lecturerId: lecturerId, statusChat: statusChat});
    }

    return (
        <SafeAreaView>
        {chatArr.length === 0 ? (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/images/preview2.png')} />
                </View>
            </View>
        ) : (
            chatArr.map((index) => (
            <React.Fragment key={index.id}>
                <ContactRow
                name={index.user.username}
                subtitle={index.createdAt}
                onPress={() => {
                    //navigation.navigate('ChatDetail', {chatId: index.id, userId:userId, usernameRec:index.user.username});
                    getMessagesAndRouteDetail(index.id, userId, index.user.username, index.createdAt, index.lecturerId, index.status);
                    //console.log(index.user.username)
                }}
                icon={<Ionicons name="person-outline" size={24} color="red" />}
                />
                <View style={styles.seperator} />
            </React.Fragment>
            ))
        )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    seperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E2E2E2',
        marginStart: 16
    },
    emptyText: {
        fontSize: 20,
        color: 'darkgray',
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      imageContainer: {
        alignItems: 'center',
      },
      image: {
        width: 300,
        height: 300,
        marginTop: 100
      },
    
})
export default ChatScreen;