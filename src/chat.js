import React from "react";
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useEffect, useState } from "react";
import ContactRow from './components/contactRow';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import {getChat} from '../src/api/user_api';
import { Buffer } from "buffer";
import AsyncStorage from '@react-native-async-storage/async-storage';

const chats = [
    {
        users: ["a@gmail.com", "b@gmail.com"],
        messages: 'Okay',
        nameLecturer: 'Jessica',
    },
    {
        users: ["a@gmail.com", "b@gmail.com"],
        messages: 'Thank you',
        nameLecturer: 'Monica'
    },
    {
        users: ["a@gmail.com", "b@gmail.com"],
        messages: 'I dont get it',
        nameLecturer: 'Sue'
    },
    {
        users: ["a@gmail.com", "b@gmail.com"],
        messages: 'No, I dont',
        nameLecturer: 'Barney'
    },
    {
        users: ["a@gmail.com", "b@gmail.com"],
        messages: 'I dont have any question.',
        nameLecturer: 'Joe'
    }
]

const ChatScreen = (props) => {

    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [chatArr, setChatArr] = useState(''); 
    const navigation = useNavigation();

    const getTokenAsync = async () => {
        let token = await AsyncStorage.getItem('token');
        setToken(token);
        const decodedToken = parseJwt(token);
        setUserId(decodedToken.user_id);
        setToken(decodedToken);
    };

    useEffect(() => { 
        console.log("start");
        getTokenAsync();
        console.log(userId);
        getChats();
        console.log("///////***");
        console.log(chatArr);
        console.log("**/////*");
    }, []);

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

    return (
        <SafeAreaView>
            {chats.map((index) => (
                <React.Fragment>
                    <React.Fragment key="{index.id}">
                        
                        <ContactRow
                            name="{index.user.username}"
                            
                            subtitle="{index.createdAt}"
                            onPress={() => {
                                navigation.navigate('ChatDetail',{chatId: index.id,userId:userId, usernameRec:index.user.username});
                                
                                console.log(index.user.username)
                            }}
                            icon={<Ionicons name="person-outline" size={24} color="red" />} // İkonun rengini kırmızı olarak ayarladık
                        />
                        <View style={styles.seperator} />
                    </React.Fragment>

                </React.Fragment>
            ))}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    seperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E2E2E2',
        marginStart: 16
    }
})
export default ChatScreen;