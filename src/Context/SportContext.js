/** @format */

// services/SportContext.js
import SportConfig from "@/SportConfig";
import { modals } from "@mantine/modals";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useWebSocket } from "./WebSocketContext";
const SportContext = createContext();

export const useSport = () => {
  return useContext(SportContext);
};

export const SportProvider = ({ children }) => {
  const WebSocketContext = useWebSocket();
  const [Config, setConfig] = useState();
  const [Instance, setInstance] = useState();
  const [Sport, setSport] = useState("");


  const getSportConfig = () => {
    return SportConfig[Sport];
  };

  React.useEffect(() => {
    setInstance(Config);
    WebSocketContext.sendPostMessage("instance", { Sport, Config });
  }, [Config]);



  React.useEffect(() => {
    if (WebSocketContext.payload?.Sport) {
      setInstance(WebSocketContext.payload?.Config || null);
      setSport(WebSocketContext.payload?.Sport || "");
    } else {
      setInstance(WebSocketContext.payload);
    }
  }, [WebSocketContext.payload]);

  React.useEffect(() => {
    if (WebSocketContext.RemoteConnected) return;
    setConfig();
    setInstance();
    setSport("");
  }, [WebSocketContext.RemoteConnected]);

  const reset = () => {
    setConfig(null);
    setInstance(null);
    setSport("");
  };
  const value = {
    Config,
    setConfig,
    Sport,
    setSport,
    getSportConfig,
    Instance,
    setInstance,
    reset
  };

  return <SportContext.Provider value={value}>{children}</SportContext.Provider>;
};
