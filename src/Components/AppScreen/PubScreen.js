import { Box, Paper } from "@mantine/core";
import React, { useEffect, useState } from "react";
import TimerScreen from "./TimerScreen";

const Pub = ({ videos }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [height, setheight] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 30000);
    setheight(window.innerHeight)
    return () => {
      clearInterval(timer);
    };
  }, [videos]);

  const currentVideo = videos[currentVideoIndex];

  return (
    <Box 
    
    sx={(theme)=>({
        width:"100vw",
        height:"100vh",
        maxHeight:"100vh",
        position:"relative"
    })}>
           <Paper
        withBorder
        shadow="md"

        radius="md"
        sx={(theme) => ({
            height: `${height * 0.84}px`,
            width: "100%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
              // position:"absolute",
              // top:0,
          })}
      >
      <iframe
     width="100%"
     height={`100%`}
     src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&controls=0`}
     frameBorder="0"
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowFullScreen
     title="Embedded youtube"
      ></iframe>
         </Paper>
         <Paper
        withBorder
        shadow="md"

        radius="md"
        sx={(theme) => ({
          height: `${height * 0.15}px`,
          width: "100%",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
            // position:"absolute",
            // top:0,
        })}
      >
        <TimerScreen />
      </Paper>
   
    </Box>
  );
};

export default Pub;
