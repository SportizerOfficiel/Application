import React from 'react';
import styled from 'styled-components';
import Bouton from '@/DesignSystem/Atoms/Bouton';
import Chrono from './Chrono';


const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function BoutonGroup(props) {
  const { onClick } = props;

  return (
    <ButtonContainer>
        <Chrono></Chrono>
        <Bouton text="Correction"></Bouton>
        <Bouton text="Buzzer 🔊"></Bouton>
    </ButtonContainer>
  );
}

export default BoutonGroup;