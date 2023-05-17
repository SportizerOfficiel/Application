/** @format */

// services/SportContext.js
import { createContext, useContext, useState, useEffect } from "react";

const SportContext = createContext();

export const useSport = () => {
  return useContext(SportContext);
};

export const SportProvider = ({ children }) => {
  const [Config, setConfig] = useState({});


  const value = {
    Config, setConfig
  };

  return <SportContext.Provider value={value}>{children}</SportContext.Provider>;
};
