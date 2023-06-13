/** @format */

import React from "react";
import PlayerForm from "@/DesignSystem/Organisms/Players/PlayerForm";

import { Stepper, Button, Group, Container, Flex, Box } from "@mantine/core";
import { useSport } from "@/Context/SportContext";
import useForm from "@/Utils/Hooks/useForm";
import PlayerList from "./PlayerList";
import SportConfig from "@/SportConfig";
import MatchConfigGenerator from "./MatchConfigGenerator";
import ConfirmMatch from "./ConfirmMatch";

const RemoteGenerator = () => {
  const SportContext = useSport();
  const [active, setActive] = React.useState(0);
  const [MatchData, setMatchData] = React.useState({});
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [Parameters, HandleSubmit3, resetForm3] = useForm((data) => {

    setMatchData({ ...MatchData, Parameters: data });
    nextStep();
  });
  const [PlayerList1, HandleSubmit1, resetForm1] = useForm((data) => {

    const Team = FiltreTeam(data);
    setMatchData({ ...MatchData, TEAM1: Team });
    nextStep();
  });
  const [PlayerList2, HandleSubmit2, resetForm2] = useForm((data) => {

    const Team = FiltreTeam(data);
    setMatchData({ ...MatchData, TEAM2: Team });
    nextStep();
  });

  const ActiveList = (number) => {
    setActive(number);
  };

  const ChangeClubLogo = (team, url) => {
    const updatedMatchData = { ...MatchData };
    updatedMatchData[team].club.clubLogo = url;
    setMatchData(updatedMatchData);
  };
  

  return (
    <Flex
      justify="center"
      align="center"
      sx={(theme) => ({
        width: "100%",
        height: "100%",
      })}
    >
      {active === 3 && (
        <ConfirmMatch ChangeClubLogo={ChangeClubLogo} recap={MatchData} prevStep={prevStep}></ConfirmMatch>
      )}

      <Container sx={(theme) => ({})}>
        <Box
          sx={(theme) => ({
            display: active === 0 ? "block" : "none",
          })}
        >
          <form ref={Parameters} onSubmit={HandleSubmit3}>
            <MatchConfigGenerator prevStep={prevStep}></MatchConfigGenerator>
          </form>
        </Box>
        <Box
          sx={(theme) => ({
            display: active === 1 ? "block" : "none",
          })}
        >
          <form ref={PlayerList1} onSubmit={HandleSubmit1}>
            <PlayerList
              PlayerList={SportContext.getSportConfig().PlayerList}
              recap={MatchData}
              key="TEAM1"
              team="TEAM1"
              clublabel="Nom d'équipe 1"
              prevStep={prevStep}
            ></PlayerList>
          </form>
        </Box>
        <Box
          sx={(theme) => ({
            display: active === 2 ? "block" : "none",
          })}
        >
          <form ref={PlayerList2} onSubmit={HandleSubmit2}>
            <PlayerList
              PlayerList={SportContext.getSportConfig().PlayerList}
              key="TEAM2"
              recap={MatchData}
              team="TEAM2"
              clublabel="Nom d'équipe 2"
              prevStep={prevStep}
            ></PlayerList>
          </form>
        </Box>
      </Container>
    </Flex>
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
        const idClubKey = key.replace("Titulaire ", "").replace("id_", "") + "_idclub";
        const baseNumberKey = key.replace("Titulaire ", "").replace("id_", "") + "_basenumber";
        const name = data[nameKey];
        const number = data[numberKey];
        const idclub = data[idClubKey];
        const baseNumber = data[baseNumberKey];
        if (playerId && name && number) {
          titulaires.push({ playerId, name, number ,idclub,sub:false,baseNumber});
        }
      } else if (key.startsWith("Remplacant")) {
        const playerId = data[key];
        const nameKey = key.replace("Remplacant ", "").replace("id_", "") + "_name";
        const numberKey = key.replace("Remplacant ", "").replace("id_", "") + "_number";
        const idClubKey = key.replace("Remplacant ", "").replace("id_", "") + "_idclub";
        const baseNumberKey = key.replace("Remplacant ", "").replace("id_", "") + "_basenumber";
        const name = data[nameKey];
        const number = data[numberKey];
        const idclub = data[idClubKey];
        const baseNumber = data[baseNumberKey];
        if (playerId && name && number) {
          remplacants.push({ playerId, name, number,idclub,sub:true,baseNumber });
        }
      } else if (key.startsWith("Club")) {
        const clubId = data[key];
        if (clubId) {
          let clubLogo = "";
          const clubLogoKey = "Club Logo_" + clubId;
          const clubNameKey = key.replace("Club ", "").replace("id_", "") + "_name";

          if (data[clubLogoKey]) clubLogo = data[clubLogoKey];
          const clubName = data[clubNameKey];

          if (clubId.startsWith("%NEW%=")) {
            const newClubId = clubId.replace("%NEW%=", "");
            const isNewClub = true;
            club = { id: newClubId, name: clubName, new: isNewClub, clubLogo };
          } else {
            club = { id: clubId, name: clubName, clubLogo };
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

  return { titulaires, remplacants, club, newPlayers };
};

export default RemoteGenerator;
