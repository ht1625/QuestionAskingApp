import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import WebSocketClient from './WebSocketClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from "buffer";

const MOCK_MESSAGES = [
  {
    _id: 1,
    text: 'Hello, Teacher!',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Sender',
    },
  },
  {
    _id: 2,
    image: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Sender',
    },
  },
  {
    _id: 3,
    text: 'Hello, Student!',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Receiver',
    },
  },
  {
    _id: 4,
    text: 'It happened this way that ...',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Receiver',
    },
  },
  {
    _id: 5,
    text: 'I get it, thank you.',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Sender',
    },
  },
];

const sortedMessages = MOCK_MESSAGES.sort((a, b) => b._id - a._id);

const ChatRoom = (props) => {

  const { chatId } = props.route.params;
  const [messages, setMessages] = useState(sortedMessages);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  console.log(chatId);
  /*useEffect(() => {
    return () => WebSocketClient.close();
  }, []);*/

  useEffect(() => {
    WebSocketClient.onReceiveMessage = (newMessage) => {
      setMessages(GiftedChat.append(messages, newMessage));
    };
  }, [messages]);

  useEffect(() => {
    const getTokenAsync = async () => {
      let token = await AsyncStorage.getItem('token');
      setToken(token);
      console.log('Alınan token: ' + token);
      const decodedToken = parseJwt(token);
      setUsername(decodedToken.sub);
      console.log(decodedToken);
    };
  
    getTokenAsync();
  }, []);

  const parseJwt = (token) => {
    const parts = token.split('.').map(part => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
    const payload = JSON.parse(parts[1]);
    return payload;
  };
  
  const onSend = (newMessages) => {
    WebSocketClient.send(newMessages[0]);
    //console.log('deneme   ****  '+username);
  };

  const user = {
    _id: 1,
    name: 'Sender',
    token: token
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
        onSend={(newMessages) => onSend(newMessages)}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '50%',
  },
});

export default ChatRoom;