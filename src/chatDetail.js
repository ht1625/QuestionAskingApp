import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import WebSocketClient from './WebSocketClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from "buffer";
import uuid from 'react-native-uuid';

const ChatRoom = (props) => {
  const { chatId, userId, usernameRec } = props.route.params;
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    WebSocketClient.onReceiveMessage = (newMessage) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));
    };
  }, []);

  useEffect(() => {
    const getTokenAsync = async () => {
      let token = await AsyncStorage.getItem('token');
      setToken(token);
      console.log('Alınan token: ' + token);
      const decodedToken = parseJwt(token);
      setUsername(decodedToken.sub);
      console.log(decodedToken);
      WebSocketClient.connect(token);
    };

    getTokenAsync();
    storeChatId(chatId);
  }, []);

  const storeChatId = async (chatId) => {
    try {
      await AsyncStorage.setItem('@chatID', chatId)
    } catch (e) {
      // saving error
      console.log("error verdi");
    }
  }

  const parseJwt = (token) => {
    const parts = token.split('.').map((part) =>
      Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()
    );
    const payload = JSON.parse(parts[1]);
    return payload;
  };

  const user = {
    _id: userId,
    name: username,
    receiver: usernameRec,
    chatId: chatId,
    appType: "STUDENT",

    avatar: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png'
  };

  const onSend = (newMessages) => {
    const formattedMessages = newMessages.map((message) => ({
      ...message,
      chatId: chatId,
      user: {
        _id: user._id,
        name: user.name,
        receiver: usernameRec,
        chatId: chatId,
        appType: "STUDENT",

      },
    }));

    setMessages((prevMessages) => GiftedChat.append(prevMessages, formattedMessages));

    // Gönderilecek mesajları dizi olarak değil, tek bir mesaj olarak gönderin
    // Dizi yerine sadece ilk mesajı gönderiyoruz
    WebSocketClient.send(formattedMessages[0]);
  };

  const renderMessageImage = (props) => {
    const { currentMessage } = props;
    if (currentMessage.image) {
      return (
        <View>
          <Image
            style={styles.messageImage}
            source={{ uri: `data:image/png;base64,${currentMessage.image}` }}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={user}
        renderUsernameOnMessage
        renderMessageImage={renderMessageImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default ChatRoom;
