import React from 'react';
import PlayerGame from '../Mollecules/PlayerGame';
import Plus from '../Atoms/Plus';

const TeamList = ({}) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <td><InputTeam></InputTeam></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="teamName" placeholder="Nom de l'équipe"/><Plus></Plus></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Joueur</td>
                        <td>N°</td>
                    </tr>
                    <tr><td><PlayerGame></PlayerGame></td></tr>
                    <tr><td><PlayerGame></PlayerGame></td></tr>
                    <tr><td><PlayerGame></PlayerGame></td></tr>
                    <tr><td><PlayerGame></PlayerGame></td></tr>
                    <tr><td><PlayerGame></PlayerGame></td></tr>
                </tbody>
            </table>
        </div>
    );
};

export default TeamList;