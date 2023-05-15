// components/Game.js
import { useWebSocket } from "@/Context/WebSocketContext";
import React, { useState, useEffect } from "react";

const Screen = () => {
  const { key, fetchKey ,RemoteConnected} = useWebSocket();

  useEffect(() => {
    if(!RemoteConnected)
    fetchKey();
  }, [RemoteConnected]);

  if (RemoteConnected) {
    return (
      <div>
        <h2>Chat Interface</h2>
        {/* Your chat interface code here */}
      </div>
    );
  }

  return (
    <div>
      <p>Key: {key}</p>
      <p>Waiting for the second user to connect...</p>
    </div>
  );
};

export default Screen;
