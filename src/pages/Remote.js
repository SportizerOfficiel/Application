import React, { useState } from 'react';
import styled from 'styled-components';
import Bouton from '@/DesignSystem/Atoms/Bouton';
import TeamListConfig from '@/DesignSystem/Organisms/TeamListConfig';
import TeamListGame from '@/DesignSystem/Organisms/TeamListGame';
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
            <ButtonContainer>
                <TeamListConfig/>
                <TeamListConfig/>
                <Bouton text="Créer le Match" onClick={handleGame}></Bouton>
            </ButtonContainer>
        );
    } else {
        return (
            <ButtonContainer>
            <TeamListGame></TeamListGame>
            <ButtonContainer>
                <Chrono></Chrono>
                <Bouton text="Correction"></Bouton>
            </ButtonContainer>
            <TeamListGame></TeamListGame>
        </ButtonContainer>
        );
    }
};

export default Remote;