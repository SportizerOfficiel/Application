/** @format */

import React from "react";
import PlayerForm from "@/DesignSystem/Organisms/Players/PlayerForm";

import { Stepper, Button, Group, Container, Flex, Space, Paper } from "@mantine/core";
import { useSport } from "@/Context/SportContext";
import useForm from "@/Utils/Hooks/useForm";
import ClubAutoComplete from "./ClubAutoComplete";

const PlayerList = ({ PlayerList, action = () => {}, clublabel = "", prevStep }) => {
  const [regularPlayers, setRegularPlayers] = React.useState([]);
  const [substitutePlayers, setSubstitutePlayers] = React.useState([]);

  return (
    <Container
      sx={(theme) => ({
        paddingBottom: "10%",
      })}
    >
      <Group
        position="center"
        my="xl"
     
      >
        <Button variant="default" type="button" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit">Next step</Button>
      </Group>
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
      <Flex align="center" direction="column">
        <ClubAutoComplete
          setPlayers={setRegularPlayers}
          setSubPlayers={setSubstitutePlayers}
          clublabel={clublabel}
        ></ClubAutoComplete>
      </Flex>
      <Space my="xl"></Space>
      <Space my="xl"></Space>
      <Flex>
        <PlayerForm label="Titulaire" numberPlayer={PlayerList.PlayerPerTeam} DATAPlayers={regularPlayers}></PlayerForm>
        <PlayerForm
          label="Remplacant"
          numberPlayer={PlayerList.SubPlayerPerTeam}
          DATAPlayers={substitutePlayers}
        ></PlayerForm>
      </Flex>
      </Paper>
    </Container>
  );
};

export default PlayerList;

const SportConfig = {
  Basket: {
    PlayerPerTeam: 5,
    SubPlayerPerTeam: 5,
  },
};
