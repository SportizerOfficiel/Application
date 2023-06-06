/** @format */

// components/Game.js
import BasketBallScreen from "@/Components/AppScreen/BasketBallScreen";
import Header from "@/Components/AppScreen/Header";
import Pub from "@/Components/AppScreen/PubScreen";
import WaitingInstance from "@/Components/AppScreen/WaitingInstance";
import { useSport } from "@/Context/SportContext";
import { useTimer } from "@/Context/TimerContext";
import { useWebSocket } from "@/Context/WebSocketContext";
import Firework from "@/DesignSystem/Organisms/FireWork/FireWork";
import { Flex, Text, Box, Button } from "@mantine/core";
import React, { useState, useEffect } from "react";

const Screen = () => {
  const SportContext = useSport();
  const { key, fetchKey, RemoteConnected, setIsScreen, setInit, Init, ShowWin } = useWebSocket();
  const { isPausex, isTimeOut,isRunning } = useTimer();
  useEffect(() => {
    setIsScreen(true);
    if (!RemoteConnected) fetchKey();
  }, [RemoteConnected]);

  const videos = [
    "dQw4w9WgXcQ",
    "ZsBxbY4LZbo" 
  ];
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        height: "100vh",

        background: "black",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundClip: "",
        color: "#FFF",
      })}
    >
      {!Init && (
        <Flex
          justify="center"
          direction="column"
          align="center"
          sx={(theme) => ({
            width: "100%",
            height: "100%",
            textTransform: "capitalize",
          })}
        >
          <Button
            onClick={() => setInit(true)}
            p={30}
            sx={(theme) => ({
              minWidth: "20vw",
              minHeight: "20vh",
              textTransform: "uppercase",
              fontSize: "10vw",
            })}
          >
            Init Sportizer
          </Button>
        </Flex>
      )}
      {Init && !RemoteConnected && !SportContext.Instance && !ShowWin && (
        <Flex
          justify="center"
          direction="column"
          align="center"
          sx={(theme) => ({
            width: "100%",
            height: "100%",
            textTransform: "capitalize",
          })}
        >
          <Text size="20vw">{key}</Text>
          <Text size="2vw">Waiting for the remote to connect...</Text>
        </Flex>
      )}
      {Init && RemoteConnected && !SportContext.Instance && !ShowWin && <WaitingInstance></WaitingInstance>}
      {Init && RemoteConnected && SportContext.Instance && !isPausex.current && !isTimeOut.current && !ShowWin && (
        <Flex
          direction="column"
          sx={(theme) => ({
            width: "100%",
            height: "100%",
            textTransform: "capitalize",
          })}
        >
          <BasketBallScreen />
        </Flex>
      )}
      {Init && RemoteConnected && SportContext.Instance  && !ShowWin && isRunning && (isPausex.current || isTimeOut.current)  && (
        <Pub videos={videos} />
      )}
      {ShowWin && <Firework />}
    </Box>
  );
};

export default Screen;
