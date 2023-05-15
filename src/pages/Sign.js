import React from "react";
import Login from "@/DesignSystem/Organisms/Login/Login";
import Register from "@/DesignSystem/Organisms/Register/Register";
import { Box } from "@mantine/core";

const Sign = () => {

  return (
    <Box    sx={(theme) => ({
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      width:"100%",
      height:"100%"
    })}>
    <Login ></Login>
   </Box>
  );
};

export default Sign;


