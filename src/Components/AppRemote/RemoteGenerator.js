/** @format */

import React from "react";
import PlayerForm from "@/DesignSystem/Organisms/Players/PlayerForm";

import { Stepper, Button, Group, Container, Flex, Box } from "@mantine/core";
import { useSport } from "@/Context/SportContext";
import useForm from "@/Utils/Hooks/useForm";
import PlayerList from "./PlayerList";
import SportConfig from "@/SportConfig";
import MatchConfigGenerator from "./MatchConfigGenerator";

const RemoteGenerator = ({ Sport }) => {
  const [active, setActive] = React.useState(0);
  const [MatchData, setMatchData] = React.useState({});
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  React.useEffect(() => {
    console.log(MatchData);
  }, [MatchData]);

  const [PlayerList1, HandleSubmit1, resetForm1] = useForm((data) => {
    nextStep();
    const Team = FiltreTeam(data);
    setMatchData({ ...MatchData, TEAM1: Team });
  });
  const [PlayerList2, HandleSubmit2, resetForm2] = useForm((data) => {
    nextStep();
    const Team = FiltreTeam(data);
    setMatchData({ ...MatchData, TEAM2: Team });
  });
  const ActiveList = (number) => {
    if (number === 1) {
      HandleSubmit1();
    }
    if (number === 2) {
      HandleSubmit2();
    }
    setActive(number);
  };
  return (
    <Container sx={(theme) => ({})}>
      <Stepper active={active} onStepClick={(e) => ActiveList(e)} breakpoint="sm">
        <Stepper.Step label="Parametres" description=""></Stepper.Step>
        <Stepper.Step label="Team 1" description=""></Stepper.Step>
        <Stepper.Step label="Team 2" description=""></Stepper.Step>
      </Stepper>
      <Box
        sx={(theme) => ({
          display: active === 0 ? "block" : "none",
        })}
      >
        <MatchConfigGenerator sport={SportConfig[Sport]}></MatchConfigGenerator>
      </Box>
      <Box
        sx={(theme) => ({
          display: active === 1 ? "block" : "none",
        })}
      >
        <form ref={PlayerList1} onSubmit={HandleSubmit1}>
          <PlayerList PlayerList={SportConfig[Sport].PlayerList} key="team1"></PlayerList>
        </form>
      </Box>
      <Box
        sx={(theme) => ({
          display: active === 2 ? "block" : "none",
        })}
      >
        <form ref={PlayerList2} onSubmit={HandleSubmit2}>
          <PlayerList PlayerList={SportConfig[Sport].PlayerList} key="team2"></PlayerList>
        </form>
      </Box>
    </Container>
  );
};
const FiltreTeam = (data) => {
  const titulaires = [];
  const remplacants = [];
  const newPlayers = [];
  let club = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (key.startsWith("Titulaire")) {
        const playerId = data[key];
        const nameKey = key.replace("Titulaire ", "").replace("id_", "") + "_name";
        const numberKey = key.replace("Titulaire ", "").replace("id_", "") + "_number";
        const name = data[nameKey];
        const number = data[numberKey];

        if (playerId && name && number) {
          titulaires.push({ playerId, name, number });
        }
      } else if (key.startsWith("Remplacant")) {
        const playerId = data[key];
        const nameKey = key.replace("Remplacant ", "").replace("id_", "") + "_name";
        const numberKey = key.replace("Remplacant ", "").replace("id_", "") + "_number";
        const name = data[nameKey];
        const number = data[numberKey];

        if (playerId && name && number) {
          remplacants.push({ playerId, name, number });
        }
      } else if (key.startsWith("Club")) {
        const clubId = data[key];
        if (clubId) {
          const clubNameKey = key.replace("Club ", "").replace("id_", "") + "_name";
          const clubName = data[clubNameKey];

          if (clubId.startsWith("%NEW%=")) {
            const newClubId = clubId.replace("%NEW%=", "");
            const isNewClub = true;
            club = { id: newClubId, name: clubName, new: isNewClub };
          } else {
            club = { id: clubId, name: clubName };
          }
        }
      }
    }
  }

  for (const joueur of [...titulaires, ...remplacants]) {
    if (joueur.playerId.startsWith("%NEW%=")) {
      const newPlayerId = joueur.playerId.replace("%NEW%=", "");
      const playerName = joueur.name;
      const playerNumber = joueur.number;
      const isNewPlayer = true;
      newPlayers.push({ playerId: newPlayerId, name: playerName, number: playerNumber, new: isNewPlayer });
    }
  }

  console.log("Titulaires :", titulaires);
  console.log("Remplaçants :", remplacants);
  console.log("Club :", club);
  console.log("Nouveaux joueurs :", newPlayers);

  return { titulaires, remplacants, club, newPlayers };
};

export default RemoteGenerator;
