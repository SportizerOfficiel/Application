import React from 'react';
import styled from 'styled-components';
import PlayerName from '../Atoms/PlayerName';
import PlayerNum from '../Atoms/PlayerNum';
import PointRed from '../Atoms/PointRed';
import PointJaune from '../Atoms/PointJaune';
import Bouton from '../Atoms/Bouton';
import Score from '../Atoms/Score';


const PlayerGame = ({number, name, jaune, rouge, score, fonction}) => {
    return (
        <div>
            <PlayerNum number={number}/><span>. </span>
            <PlayerName name={name}/>
            <Bouton onClick={fonction}></Bouton>
            <Score score={score}/><br/><br/>
        </div>
    );
};
/*{jauneArray&&(jauneArray.forEach(jaune => (
                <li>
                    <PointJaune></PointJaune>
                </li>
            )))}
            {rougeArray&&(rougeArray.map(rouge => (
                <li>
                    <PointRed></PointRed>
                </li>
            )))}*/
export default PlayerGame;