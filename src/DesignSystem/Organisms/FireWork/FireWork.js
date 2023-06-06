/** @format */

import { useSport } from "@/Context/SportContext";
import { Fireworks } from "@fireworks-js/react";
import { CountPoints } from "@/Utils/Helpers";
import { Box, Flex, Paper, Title } from "@mantine/core";
import React from "react";
import Points from "@/Components/AppScreen/Points";
export default function FireWork() {
  const [Winner, setWinner] = React.useState(null);
  const SportContext = useSport();

  const teamPoints = CountPoints(SportContext);
  const teamNames = Object.keys(teamPoints);

  React.useEffect(() => {
    if (teamPoints[teamNames[0]] > teamPoints[teamNames[1]]) {
      setWinner(SportContext.Instance.TEAM1);
    } else {
      setWinner(SportContext.Instance.TEAM2);
    }
    console.log(
      teamPoints[teamNames[0]] > teamPoints[teamNames[1]],
      teamPoints[teamNames[0]],
      teamPoints[teamNames[1]],
      SportContext.Instance
    );
  }, []);

  return (
    <>
      <Fireworks
      options={{
        rocketsPoint: {
          min: 50,
          max: 50
        },
        brightness:{min:50,max:100},
        intensity:60,
        hue:{min:0,max:345},
        delay:{min:10.00,max:10.00},
      }}
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'fixed',
        background: '#000',
        zIndex:1
      }}
    />
      {Winner && (
        <Box
          sx={(theme) => ({
            zIndex: 2,
            position: "fixed",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <Paper
            withBorder
            shadow="md"
            radius="md"
            sx={(theme) => ({
              width: "40%",
              height:"70%",
              position: "relative",
            })}
          >
            <Box
              component="img"
              src={Winner.club.clubLogo}
              sx={(theme) => ({
                width: "100%",
                height: "60%",
                objectFit: "cover",
                position: "relative",
              })}
            ></Box>
            <Flex justify="center" align="center" direction="column">
              <Points/>
            </Flex>
          </Paper>
        </Box>
      )}
    </>
  );
}
