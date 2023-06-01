/** @format */

import { Avatar, Badge, Table, Group, Text, Box, Anchor, ScrollArea, useMantineTheme } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

const jobColors = {
  engineer: "blue",
  manager: "cyan",
  designer: "pink",
};

const Rows = ({ role, data }) => {
  const theme = useMantineTheme();
  return data[role].map((item) => (
    <tr key={item.name}>
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
        <Badge color="blue" variant={theme.colorScheme === "dark" ? "light" : "outline"}>
          {role}
        </Badge>
      </td>
     
    </tr>
  ));
};

export default function PlayerTableau({ data }) {
  return (
    <>
      <ScrollArea
        sx={(theme) => ({
          width: "100%",
     
        })}
      >
        <Box
          sx={(theme) => ({
            width: "100%",
            height:"200px",
            background:`url("${data.club.clubLogo}")`,
            backgroundSize:"cover",
            backgroundPosition:"center"
          })}
        ></Box>
        <Table verticalSpacing="sm">
          <thead>
            <tr>
            <th>Number</th>
              <th>Name</th>
              <th>Role</th>
             
              <th />
            </tr>
          </thead>
          <tbody>
            <Rows role="titulaires" data={data}></Rows>
            <Rows role="remplacants" data={data}></Rows>
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
