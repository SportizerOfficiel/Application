/** @format */
import React from "react";
import {
  Flex,
  Group,
  Paper,
  Badge,
  Table,
  Text,
  Box,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Button,
  TextInput,
} from "@mantine/core";
import { useSport } from "@/Context/SportContext";
import { modals } from "@mantine/modals";
import CartonRouge from "@/DesignSystem/Atoms/CartonRouge";
import CartonJaune from "@/DesignSystem/Atoms/CartonJaune";
import ButtonIcon from "@/DesignSystem/Mollecules/ButtonIcon";
import Ballon from "@/DesignSystem/Atoms/Ballon";
import PlayerTableauRemplace from "./PlayerTableauRemplace";
import { IconSearch } from "@tabler/icons-react";
import { findIndexByValue } from "@/Utils/Helpers";
import { useWebSocket } from "@/Context/WebSocketContext";
import { useTimer } from "@/Context/TimerContext";
const jobColors = {
  engineer: "blue",
  manager: "cyan",
  designer: "pink",
};

const Rows = ({ item, setSearch, team }) => {
  const SportContext = useSport();
  const WebSocketContext = useWebSocket();
  const cumulate = SportContext.getSportConfig()?.PlayerSettings?.cumulate;
  const GetAction = ({ item, value, name, team, type }) => {
    const index = findIndexByValue(SportContext.Instance[team].titulaires, item);
    const buffer = { ...SportContext.Instance }; // this creates a shallow copy, not suitable for nested objects

    // to deep copy the buffer object you can use:
    // const buffer = JSON.parse(JSON.stringify(SportContext.Instance));
    let totalFaults = 0;
    if (type === "faults") {
      totalFaults =
        buffer[team].titulaires[index].action?.["faults"]?.reduce((acc, cur) => acc + cur.value.value, 0) || 0;
    }
    const maxFaults = SportContext.getSportConfig().PlayerSettings.maxFaults;

    if (totalFaults >= maxFaults) {
      // If the player has reached maxFaults, stop adding more faults
      console.log("Player has reached maximum faults");
      return;
    }

    buffer[team].titulaires[index] = {
      ...buffer[team].titulaires[index],
      action: {
        ...buffer[team].titulaires[index].action,
        [type]: [...(buffer[team].titulaires[index].action?.[type] || []), { type: name, value: value }],
      },
    };

    SportContext.setInstance(buffer);
    WebSocketContext.sendPostMessage("instance", buffer);
    modals.closeAll();
  };

  const theme = useMantineTheme();
  return (
    <Box
      component="tr"
      key={item.name}
      sx={(theme) => ({
        cursor: "pointer",
      })}
      onClick={() => {
        setSearch("");
        modals.open({
          p: 30,
          size: "lg",
          title: (
            <Text
              size="xl"
              weight="bold"
              align="center"
              transform="uppercase"
              sx={(theme) => ({
                width: "100%",
              })}
            >
              {item.name}
            </Text>
          ),
          children: (
            <>
              <Flex gap="md" justify="center" align="center">
                {Object.entries(SportContext.getSportConfig().PlayerSettings.Fautes).map(([e, value]) => {
                  return (
                    <ButtonAction key={item.playerId+e+value} text={e} onClick={() => GetAction({ item, value, name: e, team, type: "faults" })}>
                      {<value.icon />}
                    </ButtonAction>
                  );
                })}
                {Object.entries(SportContext.getSportConfig().PlayerSettings.Goals).map(([e, value]) => {
                  return (
                    <ButtonAction key={item.playerId+e+value} text={e} onClick={() => GetAction({ item, value, name: e, team, type: "points" })}>
                      {<value.icon />}
                    </ButtonAction>
                  );
                })}
              </Flex>
              {SportContext.Instance[team].remplacants && SportContext.Instance[team].remplacants.length > 0 && (
                <Button
                  fullWidth
                  mt="xl"
                  mb="sm"
                  onClick={() => {
                    modals.closeAll();
                    modals.open({
                      p: 30,
                      size: "lg",
                      title: (
                        <Text
                          size="xl"
                          weight="bold"
                          align="center"
                          transform="uppercase"
                          sx={(theme) => ({
                            width: "100%",
                          })}
                        >
                          {item.name}
                        </Text>
                      ),
                      children: (
                        <>
                          <PlayerTableauRemplace
                            data={SportContext.Instance[team]}
                            item={item}
                            team={team}
                          ></PlayerTableauRemplace>
                        </>
                      ),
                    });
                  }}
                >
                  Remplacer
                </Button>
              )}
            </>
          ),
        });
      }}
    >
      <td>
        <Anchor component="button" size="sm">
          {item.number}
        </Anchor>
      </td>
      <td>
        <Group spacing="sm">
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </td>

      <td>
        {item?.action && (
          <Flex gap="sm">
            {item.action?.faults?.length > 0 &&
              Object.entries(countOccurrences(item.action.faults)).map(([type, count]) => {
                const IconComponent = SportContext.getSportConfig().PlayerSettings.Fautes[type].icon;
                return (
                  <Flex gap="xs" align="center" key={item.playerId+type+count+"faults"}>
                    <IconComponent />
                    <Text>{`x${count}`}</Text>
                  </Flex>
                );
              })}
            {item.action?.points?.length > 0 &&
              !cumulate &&
              Object.entries(countOccurrences(item.action.points)).map(([type, count]) => {
                const IconComponent = SportContext.getSportConfig().PlayerSettings.Goals[type].icon;
                return (
                  <Flex gap="xs" align="center" key={item.playerId+type+count+"points"}>
                    <IconComponent />
                    <Text>{`x${count}`}</Text>
                  </Flex>
                );
              })}
            {item.action?.points?.length > 0 && cumulate && (
              <Flex gap="xs" align="center">
                <Text>{`+${CumulatePoints(item)}`}</Text>
              </Flex>
            )}
          </Flex>
        )}
      </td>
    </Box>
  );
};

