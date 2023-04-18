import React, {useState} from 'react';
import PlayerConfig from '../Mollecules/PlayerConfig';
import InputTeam from '../Atoms/InputTeam';
import Bouton from '../Atoms/Bouton';
import styled from 'styled-components';


/*const PlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;*/

const TeamListConfig = () => {
    const [newItem, setNewItem] = useState({ name: '', quantity: 0, price: 0 }); // Définir un état pour les nouvelles données
    const [list, setList] = useState([]); // Définir un état pour la liste JSON

    function handleInputChange(event) {
        // Gérer les modifications de formulaire
        const { name, value } = event.target;
        setNewItem({ ...newItem, [name]: value });
    }

    function handleSubmit(event) {
        // Gérer la soumission du formulaire
        event.preventDefault();
        setList([...list, newItem]); // Ajouter l'élément dans la liste JSON
        setNewItem({ name: '', quantity: 0, price: 0 }); // Réinitialiser les données du formulaire
    }
    return (
        <div>
            <InputTeam/>
            <PlayerConfig/>
        </div>
    );
    //<Bouton text="Créer le Match" onClick={}></Bouton>
};

export default TeamListConfig;