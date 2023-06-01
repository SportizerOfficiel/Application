/** @format */

import { useSport } from "@/Context/SportContext";
import { Flex, Text, Box, Paper } from "@mantine/core";
import React from "react";
import { CountFaults } from "@/Utils/Helpers";
import TimerScreen from "./TimerScreen";

const Faults = () => {
  const SportContext = useSport();
  const teamPoints = CountFaults(SportContext);
  const teamNames = Object.keys(teamPoints);

  return (
    <Flex
      gap="xl"
      justify="center"
      align="center"
      sx={(theme) => ({
        width: "100%",

        textTransform: "capitalize",
        position: "relative",
      })}
    >
      <Box
        sx={(theme) => ({
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <Text
          weight="600"
          sx={(theme) => ({
            textAlign: "center",
            fontSize: "6vw",
          })}
        >
          {teamPoints[teamNames[0]]}
        </Text>
      </Box>

      <Flex
        sx={(theme) => ({
          textTransform: "capitalize",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <Text
          weight="600"
          sx={(theme) => ({
            textAlign: "center",
            fontSize: "2vw",
          })}
        >
          Faults
        </Text>
      </Flex>

      <Box
        sx={(theme) => ({
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <Text
          weight="600"
          sx={(theme) => ({
            textAlign: "center",
            fontSize: "6vw",
          })}
        >
          {teamPoints[teamNames[1]]}
        </Text>
      </Box>
    </Flex>
  );
};

export default Faults;
