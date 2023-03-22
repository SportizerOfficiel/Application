import React from 'react';
import PlayerName from '../Atoms/PlayerName';
import PlayerNum from '../Atoms/PlayerNum';
import PointRed from '../Atoms/PointRed';
import PointJaune from '../Atoms/PointJaune';
import Score from '../Atoms/Score';


const jauneArray = [];
const rougeArray = [];

const PlayerGame = ({}) => {
    return (
        <div>
            <PlayerNum></PlayerNum>
            <PlayerName></PlayerName>
            {jauneArray&&(jauneArray.forEach(faute => (
                <li>
                    <PointJaune></PointJaune>
                </li>
            )))}
            {rougeArray&&(rougeArray.map(name => (
                <li>
                    <PointRed></PointRed>
                </li>
            )))}
            <Score></Score>
        </div>
    );
};

export default PlayerGame;