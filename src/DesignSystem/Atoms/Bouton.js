import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({disabled}) => disabled ? 'gray' : '#D4A92A'};
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: ${({disabled}) => disabled ? 'default' : 'pointer'};
  font-size: 16px;

  &:hover {
    background-color: ${({disabled}) => disabled ? 'gray' : '#A67E08'};
  }
`;

function Bouton(props) {
  const { text, onClick, disabled } = props;

  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {text}
    </StyledButton>
  );
}

export default Bouton;