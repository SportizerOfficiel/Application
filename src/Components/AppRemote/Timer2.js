import { Button, Flex, Title } from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";
import { modals } from "@mantine/modals";
import { TimeInput } from "@mantine/dates";
import { useSport } from "@/Context/SportContext";

const Timer = () => {
  const SportContext = useSport()
  const totalTime = SportContext.Config.Parameters.GameDuration;
  const pauseInterval = SportContext.Config.Parameters.HalfTimeDuration;
  const pauseDuration = SportContext.Config.Parameters.HalfTimeBreakTime;
  const [time, setTime] = useState(0);
  const timex = useRef(0);
  const pauseTimex = useRef(0);
  const isPausex = useRef(false);
  const addedTimex = useRef(0);
  const nextPausex = useRef(pauseInterval);
  const [isRunning, setIsRunning] = useState(false);
  const [pauseTime, setPauseTime] = useState(pauseDuration);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
      if (!isPausex.current) {
        timex.current = timex.current + 1;

        if (timex.current === totalTime + addedTimex.current) {
          setIsRunning(false);
          console.log("ENNNNNDD");
        }

        if (timex.current === nextPausex.current + addedTimex.current) {
          isPausex.current = true;
          nextPausex.current = nextPausex.current + pauseInterval;
        }
      }

      if (isPausex.current) {
        pauseTimex.current = pauseTimex.current + 1;
        if (pauseTimex.current === pauseDuration) {
          isPausex.current = false;
          pauseTimex.current = 0;
          addedTimex.current = 0;
        }
      }
    }, 1000);

    if (!isRunning) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, pauseInterval, pauseTime, pauseDuration]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    timex.current = 0;
    pauseTimex.current = 0;
    isPausex.current = false;
    addedTimex.current = 0;
    nextPausex.current = pauseInterval;
  };

  const addTime = (additionalTime) => {
    addedTimex.current = addedTimex.current + additionalTime;
  };

  const openDeleteModal = () =>
    modals.open({
      title: "Ajout Temps additionnel",
      centered: true,
      yOffset:"1vh",
      children: (
        <Flex py="xl" gap="xl" justify="center" wrap="wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              color="yellow"
              radius="xs"
              size="xl"
              uppercase
              onClick={() =>{ addTime(num * 60); modals.closeAll()} }
            >
              +{num}
            </Button>
          ))}
        </Flex>
      ),
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  return (
    <Flex direction="column"  px="xl" gap="xl">
      <Title
        order={1}
        style={{
          color:
            timex.current <= nextPausex.current + addedTimex.current && timex.current >= nextPausex.current
              ? "red"
              : "black",
        }}
        sx={(theme) => ({
            textAlign:"center",
          fontSize: "4rem",
          width: "100%",
        })}
      >
        {formatTime(timex.current)}
      </Title>
      {isPausex.current && <p>Pause Time: {formatTime(pauseTimex.current)}</p>}
      <p>Added Time: {formatTime(addedTimex.current)}</p>
      <Button size="xl" onClick={resetTimer}>Reset</Button>
      {!isRunning && <Button size="xl" onClick={startTimer}>Start</Button>}
      {isRunning && <Button color="red" size="xl" onClick={pauseTimer}>Temps Mort</Button>}
      <Button size="xl" >Buzzer</Button>
      <Button size="xl" onClick={() => openDeleteModal()}>Temps additionnel</Button>
    </Flex>
  );
};

export default Timer;
