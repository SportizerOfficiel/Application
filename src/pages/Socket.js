/** @format */
import React from "react";
import { useState } from "react";
import axios from "axios";

function ChatForm() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [Key, setKey] = useState("");

  function sendMessage(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/api/send-message/${Key}`, { message })
      .then((response) => {
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // React.useEffect(() => {
  //   axios
  //     .get("http://localhost:8000")
  //     .then((res) => {
  //       console.log(res.data.key);
  //       setKey(res.data.key);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  React.useEffect(() => {
    if (!Key) return;
    const socket = new WebSocket(`ws://localhost:8000/${Key}`);

    socket.addEventListener("message", function (event) {
      const message = event.data;
      setMessages([...messages, message]);
    });

    return () => {
      socket.close();
    };
  }, [messages, Key]);

  return (
    <>
      <input onChange={(e) => setKey(e.target.value)}></input>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Envoyer</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </>
  );
}

export default ChatForm;
