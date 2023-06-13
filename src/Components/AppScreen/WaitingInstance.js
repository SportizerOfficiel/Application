import { Box, Container,Flex,Text } from '@mantine/core';
import React from 'react';

const WaitingInstance = () => {
    return (
        <Flex justify="center" align="center" direction="column"  sx={(theme) => ({
            width: "100%",
            height: "100%",
            textTransform: "capitalize",
          })}>
            <Box component='img' sx={(theme) => ({
           width:"60vw"
          })} src='/logo-couleur-blanc-L.svg'></Box>
            <Text  mt="xl" size="xl">Waiting Match configuration</Text>
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