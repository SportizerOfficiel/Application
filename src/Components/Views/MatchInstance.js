/** @format */

import { useSport } from "@/Context/SportContext";
import PlayerMatch from "@/DesignSystem/Organisms/Players/PlayerMatch";
import { Flex, Title, Button, Container, Box, ScrollArea, Paper, Image, Avatar, Text } from "@mantine/core";
import React from "react";
import PlayerTableauMatch from "@/DesignSystem/Organisms/Players/PlayerTableauMatch";
import { useTimer } from "@/Context/TimerContext";
import { modals } from "@mantine/modals";
import {CountPoints} from "@/Utils/Helpers";
const MatchInstance = () => {
  const SportContext = useSport();
 const teamPoints = CountPoints(SportContext)
  const teamNames = Object.keys(teamPoints);

  return (
    <Box
      sx={(theme) => ({
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto auto auto",
        gridTemplateAreas: ` 
        "a b"
        "f e"
        "c d"
        "c d"`,
        gap: theme.spacing.sm,
        width: "100%"
      })}
      pb="xl"
    >
      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        sx={(theme) => ({
          gridArea: "a",
          height: "fit-content",
          width: "100%",
          position: "relative",
        })}
      >
        {/* <Flex direction="column">
        <Text size="xl" weight="600" mt="xs">
          Category: {SportContext.Config.Parameters.Category}
        </Text>
        <Text size="xl" weight="600" mt="xs">
          Division: {SportContext.Config.Parameters.Division}
        </Text>
        <Text size="xl" weight="600" mt="xs">
          Durée: {SportContext.Config.Parameters.GameDuration}
        </Text>
      </Flex> */}
        <Flex gap="xl" justify="center">
          <Flex direction="column" justify="center" align="center">
            <Avatar size="xl" src={SportContext.Instance.TEAM1.club.clubLogo}></Avatar>
            <Text transform="uppercase" weight="600" mt="xs">
              {SportContext.Instance.TEAM1.club.name}
            </Text>
          </Flex>
          <Flex justify="center" align="center" mb="xl">
            <Text
              weight="600"
              sx={(theme) => ({
                textAlign: "center",
                fontSize: "3rem",
                width: "100%",
              })}
            >
              {teamPoints[teamNames[0]]}
            </Text>
            <Text
              weight="600"
              sx={(theme) => ({
                textAlign: "center",
                fontSize: "3rem",
                width: "100%",
              })}
            >
              -
            </Text>
            <Text
              weight="600"
              sx={(theme) => ({
                textAlign: "center",
                fontSize: "3rem",
                width: "100%",
              })}
            >
              {teamPoints[teamNames[1]]}
            </Text>
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Avatar size="xl" src={SportContext.Instance.TEAM2.club.clubLogo}></Avatar>
            <Text transform="uppercase" weight="600" mt="xs">
              {SportContext.Instance.TEAM2.club.name}
            </Text>
          </Flex>
        </Flex>
      </Paper>
      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        sx={(theme) => ({
          gridArea: "b",
          position: "relative",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <Timer></Timer>
      </Paper>
      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        sx={(theme) => ({
          gridArea: "e",
          position: "relative",
          height: "100%",
        })}
      >
        <TimerControls></TimerControls>
      </Paper>
      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        sx={(theme) => ({
          gridArea: "f",
          position: "relative",
          height: "100%",
        })}
      >
        <Controls></Controls>
      </Paper>
      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        sx={(theme) => ({
          gridArea: "c",
          position: "relative",
          height: "100%",
          width: "100%",
        })}
      >
        <PlayerTableauMatch team={"TEAM1"}></PlayerTableauMatch>
      </Paper>
      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        sx={(theme) => ({
          gridArea: "d",
          height: "fit-content",
          width: "100%",
        })}
      >
        <PlayerTableauMatch team={"TEAM2"}></PlayerTableauMatch>
      </Paper>
    
    </Box>
  );
};

// Timer.js

const Timer = () => {
  const {
    time,
    startTimer,
    pauseTimer,
    resetTimer,
    addTime,
    formatTime,
    isRunning,
    timex,
    pauseTimex,
    isPausex,
    addedTimex,
    nextPausex,
  } = useTimer();

  // Here you can use your timer context functions and state as you normally would in your component
  // Rest of your component logic ...

  return (
    <Flex direction="column" px="xl" gap="xl">
      {!isPausex.current && (
        <Title
          order={1}
          style={{
            color:
              timex.current <= nextPausex.current + addedTimex.current && timex.current >= nextPausex.current
                ? "red"
                : "black",
          }}
          sx={(theme) => ({
            textAlign: "center",
            fontSize: "4rem",
            width: "100%",
          })}
        >
          {formatTime(timex.current)}
        </Title>
      )}
      {isPausex.current && (
        <Title
          order={1}
          sx={(theme) => ({
            textAlign: "center",
            fontSize: "4rem",
            width: "100%",
            color: theme.colors.blue[9],
          })}
        >
          {formatTime(pauseTimex.current)}
        </Title>
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
    </Flex>
  );
};

const TimerControls = () => {
  const {
    time,
    startTimer,
    pauseTimer,
    resetTimer,
    addTime,
    formatTime,
    isRunning,
    timex,
    pauseTimex,
    isPausex,
    addedTimex,
    nextPausex,
  } = useTimer();

  // Here you can use your timer context functions and state as you normally would in your component
  // Rest of your component logic ...

  return (
    <Box>
      <Flex px="xl" gap="xl" justify="space-around" align="center">
        <Button size="md" onClick={resetTimer}>
          Reset
        </Button>
        {!isRunning && (
          <Button size="md" onClick={startTimer}>
            Start
          </Button>
        )}
        {isRunning && (
          <Button color="red" size="md" onClick={pauseTimer}>
            Pause
          </Button>
        )}

      </Flex>
    </Box>
  );
};

const Controls = () => {
  const {
    time,
    startTimer,
    pauseTimer,
    resetTimer,
    addTime,
    formatTime,
    isRunning,
    timex,
    pauseTimex,
    isPausex,
    addedTimex,
    nextPausex,
  } = useTimer();

  // Here you can use your timer context functions and state as you normally would in your component
  // Rest of your component logic ...

  return (
    <Box>
        <Flex px="xl" gap="xl" justify="space-around" align="center">
  
      </Flex>
    </Box>
  );
};

export default MatchInstance;
