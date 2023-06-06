/** @format */

import { useSport } from "@/Context/SportContext";
import { Avatar, Badge, Table, Group, Text, Box, Anchor, ScrollArea, useMantineTheme } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { findIndexByValue } from "@/Utils/Helpers";
import { useWebSocket } from "@/Context/WebSocketContext";
import { modals } from "@mantine/modals";
const jobColors = {
  engineer: "blue",
  manager: "cyan",
  designer: "pink",
};

const Rows = ({ role, data, titu, team }) => {
  const theme = useMantineTheme();
  const SportContext = useSport();
  const WebSocketContext = useWebSocket();

  const Replace = (index) => {
    let buffer = { ...SportContext.Instance };
    const titulaireIndex = findIndexByValue(buffer[team].titulaires, titu);
    const titulaireBuffer = buffer[team].titulaires[titulaireIndex];
    const remplacantsBuffer = buffer[team].remplacants[index];

    if(!titulaireBuffer.from)
    titulaireBuffer.from = "titulaires";
    if(!remplacantsBuffer.from)
    remplacantsBuffer.from = "remplacants";

    buffer[team].titulaires[titulaireIndex] = remplacantsBuffer;
    buffer[team].remplacants[index] = titulaireBuffer;

    SportContext.setInstance(buffer);
    WebSocketContext.sendPostMessage("instance",buffer);
    modals.closeAll()
  };

  return data[role].map((item, index) => (
    <Box
      component="tr"
      key={item.name}
      onClick={() => Replace(index)}
      sx={(theme) => ({
        cursor: "pointer",
      })}
    >
      <td>
        <Group spacing="sm">
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </td>

      <td>
        <Anchor component="button" size="sm">
          {item.number}
        </Anchor>
      </td>
    </Box>
  ));
};

export default function PlayerTableauRemplace({ data, item, team }) {
  return (
    <>
      <ScrollArea
        sx={(theme) => ({
          width: "100%",
        })}
      >
        <Table verticalSpacing="md" highlightOnHover striped fontSize="md">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <Rows role="remplacants" data={data} titu={item} team={team}></Rows>
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
