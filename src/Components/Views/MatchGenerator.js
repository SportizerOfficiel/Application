/** @format */

import { Box, SimpleGrid } from "@mantine/core";
import React from "react";
import ImageCard from "../../DesignSystem/Organisms/ImageCard/ImageCard";
import RemoteGenerator from "../AppRemote/RemoteGenerator";
import SportConfig from "@/SportConfig";
import { useSport } from "@/Context/SportContext";
const Match = () => {

 const SportContext = useSport();
  return (
    <>
      {SportContext.Sport === "" && (
        <SimpleGrid
          cols={4}
          spacing="xs"
          verticalSpacing="xl"
          mx="xl"
          breakpoints={[
            { maxWidth: "62rem", cols: 3, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {Object.keys(SportConfig).map((sport) => (
            <ImageCard key={sport} action={() => SportContext.setSport(sport)} title={sport} image={SportConfig[sport].Img} />
          ))}
        </SimpleGrid>
      )}
      {SportContext.Sport != "" && <RemoteGenerator></RemoteGenerator>}
    </>
  );
};

export default Match;
