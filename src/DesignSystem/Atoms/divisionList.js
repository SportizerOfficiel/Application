import React from 'react';

const divisionList = () => {
    return (
        <select id="division">
            <option value="departementale" selected>Départementale</option>
            <option value="regionale">Régionale</option>
            <option value="national">National</option>
            <option value="elite">Elite</option>
        </select>
    );
};

export default divisionList;