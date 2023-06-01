import { Container,Flex,Text } from '@mantine/core';
import React from 'react';

const WaitingInstance = () => {
    return (
        <Flex justify="center" align="center" direction="column"  sx={(theme) => ({
            width: "100%",
            height: "100%",
            textTransform: "capitalize",
          })}>
            <img src='/logo-couleur_S.png'></img>
            <Text size="xl">Waiting Match configuration</Text>
        </Flex>
    );
};

export default WaitingInstance;