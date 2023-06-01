/** @format */

import { forwardRef } from "react";
import { Icon360View, IconChevronRight } from "@tabler/icons-react";
import { Group, Avatar, Text, Menu, UnstyledButton, Title, Flex, ActionIcon, Button } from "@mantine/core";
import { useSport } from "@/Context/SportContext";
import { useClickOutside } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import SportConfig from "@/SportConfig";
import CartonRouge from "@/DesignSystem/Atoms/CartonRouge";
import CartonJaune from "@/DesignSystem/Atoms/CartonJaune";
import ButtonIcon from "@/DesignSystem/Mollecules/ButtonIcon";
import Ballon from "@/DesignSystem/Atoms/Ballon";

const UserButton = (props) => {
  return (
    <UnstyledButton
      onClick={props.AddActionPlayer}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        minWidth: "300px",
        padding: theme.spacing.md,
        paddingLeft: props.inverted ? "50px" : "",
        paddingRight: !props.inverted ? "50px" : "",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      {...props}
    >
      <Flex direction="column">
        <Flex
          gap="sm"
          align="center"
          justify={props.inverted ? "end" : "start"}
          direction={props.inverted ? "row" : "row-reverse"}
        >
          <Text
            order={2}
            size="xl"
            weight={400}
            sx={(theme) => ({
              textAlign: props.inverted ? "left" : "right",
            })}
          >
            {props.name}
          </Text>
          <Text
            order={2}
            size="xl"
            weight={400}
            sx={(theme) => ({
              textAlign: !props.inverted ? "left" : "right",
            })}
          >
            {" "}
            {props.number}{" "}
          </Text>
        </Flex>

        <Text
          color="dimmed"
          size="xs"
          sx={(theme) => ({
            textAlign: !props.inverted ? "left" : "right",
          })}
        >
          {props.playerId}
        </Text>
      </Flex>
    </UnstyledButton>
  );
};

function PlayerMatch({ player, inverted }) {
  const SportContext = useSport();

  const GetAction = (e, value) => {
    switch (e) {
      case "CartonRouge":
        return (
          <ButtonIcon>
            <CartonRouge />
            <Text mt="sm">{e}</Text>
          </ButtonIcon>
        );
        break;
      case "CartonJaune":
        return (
          <ButtonIcon>
            <CartonJaune />
            <Text mt="sm">{e}</Text>
          </ButtonIcon>
        );
        break;
      case "Goal":
        return (
          <ButtonIcon>
            <Ballon size="32px"></Ballon>
            <Text mt="sm">{e}</Text>
          </ButtonIcon>
        );
        break;
      default:
        break;
    }
  };

  const AddActionPlayer = () =>
    modals.open({
      title: (
        <Text
          size="xl"
          weight="bold"
          align="center"
          sx={(theme) => ({
            width: "100%",
          })}
        >
          {player.name}
        </Text>
      ),
      children: (
        <>
          <Flex gap="md" justify="center" align="center">
            {Object.entries(SportContext.getSportConfig().PlayerSettings.Fautes).map(([e, value]) => {
              return GetAction(e, value);
            })}
            {Object.entries(SportContext.getSportConfig().PlayerSettings.Goals).map(([e, value]) => {
              return GetAction(e, value);
            })}
          </Flex>
        </>
      ),
    });
  return (
    <Group position="center">
      <UserButton
        name={player.name}
        number={player.number}
        playerId={player.playerId}
        inverted={inverted}
        AddActionPlayer={AddActionPlayer}
      />
    </Group>
  );
}

export default PlayerMatch;
