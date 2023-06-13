/** @format */

import PlayerTableau from "@/DesignSystem/Organisms/Players/PlayerTableau";
import { Button, Flex, Space } from "@mantine/core";
import React from "react";
import { createStyles, Paper, Card, Group, Switch, Text, rem, Box, Container } from "@mantine/core";
import { useSport } from "@/Context/SportContext";
import ImageConverter from "./ImageConverter";
import { getPubsId } from "@/Services/Users";
import { useWebSocket } from "@/Context/WebSocketContext";
import useAuth from "@/Utils/Hooks/useAuth";

const ConfirmMatch = ({ recap, prevStep, MatchData,ChangeClubLogo }) => {
  const SportContext = useSport();
 const {user} = useAuth()
 const WebSocketContext = useWebSocket()
  return (
    <Container
      sx={(theme) => ({
        width: "100%",
  
      })}
      fluid
    >
      <Group position="center" my="xl">
        <Button variant="default" type="button" onClick={prevStep}>
          Back
        </Button>

        <Button
      
          onClick={ async () => {
            console.log(user)
           const pubs = await getPubsId(user.userId);
           console.log(pubs)
           WebSocketContext.sendPostMessage("pubs",pubs);
            SportContext.setConfig(recap);
            
          }}
        >
          Creer le Match
        </Button>
      </Group>
      <Flex gap="xl" justify="center">
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          sx={(theme) => ({
            gridArea: "d",
            width: "fit-content",
          })}
        >
          <Flex
            justify="space-between"
            my="xl"
            sx={(theme) => ({
              width: "100%",
            })}
          >
          
            <PlayerTableau ChangeClubLogo={ChangeClubLogo} data={recap.TEAM1} team="TEAM1"></PlayerTableau>
            <PlayerTableau ChangeClubLogo={ChangeClubLogo} data={recap.TEAM2} team="TEAM2"></PlayerTableau>
          </Flex>
        </Paper>
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          sx={(theme) => ({
            gridArea: "d",

            width: "fit-content",
          })}
        >
          <SwitchesCard data={recap.Parameters}></SwitchesCard>
        </Paper>
      </Flex>
    </Container>
  );
};

export default ConfirmMatch;

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    minWidth: "300px",
    height: "100%",
  },

  item: {
    "& + &": {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },
  },

  switch: {
    "& *": {
      cursor: "pointer",
    },
  },

  title: {
    lineHeight: 1,
  },
}));

function SwitchesCard({ data }) {
  const { classes } = useStyles();

  const items = Object.entries(data).map(([key, value]) => (
    <Group position="apart" className={classes.item} noWrap spacing="xl" key={key}>
      <div>
        <Text>{key}</Text>
        <Text size="xs" color="dimmed">
          {value}
        </Text>
      </div>
    </Group>
  ));

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Text fz="lg" className={classes.title} fw={500} mb="xl" weight="600">
        Paramètres
      </Text>
      {items}
    </Card>
  );
}