const CumulatePoints = (item) => {
  let Points = 0;
  item.action.points.forEach((e) => {
    Points += e.value.value;
  });
  return Points;
};

export default function PlayerTableauMatch({ team }) {
  const SportContext = useSport();
  const [search, setSearch] = React.useState("");
  const TimerContext = useTimer();
  const filteredData = SportContext.Instance[team].titulaires.filter(
    (player) => player.name.toLowerCase().includes(search.toLowerCase()) || player.number.toString() === search
  );

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <ScrollArea
      sx={(theme) => ({
        width: "100%",
      })}
    >
      <Box
        sx={(theme) => ({
          width: "100%",
          height: "100px",
          background: `url("${SportContext.Instance[team].club.clubLogo}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        })}
      ></Box>
      {TimerContext.isRunning && !TimerContext.isPausex.current  && !TimerContext.isTimeOut.current && SportContext.getSportConfig().Details.TimeOutsPerTeam.value > 0   && (
        <Button
          size="md"
          mt="sm"
          sx={(theme) => ({
            width: "100%",
            background: theme.colors.red[8],
            "&:hover": {
              background: theme.colors.red[7],
            },
          })}
          onClick={() => {
            if(TimerContext.GetTimeoutCount(team)<SportContext.getSportConfig().Details.TimeOutsPerTeam.value)
            modals.openConfirmModal({
              title: "Confirm Temps Mort",
              children: (
                <Text size="sm">
                  This action is so important that you are required to confirm it with a modal. Please click one of
                  these buttons to proceed.
                </Text>
              ),
              labels: { confirm: "Confirm", cancel: "Cancel" },
              onCancel: () => console.log("Cancel"),
              onConfirm: () => {
                TimerContext.startTimeout(team);
              },
            });
          }}
        >
          Temps Mort {TimerContext.GetTimeoutCount(team)}/{SportContext.getSportConfig().Details.TimeOutsPerTeam.value}
        </Button>
      )}
      <TextInput
        placeholder="Search by any field"
        my="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearch}
      />
      <Table verticalSpacing="md" highlightOnHover striped fontSize="md">
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <Rows key={item.playerId} item={item} setSearch={setSearch} team={team} ></Rows>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
}

const ButtonAction = ({ text, children, onClick }) => {
  return (
    <ButtonIcon>
      <Paper
        withBorder
        shadow="md"
        component="button"
        radius="md"
        sx={(theme) => ({
          cursor: "pointer",
          width: "fit-content",
          minWidth: "80px",
          minHeight: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: theme.spacing.sm,
          color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
          "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[0],
          },
          "&:focus": {
            boxShadow: "unset",
          },
        })}
        onClick={onClick}
      >
        {children}
      </Paper>

      <Text mt="sm">{text}</Text>
    </ButtonIcon>
  );
};

function countOccurrences(array) {
  const counts = {};
  array.forEach((item) => {
    counts[item.type] = (counts[item.type] || 0) + 1;
  });
  return counts;
}
