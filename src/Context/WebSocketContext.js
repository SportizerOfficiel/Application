/** @format */

// services/WebSocketContext.js
import { createContext, useContext, useState, useEffect } from "react";
import WebSocketService from "../Services/websocket";

const WebSocketContext = createContext();

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
  const [key, setKey] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [RemoteConnected, setRemoteConnected] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);


  const fetchKey = async () => {
    setloading(true)
    try {
      const newKey = await WebSocketService.getKey();
      connect(newKey);
      setError(null)
    } catch (error) {
      console.error("Failed to fetch key:", error);
      setError("Failed to fetch key: " + error.message);
    }
    setloading(false)
  };
  
  const connect = async (key) => {
    setloading(true)
    try {
      if (await WebSocketService.connect(key)) {
        setKey(key);
        setError(null)
      }
    } catch (error) {
      console.error("Failed to connect to WebSocket:", error);
      setError("Failed to connect to WebSocket: " + error.message);
    }
    setloading(false)
  };
  
  const disconnect = () => {
    WebSocketService.disconnect();
  };

  const sendMessage = (message) => {
    WebSocketService.sendMessage(message);
  };


  useEffect(() => {
    WebSocketService.setMessageHandler((data) => {
        handlerMessage(data)
    });

    return () => {
      WebSocketService.setMessageHandler(null);
    };
  }, [key]);

  const handlerMessage = (data)=>{
    console.log(data)
    switch (data.type) {
        case "connected":
                setRemoteConnected(true)
            break;
        case "disconnected":
             setRemoteConnected(false)
          break;
        case "error":
          setError(data.message)
        default:
            break;
    }
  }

  
  const value = {
    key,
    fetchKey,
    setKey,
    connect,
    disconnect,
    sendMessage,
    receivedMessages,
    RemoteConnected,
    error,loading,setError
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};
