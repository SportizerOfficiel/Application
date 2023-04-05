import Bouton from '../Atoms/Bouton';
import TeamListGame from './TeamListGame';
import Chrono from '../Mollecules/Chrono';
import BoutonBuzzer from '../Mollecules/BoutonBuzzer';
import styled from 'styled-components';
import React from 'react';


const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `;

const inGameShape = ({}) => {
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
};

export default inGameShape;