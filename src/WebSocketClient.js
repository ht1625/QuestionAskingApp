import AsyncStorage from '@react-native-async-storage/async-storage';

class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.client = null;
    this.onReceiveMessage = null;

    console.log('WebSocketClient initialized!');
  }

  async connect(token) {
    const urlWithToken = `${this.url}?token=${encodeURIComponent(token)}`;
    this.client = new WebSocket(urlWithToken);

    this.client.onopen = () => {
      console.log('WebSocketClient connected!');
    };

    // AsyncStorage'den chatId'yi al.
    try {
      const value = await AsyncStorage.getItem('@chatID');
      if(value !== null) {
        this.chatID = value; // Eğer bir değer alındıysa, bu değeri chatId'ye ata.
      }
    } catch(e) {
      // Hata durumunda bir mesaj logla.
      console.log("Error while getting the chatId: ", e);
    }

    this.client.onmessage = this.onMessage;
    this.client.onerror = (err) =>
      console.log('Error while connecting to the server: ' + err);

    console.log(token);
  }

  send(message) {
    if (this.client && this.client.readyState === this.client.OPEN)
      this.client.send(JSON.stringify(message));
    else console.log('Could not send message: ', message);
  }

  onMessage = (message) => {
    let messagePayload = JSON.parse(message.data);
    //console.log('Received message from the server: ', messagePayload);

    console.log("*******start**********");
    console.log("store:"+this.chatID);
    console.log('message:' , messagePayload.chatId);
    console.log("*******finish**********");

    if (this.chatID && this.chatID === messagePayload.chatId) {
      if (this.onReceiveMessage) this.onReceiveMessage(messagePayload);
    }
  };

  close = () => {
    this.client.close();
  };
}

const client = new WebSocketClient('ws://192.168.1.156:8082/chat');

export default client;
