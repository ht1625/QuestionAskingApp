import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import WebSocketClient from './WebSocketClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from "buffer";
import {closeChat} from '../src/api/user_api';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';
import { useNavigation,useIsFocused } from "@react-navigation/native";

/* student */
const CloseChatButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.closeButton} onPress={onPress}>
      <MaterialIcons name="close" size={20} color="white" />
      <Text style={styles.closeButtonText}>Close Chat</Text>
    </TouchableOpacity>
  );
};
/* ---- */

const ChatRoom = (props) => {
  const { chatId, userId, usernameRec, defaultMessages, createdAt, lecturerId, statusChat,lecturer2 } = props.route.params;
  const [messages, setMessages] = useState(defaultMessages);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [userToken, setUserToken] = useState('');
  const [isChatClosed, setIsChatClosed] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (isFocused) {
      const getTokenAsync = async () => {
        let token = await AsyncStorage.getItem('token');
        setToken(token);
        //console.log('Alınan token: ' + token);
        const decodedToken = parseJwt(token);
        setUsername(decodedToken.sub);
        //console.log(decodedToken.user_id+"****");
        setUserToken(decodedToken.user_id);
        WebSocketClient.connect(token);
        //console.log("mesaj almaua git");
        //await getMessages(chatId); // getMessages fonksiyonunu bekleyin
      };
    
      getTokenAsync();
      storeChatId(chatId);
      setMessagePermission();
    }
  }, [isFocused]);

  useEffect(() => {
    WebSocketClient.onReceiveMessage = (newMessage) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));
    };
  }, []);

  useEffect(() => {
    return async () => {
      try {
        await AsyncStorage.removeItem('@chatID')
      } catch (e) {
        
        console.log("error verdi");
      }
    }
  },[]);

  console.log(chatId);
  console.log("************mesajlar*************");
  console.log(defaultMessages);
  console.log("***************************************");

  const setMessagePermission = () => {

    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const differenceInTime = currentDate.getTime() - createdDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays > 1 || statusChat == false) {
      setIsChatClosed(true);
    }

  }

  const storeChatId = async (chatId) => {
    console.log("********değiştir chat ıd*****");
    console.log(chatId);
    console.log("****************************");
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

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const createComment = (comment) => {
    console.log('Seçilen yorum:', comment);
    console.log(comment+lecturer2+"**"+chatId);
    closeChat({
      comment: comment,
      lecturerId: lecturer2,
      'chatId': chatId,
    })
    .then(result => {
      if (result.status == 201) {
        console.log("kaydediyor");
        navigation.navigate('Home');
      }else{
        console.log("baska geldi hata"+result.message);
      }
    })
    .catch(err => {
      console.error(err);
    });
  };

  const handleChatClose = () => {
    // Burada yapmak istediğiniz işlemleri gerçekleştirin
    openModal();
  };

  return (
    <View style={{ flex: 1 }}>
      {messages !== null ? (
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={user}
          renderUsernameOnMessage
          renderMessageImage={renderMessageImage}
          textInputProps={{
            editable: !isChatClosed,
            placeholder: isChatClosed ? 'Chat is closed' : 'Type a message',
          }}
        />
      ) : 
        <View> 
          <Text>Deneme Değişken içeriği dolu değil</Text>
        </View>
      }
      {statusChat ? (
        <CloseChatButton onPress={handleChatClose} />
      ) : 
         null
      }
      <Modal
        isVisible={modalVisible}
        onBackdropPress={closeModal}
        backdropColor="rgba(0, 0, 0, 0.5)"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Choose comment for close to chat:</Text>
          <RadioButton.Group
            onValueChange={(value) => setSelectedComment(value)}
            value={selectedComment}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton.Item label="CORRECT" value="CORRECT" labelStyle={styles.radioButtonLabel} color="#6200EE" />
              <RadioButton.Item label="WRONG" value="WRONG" labelStyle={styles.radioButtonLabel} color="#6200EE" />
              <RadioButton.Item label="TOO_LATE" value="TOO LATE" labelStyle={styles.radioButtonLabel} color="#6200EE" />
              <RadioButton.Item label="NOT_READABLE" value="NOT READABLE" labelStyle={styles.radioButtonLabel} color="#6200EE" />
              <RadioButton.Item
                labelStyle={styles.radioButtonLabel}
                label="NOT+UNDERSTANDABLE"
                value="NOT UNDERSTANDABLE"
                color="#6200EE"
              />
            </View>
          </RadioButton.Group>
          <TouchableOpacity onPress={() => {
            createComment(selectedComment);
            closeModal()
          }} style={styles.commentButton}>
            <Text style={{ color: '#FFF' }}>SEND COMMENT</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },/* student  */
  closeButton: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    backgroundColor: '#5A5A5A',
    flexDirection: 'row',
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 8,
  },
  radioButtonContainer: {
    marginTop: 8,
  },
  commentButton: {
    backgroundColor: '#723CEC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 3,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  radioButtonLabel: {
    fontSize: 15, // Yazının boyutunu buradan ayarlayabilirsiniz
  },
});

export default ChatRoom;
