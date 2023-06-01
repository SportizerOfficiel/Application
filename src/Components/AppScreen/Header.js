/** @format */

import { useSport } from "@/Context/SportContext";
import { Flex, Text, Box, Paper } from "@mantine/core";
import React from "react";
import { CountPoints } from "@/Utils/Helpers";
import TimerScreen from "./TimerScreen";

const Header = () => {
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
      <Flex
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          textTransform: "capitalize",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <Box
          sx={(theme) => ({
            width: "100%",
            height: "100%",
            background: `url("${SportContext.Instance.TEAM1.club.clubLogo}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}
        ></Box>
  
      </Flex>
       <TimerScreen/>
      <Flex
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          textTransform: "capitalize",
        })}
      >

        <Box
          sx={(theme) => ({
            width: "100%",
            height: "200px",
            background: `url("${SportContext.Instance.TEAM2.club.clubLogo}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
       
          })}
        ></Box>
      </Flex>
    </Flex>
  );
};

export default Header;

