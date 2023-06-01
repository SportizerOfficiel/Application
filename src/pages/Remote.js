/** @format */

import { useWebSocket } from "@/Context/WebSocketContext";
import useAuth from "@/Utils/Hooks/useAuth";
import React from "react";
import useForm from "@/Utils/Hooks/useForm";
import RemotePin from "@/DesignSystem/Organisms/RemotePin/RemotePin";
import NavbarSimple from "@/DesignSystem/Organisms/NavBar/NavBar";
import Match from "@/Components/Views/MatchGenerator";
import PlayerAutocomplete from "@/DesignSystem/Organisms/Players/PlayerAutocomplete";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Box, Container } from "@mantine/core";
import SidebarComponent from "@/DesignSystem/Organisms/NavBar/SidebarComponent";
import { IconGraph, IconHelp, IconLogout, IconShirtSport } from "@tabler/icons-react";
import styled from "styled-components";
import NavBar from "@/DesignSystem/Organisms/NavBar/NavBar";
import MatchInstance from "@/Components/Views/MatchInstance";
import { useSport } from "@/Context/SportContext";

const Content = styled.div`
  margin-left: ${(props) => (props.isCollapsed ? "80px" : "250px")};
`;

const Remote = (props) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const SportContext = useSport();
  const { user, logout } = useAuth();
  const [inputKey, setInputKey] = React.useState("");
  const { RemoteConnected } = useWebSocket();
  const [Interface, setInterface] = React.useState("Match");

  const links = [
    {
      id: 1,
      link: "/Match",
      label: "Match",
      action: () => {
        setInterface("Match");
      },
      icon: IconShirtSport,
    },
    {
      id: 2,
      link: "/Stats",
      label: "Stats",
      action: () => {
        setInterface("Stats");
      },
      icon: IconGraph,
    },
    {
      id: 3,
      link: "/Help",
      label: "Help",
      action: () => {
        setInterface("Help");
      },
      icon: IconHelp,
    },
    {
      id: 4,
      link: "/Disconnect",
      label: "Déconnexion",
      action: () => {
        setInterface("Disconnect");
      },
      icon: IconLogout,
    },
  ];

  return (
    <>
      {!RemoteConnected && <RemotePin></RemotePin>}
      {RemoteConnected && (
        <>
        <NavBar links={links}></NavBar>
          {/* <SidebarComponent navItems={links} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}></SidebarComponent> */}
          <Container fluid>
            <Box
              sx={(theme) => ({
                width: "100%",
                height: "100%",
                display: Interface === "Match" ? "block" : "none",
              })}
            >
             {!SportContext.Config && <Match></Match>}
             {SportContext.Instance && <MatchInstance/>}
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default Remote;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
