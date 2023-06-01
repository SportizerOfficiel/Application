// import { useEffect } from 'react'
// import io from 'socket.io-client'

// const socket = io(process.env.SOCKETURL)

// export default function useSocket(eventName, cb) {
//   useEffect(() => {
//     socket.on(eventName, cb)

//     return function useSocketCleanup() {
//       socket.off(eventName, cb)
//     }
//   }, [eventName, cb])

//   return socket
// }
import io from 'socket.io-client';

const socket = io('ws://localhost:8080');

function useSocket() {
  React.useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected to the server: ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log(`Disconnected from the server`);
    });

    socket.on('message', (message) => {
      console.log(`Received message:`, message);
    });
    socket.on('instance', (instance) => {
      console.log(`Received instance:`, instance);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
}

export default useSocket;