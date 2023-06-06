import React from "react";
import { Image,View, SafeAreaView, StyleSheet,Text } from 'react-native';
import { useEffect, useState } from "react";
import ContactRow from './components/contactRow';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import {getChat} from '../src/api/user_api';
import { Buffer } from "buffer";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        getChats();
      
    }, []);

    const getChats = () => {
        console.log("getChats");
        getChat().then(result => {
            if(result.data != null ){
                setChatArr(result.data);

            }
            console.log("GetChatFromAPi");
            console.log(result.data);
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
        {chatArr.length === 0 ? (
         <View style={styles.container}>
         <View style={styles.imageContainer}>
           <Image style={styles.image} source={require('../assets/images/waiting.gif')} />
           <Text style={styles.emptyText}>There are no chats to display.</Text>
         </View>
        
       </View>
        ) : (
            chatArr.map((index) => (
            <React.Fragment key={index.id}>
                <ContactRow
                name={index.user.username}
                subtitle={index.createdAt}
                onPress={() => {
                    navigation.navigate('ChatDetail', {chatId: index.id, userId:userId, usernameRec:index.user.username});
                    console.log(index.user.username)
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
        color: 'black',
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
        marginTop: 200
      },
    
})
export default ChatScreen;