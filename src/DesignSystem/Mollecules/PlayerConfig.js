import React from 'react';
import InputNum from '../Atoms/InputNum';
import InputPlayer from '../Atoms/InputPlayer';
import Bouton from '../Atoms/Bouton';

const PlayerConfig = ({valeurNom, valeurNum}) => {
    return (
        <div>
            <InputPlayer valeur={valeurNom}/>
            <InputNum valeur={valeurNum}/>
        </div>
    );
};

export default PlayerConfig;