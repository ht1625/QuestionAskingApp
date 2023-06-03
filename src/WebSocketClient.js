class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.client = null;
    this.onReceiveMessage = null;

    console.log('WebSocketClient initialized!');
  }

  connect(token) {
    const urlWithToken = `${this.url}?token=${encodeURIComponent(token)}`;
    this.client = new WebSocket(urlWithToken);

    this.client.onopen = () => {
      console.log('WebSocketClient connected!');
    };

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
    const messagePayload = JSON.parse(message.data);
    console.log('Received message from the server: ', messagePayload);

    if (this.onReceiveMessage) this.onReceiveMessage(messagePayload);
  };
s
  close = () => {
    this.client.close();
  };
}

const client = new WebSocketClient('ws://192.168.1.156:8082/chat');

export default client;
