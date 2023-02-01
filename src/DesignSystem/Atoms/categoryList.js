import React from 'react';

const categoryList = () => {
    return (
        <select id="category">
            <option value="u7" selected>U7</option>
            <option value="u9">U9</option>
            <option value="u11">U11</option>
            <option value="u13">U13</option>
            <option value="u15">U15</option>
            <option value="u17">U17</option>
            <option value="u18">U18</option>
            <option value="u20">U20</option>
            <option value="senior">Senior</option>
        </select>
    );
};

export default categoryList;