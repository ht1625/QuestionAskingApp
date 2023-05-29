class WebSocketClient {
    constructor(url) {
      this.url = url;
      this.client = new WebSocket(this.url);
      this.client.onmessage = this.onMessage;
      this.client.onerror = (err) =>
        console.log('Error while connecting to the server: ' + err);
  
      console.log('WebSocketClient initialized!');
    }

    connect(token) {
      this.client = new WebSocket(this.url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.send(token)
      this.client.onmessage = this.onMessage;
      this.client.onerror = (err) =>
        console.log('Error while connecting to the server: ' + err);
      console.log(token)
      console.log('WebSocketClient connected!');
    }
  
    send(message) {
      if (this.client && this.client.readyState === this.client.OPEN) {
        const messagePayload = {
          type: 'private',
          content: message,
        };
        this.client.send(JSON.stringify(messagePayload));
      } else {
        console.log('Could not send message: ', message);
      }
    }
  
    onMessage = (message) => {
      const messagePayload = JSON.parse(message.data);
      console.log('Received message from the server: ', messagePayload);
  
      if (this.onReceiveMessage) this.onReceiveMessage(messagePayload);
    };
  
    close = () => {
      this.client.close();
    };
  }
  
  const client = new WebSocketClient('ws://192.168.1.63:8082/chat');
  
  export default client;