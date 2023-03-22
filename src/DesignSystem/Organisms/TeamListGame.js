import React from 'react';
import PlayerGame from '../Mollecules/PlayerGame';
import ChangePopup from '../Mollecules/ChangePopup';

const TeamList = ({}) => {
    return (
        <div>
            <h3>PTS</h3>
            <PlayerGame></PlayerGame>
            <PlayerGame></PlayerGame>
            <PlayerGame></PlayerGame>
            <PlayerGame></PlayerGame>
            <PlayerGame></PlayerGame>
            <ChangePopup></ChangePopup>
        </div>
    );
};

export default TeamList;