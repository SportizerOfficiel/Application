import React from 'react';
import Player from '../Mollecules/Player';
import Plus from '../Atoms/Plus';

const TeamList = ({}) => {
    return (
        <div className="table-container">
        <h2>Equipe</h2>
            <table>
                <thead>
                    <tr>
                        <td>Nom d'équipe</td>
                    </tr>
                    <tr>
                        <td><input type='text' name='teamName' placeholder="Nom de l'équipe"/><Plus></Plus></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Joueur</td>
                        <td>N°</td>
                    </tr>
                    <tr><td><Player></Player></td></tr>
                    <tr><td><Player></Player></td></tr>
                    <tr><td><Player></Player></td></tr>
                    <tr><td><Player></Player></td></tr>
                    <tr><td><Player></Player></td></tr>
                    <tr><td><Player></Player></td></tr>
                    <tr><td><Player></Player></td></tr>
                    <tr><td><Player></Player></td></tr>
                    <tr><td><Player></Player></td></tr>
                    <tr><td><Player></Player></td></tr>
                </tbody>
            </table>
        </div>
    );
};

export default TeamList;