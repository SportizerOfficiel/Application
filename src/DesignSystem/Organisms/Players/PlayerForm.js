/** @format */

import React, { useState, useRef } from "react";
import { Button, Container, Flex, Paper, Text } from "@mantine/core";
import PlayerAutocomplete from "./PlayerAutocomplete.js";
import { IconTrash } from "@tabler/icons-react";

export default function PlayerForm({ label = "", numberPlayer = 0, DATAPlayers = [] }) {
  const [players, setPlayers] = useState([]);

  const handleInputChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index].value = value;
    setPlayers(newPlayers);
  };

  const handleAddPlayer = () => {
    setPlayers([...players, {}]);
  };

  const handleRemovePlayer = (index) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };

  const addPlayers = (data) => {
    // Ajoutez ici la logique pour ajouter des joueurs
    console.log(data);
  };
  React.useEffect(() => {
    if (DATAPlayers.length === 0) {
      const tableau = Array.from({ length: numberPlayer }, (_, i) => ({ id: i }));
      setPlayers(tableau);
    }

    if (DATAPlayers.length > 0) {
      setPlayers(DATAPlayers);
    }
  }, [numberPlayer, DATAPlayers]);

  return (
    <Container >
      <Text weight={700} size="lg" mb="md">
        {label}
      </Text>

      {players.map((player, index) => (
        <Flex padding="md" mb="md" key={label + "_" + index}>
          <PlayerAutocomplete name={label + "_" + player.name} label={label} player={player}/>
          <Button
            color="red"
            onClick={() => handleRemovePlayer(index)}
            sx={(theme) => ({
              paddingLeft: "0.7rem",
              paddingRight: "0.7rem",
              marginLeft: "1rem",
            })}
          >
            <IconTrash size="1rem"></IconTrash>
          </Button>
        </Flex>
      ))}
      <Flex justify="center">
        <Button onClick={() => handleAddPlayer()}>Ajouter un joueur</Button>
      </Flex>
    </Container>
  );
}
