import React, { useState } from 'react';
import styled from 'styled-components';
import Bouton from '@/DesignSystem/Atoms/Bouton';
import TeamListConfig from '@/DesignSystem/Organisms/TeamListConfig';
import TeamListGame from '@/DesignSystem/Organisms/TeamListGame';


const Remote = (props) => {
    const [inGame, setGame] = useState(false)

    function handleGame(){
        setGame(!inGame);
    }
    
    if(!inGame){
        return (
            <div>
                <TeamListConfig/>
                <Bouton text={'⏩'} onClick={handleGame}/>
            </div>
        );
    } else {
        return (
            <TeamListGame/>
        );
    }
};

export default Remote;