import Bouton from '@/DesignSystem/Atoms/Bouton';
import TeamListConfig from '@/DesignSystem/Organisms/TeamListConfig';
import styled from 'styled-components';
import React from 'react';

const ButtonContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const outGameShape = ({fonction}) => {
    return (
        <ButtonContainer>
            <TeamListConfig/>
            <TeamListConfig/>
            <Bouton text="Créer le Match" onClick={() => {fonction}}></Bouton>
        </ButtonContainer>
    );

};

export default outGameShape;