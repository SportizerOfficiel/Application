/** @format */

import { Button, Flex, Title, Box, Text } from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";
import { modals } from "@mantine/modals";
import { TimeInput } from "@mantine/dates";
import { useSport } from "@/Context/SportContext";
import { useTimer } from "@/Context/TimerContext";

const TimerScreen = () => {
  const {
    formatTime,
    timex,
    pauseTimex,
    isPausex,
    addedTimex,
    nextPausex,
    isTimeOut,
    timeOutTimex
  } = useTimer();
  return (
    <Box
      shadow="xl"
      sx={(theme) => ({
 
        width:"100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex:2,
        borderBottomLeftRadius: theme.radius.md,
        borderBottomRightRadius: theme.radius.md,
        boxShadow: theme.shadows.xl,
      })}
    >
      {!isPausex.current && !isTimeOut.current && (
        <Text
          weight="600"
          style={{
            color:
              timex.current <= nextPausex.current + addedTimex.current && timex.current >= nextPausex.current
                ? "red"
                : "white",
          }}
          sx={(theme) => ({
            fontSize: "8vw",
          })}
        >
       {formatTime(timex.current)}
        </Text>
      )}
       {isTimeOut.current && (
        <Text
          weight="600"
          style={{
            color:"violet"
          }}
          sx={(theme) => ({
            fontSize: "8vw",
          })}
        >
       {formatTime(timeOutTimex.current)}
        </Text>
      )}
      {isPausex.current && (
        <Text
          weight="600"
          sx={(theme) => ({
            fontSize: "8vw",
            color: theme.colors.brand[2],
          })}
        >
          {formatTime(pauseTimex.current)}
        </Text>
      )}
      {addedTimex.current > 0 && (
        <Box
          sx={(theme) => ({
            position: "absolute",
            color: "red",
            top: theme.spacing.md,
            right: theme.spacing.xl,
          })}
        >
          + {formatTime(addedTimex.current)}
        </Box>
      )}
    </Box>
  );
};

/* {isPausex.current && <p>Pause Time: {formatTime(pauseTimex.current)}</p>}
      <p>Added Time: {formatTime(addedTimex.current)}</p>
      <Button size="xl" onClick={resetTimer}>Reset</Button>
      {!isRunning && <Button size="xl" onClick={startTimer}>Start</Button>}
      {isRunning && <Button color="red" size="xl" onClick={pauseTimer}>Temps Mort</Button>}
      <Button size="xl" >Buzzer</Button>
      <Button size="xl" onClick={() => openDeleteModal()}>Temps additionnel</Button> */
export default TimerScreen;
