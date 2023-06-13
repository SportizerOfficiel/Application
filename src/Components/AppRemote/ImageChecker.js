/** @format */

import { Input, Button, Text } from "@mantine/core";
import React, { useState } from "react";

function ImageChecker({ Submit }) {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const checkImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = url;
    });
  };

  const handleCheck = async () => {
    try {
      
      await checkImage(url);
      Submit(url);
      setMessage("");
    } catch {
      setMessage("Image URL is not valid");
    }
  };

  return (
    <>
      <Input
        type="text"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
        error={message}
        placeholder="Enter image URL"
      />
        {message && <Text color="red" my="md">{message}</Text>}
      <Button fullWidth onClick={handleCheck} mt="md" size="md">
        Save
      </Button>
    </>
  );
}

export default ImageChecker;
