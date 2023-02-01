import React from 'react';
import styled from "styled-components"

const Button = ({children}) => {
    return (
        <Element >
            <div className='Test'></div>
            {children}
        </Element>
    );
};

const Element = styled.div`
    background: red;
    font-size: 99px;

   & .Test{

    }
`

export default Button;


