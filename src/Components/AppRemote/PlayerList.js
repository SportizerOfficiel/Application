/** @format */

import React from "react";
import PlayerForm from "@/DesignSystem/Organisms/Players/PlayerForm";

import { Stepper, Button, Group, Container, Flex, Space } from "@mantine/core";
import { useSport } from "@/Context/SportContext";
import useForm from "@/Utils/Hooks/useForm";
import ClubAutoComplete from "./ClubAutoComplete";

const PlayerList = ({PlayerList,action=()=>{}}) => {
  
 
  const [regularPlayers,setRegularPlayers] = React.useState([])
  const [substitutePlayers ,setSubstitutePlayers] = React.useState([])
 
  return (
      <Container 
      sx={(theme) => ({
        paddingTop: "10%"
      })}>
        <Flex align="center" direction="column">
           <ClubAutoComplete setPlayers={setRegularPlayers} setSubPlayers={setSubstitutePlayers}></ClubAutoComplete>
         </Flex>
         <Space my="xl"></Space>
         <Space my="xl"></Space>
         <Flex>
            <PlayerForm label="Titulaire" numberPlayer={PlayerList.PlayerPerTeam} DATAPlayers={regularPlayers}></PlayerForm>
            <PlayerForm label="Remplacant" numberPlayer={PlayerList.SubPlayerPerTeam} DATAPlayers={substitutePlayers}></PlayerForm>
          </Flex>
          <Flex justify="center" align="center" my="xl">
             <Button  type="submit" >Next step</Button>
          </Flex>
      </Container>
  );
};

export default PlayerList;

const SportConfig={
    Basket:{
        PlayerPerTeam:5,
        SubPlayerPerTeam:5
    }
}