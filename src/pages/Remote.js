import TeamListGame from '@/DesignSystem/Organisms/TeamListGame';
import TeamListConfig from '@/DesignSystem/Organisms/TeamListConfig';
import Bouton from '@/DesignSystem/Atoms/Bouton';
import React from 'react';
import BoutonGroup from '@/DesignSystem/Mollecules/BoutonGroup';


const Remote = () => {
    
    let inGame = 1;
    if(inGame == 0){
        return (
            <div>
                <TeamListConfig></TeamListConfig>
                <TeamListConfig></TeamListConfig>
                <Bouton text="Créer le Match"></Bouton>
            </div>
        );
    } else {
        return (
            <div>
                <TeamListGame></TeamListGame>
                <BoutonGroup></BoutonGroup>
                <TeamListGame></TeamListGame>
            </div>
        );
    }
};

export default Remote;