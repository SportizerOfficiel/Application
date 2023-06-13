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
            <Text size="xl" sx={(theme) => ({
                position:"absolute",
                left:theme.spacing.md,
                top:theme.spacing.md,
            textTransform: "capitalize",
          })}>Beta 1.0.1</Text>
        </Flex>
    );
};

export default WaitingInstance;