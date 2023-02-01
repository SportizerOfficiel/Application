import React from 'react';
import styled from "styled-components"

const Button = ({children}) => {
    return (
        <Element className="">
            {children}
        </Element>
    );
};

const Element = styled.div`
    
`


export default Button;


