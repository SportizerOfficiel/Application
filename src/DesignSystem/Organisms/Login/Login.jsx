/** @format */

import React from "react";
import useForm from "@/Utils/Hooks/useForm";
import axios from "axios";

import InputEmail from "../../Atoms/InputEmail/InputEmail";
import { Checkbox, Anchor, Paper, Title, Text, Container, Space, Button, Box } from "@mantine/core";
import InputPassword from "../../Atoms/InputPassword/InputPassword";
import { useRouter } from "next/router";
import { useSport } from "@/Context/SportContext";
import { useWebSocket } from "@/Context/WebSocketContext";

const Login = () => {
  const [error, setError] = React.useState("");
  const router = useRouter();


  const loginUser = async (data) => {
    setError("");
    try {
      const response = await axios.post("/api/User", data, { params: { login: true } });
      const { token, PubsId } = response.data;
      localStorage.setItem("jwt", token);
      console.log(response,localStorage);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      resetForm();
      router.replace("/Remote");
    } catch (error) {
      setError(error.response.data);
    }
  };

  const [loginFormRef, handleLoginSubmit, resetForm] = useForm(loginUser);

  return (
    <Box
      component="form"
      sx={(theme) => ({
        width: "100%",
      })}
      ref={loginFormRef}
      onSubmit={handleLoginSubmit}
    >
      <Container size={560} my={40}>
        <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <InputEmail />
          <Space h="md" />
          <InputPassword />
          <Space h="lg" />
          {error && (
            <Text mb="lg" color="red">
              {error}
            </Text>
          )}
          <Checkbox label="Remember me" />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
