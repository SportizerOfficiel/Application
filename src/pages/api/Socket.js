import { Server } from "socket.io";
import messageHandler from "../../utils/sockets/messageHandler";

export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = (socket) => {
    messageHandler(io, socket);
  };

  // Define actions inside
  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
}

import { useEffect } from 'react'
import io from 'socket.io-client'

const socket = io()

export default function useSocket(eventName, cb) {
  useEffect(() => {
    socket.on(eventName, cb)

    return function useSocketCleanup() {
      socket.off(eventName, cb)
    }
  }, [eventName, cb])

  return socket
}