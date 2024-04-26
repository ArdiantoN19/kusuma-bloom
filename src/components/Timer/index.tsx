"use client";

import useQueryString from "@/hooks/useQueryString";
import { calculateTimeInSecondsLeft } from "@/utils";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useCallback, useMemo } from "react";

const Timer = (Element: React.FC<any>) => {
  return function TimerWrapper(props: any) {
    const searchParams = useSearchParams();
    const [, replaceURL]: any = useQueryString();

    const data = useMemo(
      () => ({
        timeInSecondsLeft:
          calculateTimeInSecondsLeft(Number(searchParams.get("expired"))) || 0,
      }),
      [searchParams]
    );
    const [time, setTime] = useState<number>(120);

    useEffect(() => {
      setTime(data.timeInSecondsLeft);
    }, [data.timeInSecondsLeft]);

    useEffect(() => {
      const interval = setInterval(() => {
        setTime((prevTime: number) => {
          if (prevTime > 1) {
            return prevTime - 1;
          }
          return 0;
        });
      }, 1000);

      if (time === 0) {
        const params = [{ key: "isFinished", value: "1" }];
        replaceURL(params);
      }

      return () => clearInterval(interval);
    }, [replaceURL, time]);

    const formatTime = useCallback((time: number) => {
      const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (time % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    }, []);

    if (time < 1 || searchParams.get("isFinished") === "1") {
      return <Element {...props} />;
    }

    return <p className="text-sm font-bold">{formatTime(time)}</p>;
  };
};

export default Timer;
