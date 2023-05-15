import { Box, SimpleGrid } from '@mantine/core';
import React from 'react';
import ImageCard from '../../DesignSystem/Organisms/ImageCard/ImageCard';
import BasketRemote from '../AppRemote/Basket/BasketRemote';

const Match = () => {
    const [Interface, setInterface] = React.useState("")
  
    return (
    <>
        {Interface === "" && 
            <SimpleGrid cols={4} spacing="xs" verticalSpacing="xl" mx="xl"   breakpoints={[
                { maxWidth: '62rem', cols: 3, spacing: 'md' },
                { maxWidth: '48rem', cols: 2, spacing: 'sm' },
                { maxWidth: '36rem', cols: 1, spacing: 'sm' },
              ]}>
                    <ImageCard action={()=>setInterface("Basket")}  title="Basket" image="https://media.discordapp.net/attachments/1055399563529302026/1107019541093031996/Regtx5_basketball_dunk_d4dc96c5-3adb-44e2-bfc0-600b94e87144.png?width=1042&height=1042"></ImageCard>
                    <ImageCard  title="Handball" image="https://pyrene-hand.fr/wp-content/uploads/sites/287/2019/04/6-2.jpg"></ImageCard>
                    <ImageCard  title="Volleyball" image="https://dicodusport.fr/wp-content/uploads/2016/03/Definition-Volley-ball.png"></ImageCard>
                    <ImageCard  title="FootBall" image="https://img.lemde.fr/2022/11/26/0/0/2340/1560/664/0/75/0/c9e9566_8830d2670b8b49fdbcf01579d46a0655-0-f682a76166f84e52b3f6a1bb547458eb.jpg"></ImageCard>
                    <ImageCard  title="Badminton" image="https://dicodusport.fr/wp-content/uploads/2016/01/Definition-badminton.png"></ImageCard>
                    <ImageCard  title="Tennis" image="https://www.lequipe.fr/_medias/img-photo-jpg/caroline-garcia-n-a-pas-reussi-a-peser-sur-le-match-interrompu-par-la-pluie-rob-prange-rob-prange-afp7/1500000001783957/0:0,1841:1227-828-552-75/99ee9"></ImageCard>
            </SimpleGrid> }
            {Interface === "Basket" && <BasketRemote></BasketRemote>}
        </>
    );
};

export default Match;