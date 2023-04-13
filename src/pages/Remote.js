import React, { useState } from 'react';
import styled from 'styled-components';
import Bouton from '@/DesignSystem/Atoms/Bouton';
import TeamListConfig from '@/DesignSystem/Organisms/TeamListConfig';
import TeamListGame from '@/DesignSystem/Organisms/TeamListGame';


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const TeamContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const Remote = () => {
    const [inGame, setGame] = useState(false)

    function handleGame(){
        setGame(!inGame);
    }
    
    if(inGame){
        return (
            <TeamContainer>
                <TeamListConfig/>
                <TeamListConfig/>
                <Bouton text="Créer le Match" onClick={handleGame}></Bouton>
            </TeamContainer>
        );
    } else {
        return (
            <TeamListGame/>
        );
    }
};

export default Remote;