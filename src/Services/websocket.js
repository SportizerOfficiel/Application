/** @format */

// services/websocket.js
class WebSocketService {
  constructor() {
    this.socket = null;
  }

  async getKey() {
    const response = await fetch('http://localhost:8080');
    if (!response.ok) {
      throw new Error('Error fetching key');
    }
    const data = await response.json();
    return data.key;
  };
 // Add this function to the WebSocketService class
 connect(key) {
  if (this.socket && this.socket.readyState === WebSocket.OPEN) {
    this.socket.close();
    return false;
  }
  this.socket = new WebSocket(`ws://localhost:8080/${key}`);
  this.socket.onopen = () => console.log("WebSocket connected");
  this.socket.onerror = (error) => console.error("WebSocket error:", error);
  this.socket.onclose = () => console.log("WebSocket closed");
  this.socket.addEventListener("message", (message) => this.handleMessage(message));

  return true;
}
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

 
  removeMessageListener(callback) {
    if (this.socket) {
      this.socket.removeEventListener("message", callback);
    }
  }

  sendMessage({type,message}) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const stringifiedMessage = JSON.stringify({type,message});
      this.socket.send(stringifiedMessage);
    }
  }
  async sendPostMessage(key, type, message) {
    try {
      const response = await fetch(`http://localhost:8080/api/send-message/${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to send message: `, error);
    }
  }

  
  
  setMessageHandler(handler) {
    this.messageHandler = handler;
  }
  // Modify the handleMessage function in the WebSocketService class
  handleMessage(message) {
    const data = JSON.parse(message.data);
    if (this.messageHandler) {
      this.messageHandler(data);
    }
  }


 
}

const webSocketServiceInstance = new WebSocketService();

export default webSocketServiceInstance;
