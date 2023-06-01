import React from 'react';

import useForm from "@/Utils/Hooks/useForm";
import axios from "axios";
import {
  Checkbox,
  Anchor,
  Paper,
  Title,
  PinInput,
  Text,
  Group,
  Container,
  Space,
  Button,
  Box,
} from '@mantine/core';

import { useRouter } from 'next/router';
import { useWebSocket } from '@/Context/WebSocketContext';

const RemotePin = () => {
  const { connect,error,loading } = useWebSocket();
  const PinRef = React.useRef()
  const handleInputChange = (event) => {
    connect(event.pin);
    resetForm()
  };
  const [PinFormRef, handleLoginSubmit, resetForm] = useForm(handleInputChange);
  
  return (
  
    <Box component="form" 
    sx={(theme) => ({
      width:"100%",
      height:"100%",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      paddingBottom:"10%"
    })} ref={PinFormRef} onSubmit={handleLoginSubmit}>
      <Container miw={420} >
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Connect to screen
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?
        </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md"  sx={(theme) => ({ width:"fit-content" })}>
        <Group position="center">
          <PinInput ref={PinRef} size="xl" length={6} name="pin" error={error} autoFocus sx={(theme) => ({ fontWeight: 900  })}></PinInput>
        </Group>
       
          {error && <Text mb="lg" color="red">
            {error}
          </Text>}
    
        <Button fullWidth mt="xl" type="submit" loading={loading}>
          Connect
        </Button>
      </Paper>
    </Container>
    </Box>

  );
};

export default RemotePin;
