/** @format */

// services/SportContext.js
import { postClub } from "@/Services/Clubs";
import { postMatch } from "@/Services/Matchs";
import { postPlayer, updatePlayerById } from "@/Services/Players";
import SportConfig from "@/SportConfig";
import { modals } from "@mantine/modals";
import { IconArrowAutofitContentFilled } from "@tabler/icons-react";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useWebSocket } from "./WebSocketContext";
const SportContext = createContext();

export const useSport = () => {
  return useContext(SportContext);
};

export const SportProvider = ({ children }) => {
  const WebSocketContext = useWebSocket();
  const [Config, setConfig] = useState();
  const [Instance, setInstance] = useState();
  const [Sport, setSport] = useState("");

  const getSportConfig = () => {
    return SportConfig[Sport];
  };

  React.useEffect(() => {
    if (!Sport || !Config ) return;
    setInstance(Config);
    WebSocketContext.sendPostMessage("instance", { Sport, Config });
  }, [Config]);

 
  React.useEffect(() => {
    if (WebSocketContext.payload?.Sport) {
      setInstance(WebSocketContext.payload?.Config || null);
      setSport(WebSocketContext.payload?.Sport || "");
    } else {
      setInstance(WebSocketContext.payload);
    }
  }, [WebSocketContext.payload]);

  React.useEffect(() => {
    if (WebSocketContext.RemoteConnected) return;
    setConfig();
    setInstance();
    setSport("");
  }, [WebSocketContext.RemoteConnected]);

  const reset = () => {
    setConfig(null);
    setInstance(null);
    setSport("");
  };
  const createClub = (team) => {
    if (team.club.new) {
      return postClub({
        Name: team.club.name,
        Sport: Sport,
        Logo: team.club.clubLogo,
      });
    } else {
      return team.club;
    }
  };
  const createNewPlayers = async (team, clubId) => {
    let newPlayers = [];

    if (team.newPlayers) {
      for (const player of team.newPlayers) {
        console.log("new player", player);
        const newPlayer = await postPlayer({
          Name: player.name,
          Category: Instance.Parameters.Category,
          Numero: player.number,
          idClub: clubId,
        });
        newPlayers.push(newPlayer);
      }
    }

    return newPlayers;
  };

  const getNewPlayerId = (player, newPlayers) => {
    if (player.playerId.includes("%NEW%=")) {
      const newPlayer = newPlayers.find((newplayer) => newplayer.Name === player.name);
      return newPlayer._id;
    }
    return player.playerId;
  };

  const createPlayerData = (playerData, newPlayers, clubId) => {
    return playerData.map((e) => {
      console.log(e, e.idClub !== clubId, e.baseNumber !== e.number);
      if (!e.new && (e.idClub !== clubId || e.baseNumber !== e.number)) {
        updatePlayerById(e.playerId, {
          Numero: e.number,
          idClub: clubId,
        });
      }

      return {
        player: getNewPlayerId(e, newPlayers),
        isSub: e.sub,
        points: e.action?.points
          ? e.action.points.map((points) => ({ type: points.type, value: points.value.value }))
          : [],
        faults: e.action?.faults
          ? e.action.faults.map((faults) => ({ type: faults.type, value: faults.value.value }))
          : [],
      };
    });
  };

  const SaveMatch = async (duration = 0, callback = () => {}) => {
    if (WebSocketContext.IsScreen) return;

    const ClubTeam1 = await createClub(Instance.TEAM1);
    const ClubTeam2 = await createClub(Instance.TEAM2);
    const idteam1 = ClubTeam1._id || ClubTeam1.id;
    const idteam2 = ClubTeam2._id || ClubTeam2.id;

    const TEAM1NewPlayer = await createNewPlayers(Instance.TEAM1, idteam1);
    const TEAM2NewPlayer = await createNewPlayers(Instance.TEAM2, idteam2);

    const TEAM1Player = [
      ...createPlayerData([...Instance.TEAM1.titulaires, ...Instance.TEAM1.remplacants], TEAM1NewPlayer, idteam1),
    ];
    const TEAM2Player = [
      ...createPlayerData([...Instance.TEAM2.titulaires, ...Instance.TEAM2.remplacants], TEAM2NewPlayer, idteam2),
    ];
    console.log(TEAM1Player, TEAM2Player);
    console.log({
      Sport: Sport,
      Category: Instance.Parameters.Category,
      Duration: duration,
      HomeSideClub: idteam1,
      OutSideClub: idteam2,
      HomeSidePlayers: TEAM1Player,
      OutSidePlayers: TEAM2Player,
    });
    await postMatch({
      Sport: Sport,
      Category: Instance.Parameters.Category,
      Duration: duration,
      HomeSideClub: idteam1,
      OutSideClub: idteam2,
      HomeSidePlayers: TEAM1Player,
      OutSidePlayers: TEAM2Player,
    });
    callback();
  };
  const value = {
    Config,
    setConfig,
    SaveMatch,
    Sport,
    setSport,
    getSportConfig,
    Instance,
    setInstance,
    reset
  };

  return <SportContext.Provider value={value}>{children}</SportContext.Provider>;
};
