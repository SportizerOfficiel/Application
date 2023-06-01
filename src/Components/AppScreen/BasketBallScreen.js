/** @format */

import { useSport } from "@/Context/SportContext";
import { useTimer } from "@/Context/TimerContext";
import DynamicFontSize from "@/DesignSystem/Atoms/DynamicFontSize";
import { Box, Flex, Text, Paper } from "@mantine/core";
import React from "react";
import Faults from "./Faults";
import Points from "./Points";
import TimerScreen from "./TimerScreen";

const BasketBallScreen = () => {
  const SportContext = useSport();

  return (
    <Box
      sx={(theme) => ({
        display: "grid",
        gridTemplateColumns: "2fr 1fr 2fr",

        gridTemplateAreas: ` 
    "a e c"
    "a f c"
    "a d c"
    "a b c"`,
        gap: theme.spacing.sm,
        width: "100vw",
        maxHeight: "100vh",
        padding: theme.spacing.xs,
      })}
    >
      <Paper
        withBorder
        shadow="md"
        radius="md"
        sx={(theme) => ({
          gridArea: "a",
          height: "100%",
          width: "100%",
          position: "relative",
        })}
      >
        <Box
          sx={(theme) => ({
            width: "100%",
            height: "20vh",
            background: `url("${SportContext.Instance.TEAM1.club.clubLogo}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}
        ></Box>
        <Flex
          direction="column"
          sx={(theme) => ({
            width: "100%",
          
          })}
          p={20}
        >
          {SportContext.Instance.TEAM1.titulaires.map((player) => {
            return <PlayerRow player={player} />;
          })}
        </Flex>
      </Paper>

      <Paper
        withBorder
        shadow="md"
        p={20}
        radius="md"
        sx={(theme) => ({
          gridArea: "b",
          height: "fit-content",
          width: "100%",
          position: "relative",
        })}
      >
        <Faults />
      </Paper>
      <Paper
        withBorder
        shadow="md"
        p={20}
        radius="md"
        sx={(theme) => ({
          gridArea: "f",
          height: "fit-content",
          width: "100%",
          position: "relative",
        })}
      >
        <Points />
      </Paper>
      <Paper
        withBorder
        shadow="md"
        p={20}
        radius="md"
        sx={(theme) => ({
          gridArea: "d",
          height: "fit-content",
          width: "100%",
          position: "relative",
        })}
      >
        <PeriodInfos />
      </Paper>
      <Paper
        withBorder
        shadow="md"
        radius="md"
        sx={(theme) => ({
          gridArea: "c",
          height: "100%",
          width: "100%",
          position: "relative",
        })}
      >
        <Box
          sx={(theme) => ({
            width: "100%",
            height: "20vh",
            background: `url("${SportContext.Instance.TEAM2.club.clubLogo}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}
        ></Box>
        <Flex
          direction="column"
          sx={(theme) => ({
            width: "100%",
     
          })}
          p={20}
        >
          {SportContext.Instance.TEAM2.titulaires.map((player) => {
            return <PlayerRow player={player} right={true} />;
          })}
        </Flex>
      </Paper>
      <Paper
        withBorder
        shadow="md"
        p={20}
        radius="md"
        sx={(theme) => ({
          gridArea: "e",
          height: "fit-content",
          width: "100%",
          minWidth:"30vw",
          position: "relative",
        })}
      >
        <TimerScreen />
      </Paper>
    </Box>
  );
};

const CumulateFaultsBasketBall = ({ maxFaults, faults }) => {
  const elements = [];

  for (let i = 0; i < maxFaults; i++) {
    if (i < faults) {
      elements.push(
        <Box
          key={i}
          sx={(theme) => ({
            height: "1rem",
            width: "1rem",
            background: theme.colors.red[6],
            borderRadius: "100%",
            border: `1px solid ${theme.colors.dark[9]}`,
          })}
        ></Box>
      );
    } else {
      elements.push(
        <Box
          key={i}
          sx={(theme) => ({
            height: "1rem",
            width: "1rem",
            borderRadius: "100%",
            background: theme.colors.gray[0],
            border: `1px solid ${theme.colors.dark[9]}`,
          })}
        ></Box>
      );
    }
  }

  return elements;
};

const PlayerRow = ({ player, right = false }) => {
  const SportContext = useSport();

  return (
    <Flex direction="column">
      <Flex sx={(theme) => ({})} gap="md" direction={right ? "row-reverse" : "row"} justify="flex-end">
        <Box>
          <Text
            weight="600"
            sx={(theme) => ({
              fontSize: "1.7vw",
              textAlign: right ? "stard" : "end",
              textTransform: "uppercase",
              color: theme.colors.gray[0],
            })}
          >
            {player.name}
          </Text>

          <Flex gap="sm" justify={right ? "flex-start" : "flex-end"}>
            {CumulateFaultsBasketBall({
              maxFaults: SportContext.getSportConfig()?.PlayerSettings?.maxFaults,
              faults: player?.action?.faults?.length || 0,
            })}
          </Flex>
        </Box>

        <Text
          weight="600"
          sx={(theme) => ({
            fontSize: "3vw",
            color: theme.colors.gray[6],
            textTransform: "uppercase",
          })}
        >
          {player.number < 10 ? "0" : ""}
          {player.number}
        </Text>
      </Flex>
    </Flex>
  );
};
const PeriodInfos = () => {
  const { periodCount } = useTimer();

  return (
    <Flex justify="center" align="center">
      <Text
        weight="600"
        sx={(theme) => ({
          textAlign: "center",
          fontSize: "5vw",
          color: theme.colors.gray[0],
          textTransform: "uppercase",
        })}
      >
        {periodCount.current}
      </Text>
    </Flex>
  );
};

export default BasketBallScreen;
