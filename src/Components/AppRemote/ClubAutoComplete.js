/** @format */

import React, { useEffect, useState, useCallback, forwardRef } from "react";
import { Group, Avatar, Text, MantineColor, SelectItemProps, Autocomplete, Input } from "@mantine/core";
import axios from "axios";
import debounce from "lodash.debounce";
import {getrandomInt} from "@/Utils/Helpers";
const AutoCompleteItem = forwardRef(({ value, Logo, ...others }, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar src={Logo} />

      <div>
        <Text
          sx={(theme) => ({
            textTransform: "capitalize",
          })}
        >
          {value}
        </Text>
      </div>
    </Group>
  </div>
));

function ClubAutoComplete({setSubPlayers,setPlayers,clublabel}) {
  const [data, setData] = React.useState([]);
  const [DefaultKey, setDefaultKey] = useState("%NEW%="+getrandomInt(99999999999));
  const [Id, setId] = useState(DefaultKey);
  const [Logo, setLogo] = useState("");

  const searchClub = React.useCallback(
    debounce(async (search) => {
      setId(DefaultKey);
      // Replace with your API URL
      const response = await axios.get("/api/Clubs", { params: { search: search } });
      const clubs = response.data.map((club) => ({ id: club._id, value: club.Name, Logo: club.Logo }));
      setData(clubs);
      UpdatePlayers(search,clubs)
    }, 500),
    []
  );

  const UpdatePlayers =  async (e,clubs) => {
    const club = clubs.find((club) => club.value.toLowerCase() === e.toLowerCase());
    if (club) {
      const response = await axios.get("/api/Clubs", { params: { getLastMatchPlayersByClubAndCateg: "U12",id:club.id } });
        setId(club.id)
        setLogo(club.Logo)
        setSubPlayers(response.data.substitutePlayers)
        setPlayers(response.data.regularPlayers)
    }
  };
  return (
    <>
      <Text weight={700} size="lg" mb="md">
        {clublabel}
      </Text>
      <Input type="hidden" name={"Club"+" Logo_" + Id} value={Logo}></Input>
      <Input type="hidden" name={"Club"+" id_" + Id} value={Id}></Input>
      <Autocomplete
      required
        label=""
        name={Id+"_name"}
        placeholder="Sportizer"
        itemComponent={AutoCompleteItem}
        data={data}
        sx={(theme) => ({
          width: "300px",
          textTransform: "capitalize",
        })}
        limit={4}
        onChange={(e) => {
          searchClub(e);
        }}
      />
    </>
  );
}

export default ClubAutoComplete;
