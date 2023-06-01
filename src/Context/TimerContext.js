/** @format */

// TimerContext.js
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { useSport } from "./SportContext";
import { useWebSocket } from "./WebSocketContext";
import useAudio from "@/Utils/Hooks/useSound";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const WebSocketContext = useWebSocket();
  const SportContext = useSport();

  const [totalTime, setTotalTime] = React.useState(10000);

  // **********************
  // GAME
  // **********************

  // temps entre chaque periodes
  const PeriodDuration = React.useRef(0);

  // temps de pause entre chaque periodes
  const InterPeriodBreakDuration = React.useRef(0);

  // **********************
  // BIG PAUSE
  // **********************

  // nombre de periodes avant une plus grande pause
  const PeriodsBeforeBreak = React.useRef(0);

  // temps de pause de la grande pause
  const BreakDuration = React.useRef(0);

  // **********************
  // OVERTIME
  // **********************

  // nombre de periodes avant la prolongation
  const PeriodsBeforeOvertime = React.useRef(0);

  // nombre de periodes de prolongation
  const MaxOvertimePeriods = React.useRef(0);

  // temps de chaque periodes de la prolongation
  const OvertimeDuration = React.useRef(0);

  // temps de break entre chaque Overtime
  const OvertimeBreakDuration = React.useRef(0);

  // **********************
  // Temps MORTS
  // **********************

  const TimeOutsPerTeam = React.useRef(0);
  const TimeOutsDuration = React.useRef(0);

  const periodCount = useRef(0);
  const overtimeCount = useRef(0);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const timex = useRef(0);
  const pauseTimex = useRef(-1);
  const isPausex = useRef(false);
  const addedTimex = useRef(0);
  const nextPausex = useRef(0);
  const pauseDuration = useRef(InterPeriodBreakDuration.current);

  const isTimeOut = useRef(false);
  const timeOutTimex = useRef(0);
  const timeOutTEAM1Count = useRef(0);
  const timeOutTEAM2Count = useRef(0);

  const isBuzz = useRef(false);

  const startTimeout = (team) => {
    playBuzzerSound();
    isTimeOut.current = true;
    if (team === "TEAM1") {
      if (timeOutTEAM1Count.current === TimeOutsPerTeam.current) return;
      timeOutTEAM1Count.current += 1;
    } else if (team === "TEAM2") {
      timeOutTEAM2Count.current += 1;
    }
  };

  const endTimeout = () => {
    playBuzzerSound();
    isTimeOut.current = false;
    timeOutTimex.current = 0;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

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
    nextPausex.current = PeriodDuration.current;
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setTotalTime(10000);
    PeriodDuration.current = 0;
    InterPeriodBreakDuration.current = 0;
    PeriodsBeforeBreak.current = 0;
    BreakDuration.current = 0;
    PeriodsBeforeOvertime.current = 0;
    MaxOvertimePeriods.current = 0;
    OvertimeDuration.current = 0;
    OvertimeBreakDuration.current = 0;
    TimeOutsPerTeam.current = 0;
    TimeOutsDuration.current = 0;
    periodCount.current = 0;
    overtimeCount.current = 0;
    timex.current = 0;
    pauseTimex.current = -1;
    isPausex.current = false;
    addedTimex.current = 0;
    nextPausex.current = 0;
    pauseDuration.current = InterPeriodBreakDuration.current;
    isTimeOut.current = false;
    timeOutTimex.current = 0;
    timeOutTEAM1Count.current = 0;
    timeOutTEAM2Count.current = 0;
    setIsEnd(false);
  };
  
  const addTime = (additionalTime) => {
    addedTimex.current = addedTimex.current + additionalTime;
  };
  const playSound = useAudio("bball_buzzer.wav");
  const playBuzzerSound = async () => {
    // Mettez le timer en pause
    isBuzz.current = true;
    // Jouez le son du buzzer
    // Supposons que vous avez une fonction playSound qui retourne une promesse qui se résout une fois le son a fini de jouer
    await playSound(WebSocketContext.IsScreen ? 1 : 0);

    // Redémarrez le timer une fois le son a fini de jouer
    isBuzz.current = false;
  };
  const EndGame = () => {
    if(!WebSocketContext.IsScreen)
    modals.openConfirmModal({
      title: "Confirm Match End",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a modal. Please click one of these
          buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        setIsEnd(true);
        WebSocketContext.sendPostMessage("ShowWin","");
        setTimeout(() => {
          reset();
          SportContext.reset();
          WebSocketContext.reset();
        }, 5000);
      },
    });
  };

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      playBuzzerSound();
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        if (!isBuzz.current) {
          if (!isTimeOut.current) {
            if (!isPausex.current) {
              timex.current = timex.current + 1;

              if (timex.current === totalTime + addedTimex.current) {
                setIsRunning(false);
                EndGame();
                console.log("ENNNNNDD");
              }

              if (timex.current === nextPausex.current + addedTimex.current) {
                nextPausex.current = nextPausex.current + parseInt(PeriodDuration.current);
                periodCount.current += 1;
                // si il y a pas d'overtime la partie s'arrette
                if (
                  periodCount.current === parseInt(PeriodsBeforeOvertime.current) &&
                  parseInt(MaxOvertimePeriods.current) === 0
                ) {
                  setIsRunning(false);
                  EndGame();
                }

                // si la periode est une longue pause
                if (periodCount.current === parseInt(PeriodsBeforeBreak.current)) {
                  pauseDuration.current = parseInt(BreakDuration.current);
                } else if (InterPeriodBreakDuration.current) {
                  // determine la pause entre chaque periodes
                  pauseDuration.current = parseInt(InterPeriodBreakDuration.current);
                }

                // si il y a un overtime changement des settings pour l'overtime
                if (
                  periodCount.current >= parseInt(PeriodsBeforeOvertime.current) &&
                  overtimeCount.current < parseInt(MaxOvertimePeriods.current)
                ) {
                  overtimeCount.current += 1;
                  PeriodDuration.current = parseInt(OvertimeDuration.current);
                  pauseDuration.current = parseInt(OvertimeBreakDuration.current);
                } else if (
                  // si la l'overtime maximum est atteint c'est fini
                  periodCount.current >= parseInt(PeriodsBeforeOvertime.current) &&
                  overtimeCount.current >= parseInt(MaxOvertimePeriods.current)
                ) {
                  setIsRunning(false);
                  EndGame();
                }
                playBuzzerSound();
                pauseTimex.current = -1;
                isPausex.current = true;
              }
            }

            if (isPausex.current) {
              pauseTimex.current = pauseTimex.current + 1;

              if (pauseTimex.current === pauseDuration.current) {
                playBuzzerSound();
                isPausex.current = false;
                pauseTimex.current = -1;
                addedTimex.current = 0;
              }
            }
          }
          if (isTimeOut.current) {
            timeOutTimex.current = timeOutTimex.current + 1;

            if (timeOutTimex.current === TimeOutsDuration.current) {
              endTimeout();
            }
          }
        }
      }, 1000);
    }
    if (!isRunning) {
      if (timex.current > 0) playBuzzerSound();
      clearInterval(interval);
    }
    console.log("TIMER");
    return () => clearInterval(interval);
  }, [isRunning]);

  React.useEffect(() => {
    if (!WebSocketContext?.IsScreen) {
      WebSocketContext.sendPostMessage("timer", {
        time,
        isRunning,
        timex: timex.current,
        pauseTimex: pauseTimex.current,
        isPausex: isPausex.current,
        addedTimex: addedTimex.current,
        nextPausex: nextPausex.current,
        timeOutTEAM1Count: timeOutTEAM1Count.current,
        timeOutTEAM2Count: timeOutTEAM2Count.current,
        isTimeOut: isTimeOut.current,
        pauseDuration: pauseDuration.current,
        periodCount: periodCount.current,
        overtimeCount: overtimeCount.current,

        PeriodDuration: PeriodDuration.current,
        InterPeriodBreakDuration: InterPeriodBreakDuration.current,
        PeriodsBeforeBreak: PeriodsBeforeBreak.current,
        BreakDuration: BreakDuration.current,
        PeriodsBeforeOvertime: PeriodsBeforeOvertime.current,
        MaxOvertimePeriods: MaxOvertimePeriods.current,
        OvertimeDuration: OvertimeDuration.current,
        OvertimeBreakDuration: OvertimeBreakDuration.current,
        TimeOutsPerTeam: TimeOutsPerTeam.current,
        TimeOutsDuration: TimeOutsDuration.current,
      });
      console.log("SENDTIMER");
    }
  }, [
    // SportContext.Instance,
    // overtimeCount,
    // periodCount,
    pauseDuration,
    isTimeOut,
    isRunning,
    isPausex,
    addedTimex,
    timeOutTEAM1Count,
    timeOutTEAM2Count,
    // PeriodDuration,
    // InterPeriodBreakDuration,
    // PeriodsBeforeBreak,
    // BreakDuration,
    // PeriodsBeforeOvertime,
    // MaxOvertimePeriods,
    // OvertimeDuration,
    // OvertimeBreakDuration,
    // TimeOutsPerTeam,
    // TimeOutsDuration,
  ]);

  // recupere toutes les infos du payload pour les updates sur le screen
  React.useEffect(() => {
    if (!SportContext.Instance || !WebSocketContext.timerpayload) return;
    if (WebSocketContext.timerpayload.timex >= 0) {
      setIsRunning(WebSocketContext.timerpayload.isRunning);
      console.log(WebSocketContext.timerpayload.timex, timex.current);
      timex.current = WebSocketContext.timerpayload.timex;
      isPausex.current = WebSocketContext.timerpayload.isPausex;
      pauseTimex.current = WebSocketContext.timerpayload.pauseTimex;
      nextPausex.current = WebSocketContext.timerpayload.nextPausex;
      addedTimex.current = WebSocketContext.timerpayload.addedTimex;
      timeOutTEAM1Count.current = WebSocketContext.timerpayload.timeOutTEAM1Count;
      timeOutTEAM2Count.current = WebSocketContext.timerpayload.timeOutTEAM2Count;
      isTimeOut.current = WebSocketContext.timerpayload.isTimeOut;
      pauseDuration.current = WebSocketContext.timerpayload.pauseDuration;
      periodCount.current = WebSocketContext.timerpayload.periodCount;
      overtimeCount.current = WebSocketContext.timerpayload.overtimeCount;

      PeriodDuration.current = WebSocketContext.timerpayload.PeriodDuration;
      InterPeriodBreakDuration.current = WebSocketContext.timerpayload.InterPeriodBreakDuration;
      PeriodsBeforeBreak.current = WebSocketContext.timerpayload.PeriodsBeforeBreak;
      BreakDuration.current = WebSocketContext.timerpayload.BreakDuration;
      PeriodsBeforeOvertime.current = WebSocketContext.timerpayload.PeriodsBeforeOvertime;
      MaxOvertimePeriods.current = WebSocketContext.timerpayload.MaxOvertimePeriods;
      OvertimeDuration.current = WebSocketContext.timerpayload.OvertimeDuration;
      OvertimeBreakDuration.current = WebSocketContext.timerpayload.OvertimeBreakDuration;
      TimeOutsPerTeam.current = WebSocketContext.timerpayload.TimeOutsPerTeam;
      TimeOutsDuration.current = WebSocketContext.timerpayload.TimeOutsDuration;

      console.log("PAYLOAD");
    }
  }, [WebSocketContext.timerpayload]);

  // init la config si le context change
  React.useEffect(() => {
    if (!SportContext.Config || WebSocketContext.IsScreen) return;
    PeriodDuration.current = parseInt(SportContext.Config.Parameters.PeriodDuration);
    InterPeriodBreakDuration.current = parseInt(SportContext.Config.Parameters.InterPeriodBreakDuration);
    PeriodsBeforeBreak.current = parseInt(SportContext.Config.Parameters.PeriodsBeforeBreak);
    BreakDuration.current = parseInt(SportContext.Config.Parameters.BreakDuration);
    PeriodsBeforeOvertime.current = parseInt(SportContext.Config.Parameters.PeriodsBeforeOvertime);
    MaxOvertimePeriods.current = parseInt(SportContext.Config.Parameters.MaxOvertimePeriods);
    OvertimeDuration.current = parseInt(SportContext.Config.Parameters.OvertimeDuration);
    OvertimeBreakDuration.current = parseInt(SportContext.Config.Parameters.OvertimeBreakDuration);
    TimeOutsPerTeam.current = parseInt(SportContext.Config.Parameters.TimeOutsPerTeam);
    TimeOutsDuration.current = parseInt(SportContext.Config.Parameters.TimeOutsDuration);

    nextPausex.current = parseInt(SportContext.Config.Parameters.PeriodDuration);
    console.log("CONFIG LASTCONFIG");
  }, [SportContext.Config]);

  return (
    <TimerContext.Provider
      value={{
        time,
        startTimer,
        pauseTimer,
        resetTimer,
        addTime,
        formatTime,
        isRunning,
        timex,
        pauseTimex,
        isPausex,
        addedTimex,
        nextPausex,
        startTimeout,
        periodCount,
        timeOutTEAM1Count,
        timeOutTEAM2Count,
        isTimeOut,
        timeOutTimex,
        isEnd,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
