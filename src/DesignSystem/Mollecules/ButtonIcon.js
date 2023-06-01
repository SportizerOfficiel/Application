/** @format */

import { UnstyledButton } from "@mantine/core";
import React from "react";

const ButtonIcon = ({ children, props }) => {
  return (
    <UnstyledButton
      
    
      sx={(theme) => ({
        minWidth:"110px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: theme.spacing.sm,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
       
      })}
      {...props}
    >
      {children}
    </UnstyledButton>
  );
};

export default ButtonIcon;
