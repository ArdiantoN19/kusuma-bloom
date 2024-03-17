"use client";

import React, { useState, useEffect, useCallback } from "react";

const Timer = (Element: React.FC<any>) => {
  return function TimerWrapper(props: any) {
    const [time, setTime] = useState(props.defaultValue ?? 120); // 2 minutes in seconds

    useEffect(() => {
      const interval = setInterval(() => {
        setTime((prevTime: number) => {
          if (prevTime > 1) {
            return prevTime - 1;
          }
          return 0;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    const formatTime = useCallback((time: number) => {
      const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (time % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    }, []);

    if (time === 0) {
      return <Element {...props} />;
    }

    return <p className="text-sm font-bold">{formatTime(time)}</p>;
  };
};

export default Timer;
