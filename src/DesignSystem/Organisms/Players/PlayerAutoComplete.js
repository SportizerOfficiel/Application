/** @format */

import React, { useEffect, useState, useCallback } from "react";
import { Autocomplete, Box, Input } from "@mantine/core";
import axios from "axios";
import debounce from "lodash.debounce";
// import styled from "styled-components";
import {getrandomInt} from "@/Utils/Helpers";
export default function PlayerAutocomplete({ name = "", player = {},label="",index }) {
  const [data, setData] = useState([]);
  const [DefaultKey, setDefaultKey] = useState("%NEW%="+getrandomInt(99999999999));
  const [Numero, setNumero] = useState(player.Numero || 0);
  const [Name, setName] = useState(player.Name || "");
  const [Id, setId] = useState(player._id || DefaultKey);
  const [IsToCompleted, setIsToCompleted] = useState(label === "Titulaire" && index === 0);
 


  const searchPlayers = useCallback(
    debounce(async (search) => {
      setId(DefaultKey);
      // Replace with your API URL
      const response = await axios.get("/api/Players", { params: { search: search } });
      const players = response.data.map((player) => ({ _id: player._id, value: player.Name, numero: player.Numero }));
      setData(players);
      UpdatePlayers(search,players);
    }, 500),
    []
  );

  const UpdatePlayers = async (e,players) => {
    const player = players.find((player) => player.value.toLowerCase() === e.toLowerCase());
    
    if (player) {
      setNumero(player.numero);
      setName(player.value);
      setId(player._id);
    }
  };
  React.useEffect(() => {
    setNumero(player.Numero);
    setName(player.Name);
    setId(player._id);
  }, [player]);

  React.useEffect(() => {
    setIsToCompleted(Numero || Name || label === "Titulaire" && index === 0);
  }, [Numero, Name]);

  return (
    <Box
      sx={(theme) => ({
        display: "flex",

        ".mantine-Input-wrapper.mantine-Autocomplete-wrapper": {
          minWidth: "200px",
        },
        ".mantine-Input-input.mantine-Autocomplete-input": {
          borderTopRightRadius: "unset",
          borderBottomRightRadius: "unset",
        },
        ".inputnumber": {
          height: "100%!important",
          maxWidth: "60px",
          borderLeft: "unset",
          borderTopLeftRadius: "unset",
          borderBottomLeftRadius: "unset",
        },
      })}
    >
      <Input type="hidden" value={Id || ""} name={label+" id_"+Id}></Input>
      <Autocomplete
        placeholder="Nom Prénom"
        data={data}
        value={Name || ""}
        required={IsToCompleted}
        name={Id + "_name"}
        onChange={(search) => {
          setName(search);
          searchPlayers(search);
        }}
      />
      <Input
      required={IsToCompleted}
        maxLength={3}
        value={Numero || ""}
        onChange={(e) => setNumero(e.target.value)}
        className="inputnumber"
        max={999}
        type="number"
        name={Id + "_number"}
        placeholder="N°"
      />
    </Box>
  );
}

// const Element = styled.div`
// display: flex;
// &
// & .mantine-Input-input.mantine-Autocomplete-input{
//   border-top-right-radius: unset;
//   border-bottom-right-radius: unset;
// }
//  & .mantine-Input-input.mantine-NumberInput-input{
//   height:"100%!important";
//   max-width: 60px;
//   border-left: unset;
//   border-top-left-radius: unset;
//   border-bottom-left-radius: unset;
//  }
// `
