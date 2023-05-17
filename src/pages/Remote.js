
import { useWebSocket } from "@/Context/WebSocketContext";
import useAuth from "@/Utils/Hooks/useAuth";
import React from "react"
import useForm from "@/Utils/Hooks/useForm";
import RemotePin from "@/DesignSystem/Organisms/RemotePin/RemotePin";
import NavbarSimple from "@/DesignSystem/Organisms/NavBar/NavBar";
import Match from "@/Components/Views/Match";
import PlayerAutocomplete from "@/DesignSystem/Organisms/Players/PlayerAutocomplete";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Box } from "@mantine/core";



const Remote = (props) => {
  const { user, logout } = useAuth();
  const [inputKey, setInputKey] = React.useState("");
  const { RemoteConnected } = useWebSocket();
  const [Interface, setInterface] = React.useState("Match")
  
  const links = [
    { link: '/Match', label: 'Match',action:()=>{setInterface("Match")} },
    { link: '/Stats', label: 'Stats',action:()=>{setInterface("Stats")}  },
    { link: '/Help', label: 'Help',action:()=>{setInterface("Help")}   },
    { link: '/Disconnect', label: 'Déconnexion',action:()=>{setInterface("Disconnect")}  },
  ];
    return (
      <>
        {!RemoteConnected && <RemotePin></RemotePin>}
        {RemoteConnected &&   <>
        <NavbarSimple links={links}></NavbarSimple>
        <Box  sx={(theme) => ({
            width: "100%",
            height: "100%",
            display: Interface === "Match" ? "block" : "none"
          })}>
          <Match></Match>
        </Box>
        </>}
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





 