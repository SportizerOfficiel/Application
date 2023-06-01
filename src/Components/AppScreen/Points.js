/** @format */

import { useSport } from "@/Context/SportContext";
import { Flex, Text, Box, Paper } from "@mantine/core";
import React from "react";
import { CountPoints } from "@/Utils/Helpers";
import TimerScreen from "./TimerScreen";

const Points = () => {
  const SportContext = useSport();
  const teamPoints = CountPoints(SportContext);
  const teamNames = Object.keys(teamPoints);

  return (
    <Flex
      sx={(theme) => ({
        width: "100%",
        height: "200px",
        textTransform: "capitalize",
        position: "relative",
      })}
    >
      <Box
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        })}
      >
        <Text
          weight="600"
          sx={(theme) => ({
            textAlign: "center",
            fontSize: "9vw",
            lineHeight:"10vw"
          })}
        >
          {teamPoints[teamNames[0]]}
        </Text>
        <Text transform="uppercase" weight="600" >
          {SportContext.Instance.TEAM1.club.name}
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
            fontSize: "9vw",
          })}
        >
          -
        </Text>
      </Flex>

      <Box
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        })}
      >
        <Text
          weight="600"
          sx={(theme) => ({
            textAlign: "center",
            fontSize: "9vw",
            lineHeight:"10vw"
          })}
        >
          {teamPoints[teamNames[1]]}
        </Text>
        <Text transform="uppercase" weight="600" >
          {SportContext.Instance.TEAM2.club.name}
        </Text>
      </Box>
    </Flex>
  );
};

export default Points;
