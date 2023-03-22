import React from 'react';
import styled from 'styled-components';
import Bouton from '@/DesignSystem/Atoms/Bouton';


const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function BoutonGroup(props) {
  const { onClick } = props;

  return (
    <ButtonContainer>
        <Bouton text="Correction"></Bouton>
        <Bouton text="Buzzer 🔊"></Bouton>
        <Bouton text="Temps-mort 1:00"></Bouton>
    </ButtonContainer>
  );
}

export default BoutonGroup;