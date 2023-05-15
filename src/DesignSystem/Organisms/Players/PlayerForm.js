import React, { useState, useRef } from 'react';
import { Button, Container, Paper, Text } from '@mantine/core';
import useForm from '@/Utils/Hooks/useForm';
import PlayerAutocomplete from './PlayerAutocomplete';

const PlayerForm = () => {
  const [players, setPlayers] = useState([{}]);

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
  const [FormRef, handleSubmit, resetForm] = useForm(addPlayers);

  return (
    <Container>
      <Text weight={700} size="lg" mb="md">
        Ajouter des joueurs
      </Text>
      <form ref={FormRef} onSubmit={handleSubmit}>
        {players.map((player, index) => (
          <Paper padding="md" mb="md" key={index}>
            <PlayerAutocomplete
            />
            <Button color="red" onClick={() => handleRemovePlayer(index)}>
              Supprimer
            </Button>
          </Paper>
        ))}
        <Button onClick={()=>handleAddPlayer()}>Ajouter un joueur</Button>
        <Button type="submit">Envoyer</Button>
      </form>
    </Container>
  );
};

export default PlayerForm;
