import React from 'react';
import { PasswordInput, Text, Group, PasswordInputProps, Anchor } from '@mantine/core';

const  InputPassword = ({ className, style, ...props}) => {
  return (
    <div className={className} style={style}>
      <Group position="apart" mb={5}>
        <Text component="label" htmlFor="your-password" size="sm" weight={500}>
          Your password
        </Text>

        <Anchor
          href="#"
          onClick={(event) => event.preventDefault()}
          sx={(theme) => ({
            paddingTop: 2,
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
            fontWeight: 500,
            fontSize: theme.fontSizes.xs,
          })}
        >
          Forgot your password?
        </Anchor>
      </Group>
      <PasswordInput placeholder="Your password" id="your-password" name='Password' {...props} />
    </div>
  );
}

export default InputPassword