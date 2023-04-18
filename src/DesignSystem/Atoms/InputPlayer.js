import React from 'react';

const InputPlayer = ({valeur}) => {
    return (
        <input type='text' value={valeur} placeholder='Nom'/>
    );
};

export default InputPlayer;