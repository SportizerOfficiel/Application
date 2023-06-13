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
  const timeOutTimex = useRef(-1);
  const timeOutTEAM1Count = useRef(0);
  const timeOutTEAM2Count = useRef(0);

  const isBuzz = useRef(false);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const startTimer = () => {
    WebSocketContext.BroadCastMessage("start");
  };

  const pauseTimer = () => {
    WebSocketContext.BroadCastMessage("stop");
  };
  const startTimeout = (team) => {
    WebSocketContext.BroadCastMessage("timeout", { team });
  };

  const addTime = (additionalTime) => {
    WebSocketContext.BroadCastMessage("addTime", { additionalTime });
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
    timeOutTimex.current = -1;
    timeOutTEAM1Count.current = 0;
    timeOutTEAM2Count.current = 0;
    setIsEnd(false);
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
    if (!WebSocketContext.IsScreen)
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
          WebSocketContext.BroadCastMessage("ShowWin");

          SportContext.SaveMatch(
            time,
            ()=>{
            setTimeout(() => {
              reset();
              SportContext.reset();
              WebSocketContext.reset();
            }, 30000)}
          );
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
                isPausex.current = false;
                playBuzzerSound();
                pauseTimex.current = -1;
                addedTimex.current = 0;
              }
            }
          } else if (isTimeOut.current) {
            timeOutTimex.current = timeOutTimex.current + 1;

            if (timeOutTimex.current === TimeOutsDuration.current) {
              isTimeOut.current = false;
              playBuzzerSound();
              timeOutTimex.current = -1;
            }
          }
        }
      }, 1000);
    }
    if (!isRunning) {
      if (timex.current > 0) playBuzzerSound();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  React.useEffect(() => {
    if (SportContext.Instance && !WebSocketContext?.IsScreen) {
      WebSocketContext.BroadCastMessage("sync", {
        time,
        isRunning,
        timex: timex.current,
        pauseTimex: pauseTimex.current,
        isPausex: isPausex.current,
        addedTimex: addedTimex.current,
        nextPausex: nextPausex.current,
        timeOutTEAM1Count: timeOutTEAM1Count.current,
        timeOutTEAM2Count: timeOutTEAM2Count.current,
        timeOutTimex: timeOutTimex.current,
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

    }
  }, [SportContext.Instance]);

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
 
  }, [SportContext.Config]);

  const GetTimeoutCount = (team) => {
    if (team === "TEAM1") {
      return timeOutTEAM1Count.current;
    } else if (team === "TEAM2") {
      return timeOutTEAM2Count.current;
    }
  };

  useEffect(() => {
    const unsubscribeStart = WebSocketContext.onSocket("start", () => {
      setIsRunning(true);
    });

    const unsubscribeStop = WebSocketContext.onSocket("stop", () => {
      setIsRunning(false);
    });

    const unsubscribeAddTime = WebSocketContext.onSocket("addTime", (data) => {
      addedTimex.current = addedTimex.current + data.additionalTime;
    });

    const unsubscribeTimeOut = WebSocketContext.onSocket("timeout", (data) => {
      playBuzzerSound();
      isTimeOut.current = true;
      if (data.team === "TEAM1") {
        if (timeOutTEAM1Count.current === TimeOutsPerTeam.current) return;
        timeOutTEAM1Count.current += 1;
      } else if (data.team === "TEAM2") {
        timeOutTEAM2Count.current += 1;
      }
    });

    const unsubscribeSync = WebSocketContext.onSocket("sync", (data) => {
      timex.current = data.timex;
      timeOutTimex.current = data.timeOutTimex;
      timeOutTEAM1Count.current = data.timeOutTEAM1Count;
      timeOutTEAM2Count.current = data.timeOutTEAM2Count;
      isTimeOut.current = data.isTimeOut;
      isPausex.current = data.isPausex;
      pauseTimex.current = data.pauseTimex;
      nextPausex.current = data.nextPausex;
      addedTimex.current = data.addedTimex;

      pauseDuration.current = data.pauseDuration;
      periodCount.current = data.periodCount;
      overtimeCount.current = data.overtimeCount;

      PeriodDuration.current = data.PeriodDuration;
      InterPeriodBreakDuration.current = data.InterPeriodBreakDuration;
      PeriodsBeforeBreak.current = data.PeriodsBeforeBreak;
      BreakDuration.current = data.BreakDuration;
      PeriodsBeforeOvertime.current = data.PeriodsBeforeOvertime;
      MaxOvertimePeriods.current = data.MaxOvertimePeriods;
      OvertimeDuration.current = data.OvertimeDuration;
      OvertimeBreakDuration.current = data.OvertimeBreakDuration;
      TimeOutsPerTeam.current = data.TimeOutsPerTeam;
      TimeOutsDuration.current = data.TimeOutsDuration;
    });

    // Call the unsubscribe functions when the component is unmounted
    return () => {
      unsubscribeStart();
      unsubscribeStop();
      unsubscribeSync();
      unsubscribeTimeOut();
      unsubscribeAddTime();
    };
  }, []);
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
        GetTimeoutCount,
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
