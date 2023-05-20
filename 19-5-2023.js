import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';

const ChatDetailScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (websocket.readyState === WebSocket.OPEN) {
      websocket.send(message);
      setMessage('');
    } else {
      console.error('WebSocket connection is not open');
    }
  };
  

  websocket.onmessage = (event) => {
    console.log('Received message from the server: ', event.data);
    setMessages(prevMessages => [...prevMessages, event.data]);
  };
  

  useEffect(() => {
    const websocket = new SockJS('http://192.168.1.63:8082/ws');

    websocket.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    websocket.onmessage = (event) => {
      console.log('Received message from the server: ', event.data);
      receiveMessage(event.data);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    websocket.onclose = (event) => {
      console.log('WebSocket connection closed: ', event.code, event.reason);
    };

    return () => {
      websocket.close();
    };
  }, []);

  return (
    <View>
      <FlatList 
        data={messages}
        renderItem={({item}) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput value={message} onChangeText={setMessage} />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatDetailScreen;
