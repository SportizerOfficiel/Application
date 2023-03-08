import React from 'react';
import InputNum from '../Atoms/InputNum';
import InputPlayer from '../Atoms/InputPlayer';
import PlayerNum from '../Atoms/PlayerName';
import PointRed from '../Atoms/PointRed';


const jauneArray = [];
const rougeArray = [];

const Player = ({}) => {
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

export default Player;