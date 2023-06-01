/** @format */

// services/WebSocketContext.js
import { createContext, useContext, useState, useEffect } from "react";
import webSocketServiceInstance from "../Services/websocket";
import WebSocketService from "../Services/websocket";

const WebSocketContext = createContext();

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
  const [key, setKey] = useState("");
  const [Init, setInit] = useState(false);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [RemoteConnected, setRemoteConnected] = useState(false);
  const [error, setError] = useState(null);
  const [payload, setpayload] = useState(null);
  const [timerpayload, settimerpayload] = useState(null);
  const [loading, setloading] = useState(false);
  const [IsScreen, setIsScreen] = useState(false);
  const [ShowWin, setShowWin] = useState(false);

  const fetchKey = async () => {
    setloading(true);
    try {
      const newKey = await WebSocketService.getKey();
      connect(newKey);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch key:", error);
      setError("Failed to fetch key: " + error.message);
    }
    setloading(false);
  };

  const connect = async (key) => {
    setloading(true);
    try {
      if (await WebSocketService.connect(key)) {
        setKey(key);
        setError(null);
      }
    } catch (error) {
      console.error("Failed to connect to WebSocket:", error);
      setError("Failed to connect to WebSocket: " + error.message);
    }
    setloading(false);
  };

  const disconnect = () => {
    WebSocketService.disconnect();
    setRemoteConnected(false);
  };

  const sendPostMessage = (type, message) => {
    WebSocketService.sendPostMessage(key, type, message);
  };

  useEffect(() => {
    WebSocketService.setMessageHandler((data) => {
      handlerMessage(data);
    });

    return () => {
      WebSocketService.setMessageHandler(null);
    };
  }, [key]);

  const handlerMessage = (data) => {
    console.log(data.type, "GET WEBSOCKET CALL");
    switch (data.type) {
      case "connected":
        setRemoteConnected(true);
        break;
      case "disconnected":
        reset();
        break;
      case "error":
        setError(data.message);
        break;
      case "instance":
        setpayload({ ...data.message });
        break;
      case "timer":
        settimerpayload({ ...data.message });
        break;
      case "ShowWin":
        setShowWin(true);
        break;
      default:
        break;
    }
  };
  const reset = () => {
    if (!IsScreen) webSocketServiceInstance.sendMessage({ type: "disconnected" });

    webSocketServiceInstance.disconnect();
    setKey("");
    setReceivedMessages([]);
    setRemoteConnected(false);
    setError(null);
    setpayload(null);
    settimerpayload(null);
    setloading(false);
    setShowWin(false)
  };

  const value = {
    key,
    fetchKey,
    setKey,
    connect,
    disconnect,
    sendPostMessage,
    settimerpayload,
    receivedMessages,
    RemoteConnected,
    error,
    loading,
    setError,
    payload,
    timerpayload,
    IsScreen,
    setIsScreen,
    reset,
    Init,
    setInit,
    ShowWin
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};
