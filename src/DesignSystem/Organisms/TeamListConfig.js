import React from 'react';
import PlayerConfig from '../Mollecules/PlayerConfig';
import Plus from '../Atoms/Plus';
import InputTeam from '../Atoms/InputTeam';
import styled from 'styled-components';


const PlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TeamList = ({}) => {
    return (
        <div className="table-container">
            <InputTeam></InputTeam>
            <div>
                <h3>Joueur</h3>
                <h3>N°</h3>
            </div>
            <PlayerConfig></PlayerConfig>
            <PlayerConfig></PlayerConfig>
            <PlayerConfig></PlayerConfig>
            <PlayerConfig></PlayerConfig>
            <PlayerConfig></PlayerConfig>
            <PlayerConfig></PlayerConfig>
            <PlayerConfig></PlayerConfig>
            <PlayerConfig></PlayerConfig>
        </div>
    );
};

export default TeamList;