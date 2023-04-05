import styled from 'styled-components';
import React, { useState } from 'react';
import Bouton from '@/DesignSystem/Atoms/Bouton';
import TeamListGame from '@/DesignSystem/Organisms/TeamListGame';
import TeamListConfig from '@/DesignSystem/Organisms/TeamListConfig';
import Chrono from '@/DesignSystem/Mollecules/Chrono';
import BoutonBuzzer from '@/DesignSystem/Mollecules/BoutonBuzzer';


const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Remote = () => {
    const [inGame, setGame] = useState(false)

    function handleGame(){
        setGame(!inGame);
    }
    if(!inGame){
        return (
            <div>
                <TeamListConfig></TeamListConfig>
                <TeamListConfig></TeamListConfig>
                <Bouton text="Créer le Match" onClick={handleGame}></Bouton>
            </div>
        );
    } else {
        return (
            <div>
                <TeamListGame></TeamListGame>
                <ButtonContainer>
                    <Chrono></Chrono>
                    <Bouton text="Correction"></Bouton>
                </ButtonContainer>
                <TeamListGame></TeamListGame>
            </div>
        );
    }
};

export default Remote;