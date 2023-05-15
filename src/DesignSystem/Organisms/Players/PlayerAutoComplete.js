import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@mantine/core';
import axios from 'axios';

const PlayerAutocomplete = ({ name="pute" }) => {
  const [data, setData] = useState([]);


    const fetchPlayers = async (data) => {
      // Remplacez par votre URL d'API
      const response = await axios.post("/api/Players", data, { params: { search: true } });
      console.log(response)
      const players = response.data.map(player => player.name);
      setData(players);
    };

 React.useEffect(()=>{
    console.log("salope")
 })

  return (
    <Autocomplete
      label="Rechercher un joueur"
      placeholder="Commencez à taper..."
      data={data}
      name={name}
      onChange={(e)=>{ fetchPlayers(e)}}
    />
  );
};

export default PlayerAutocomplete;
