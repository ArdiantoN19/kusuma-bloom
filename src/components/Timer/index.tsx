"use client";

import { createQueryString } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";

const Timer = (Element: React.FC<any>) => {
  return function TimerWrapper(props: any) {
    const [time, setTime] = useState<number>(props.defaultValue ?? 120); // 2 minutes in seconds
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

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
        const url = createQueryString(pathname, [
          { key: "email", value: searchParams.get("email")! },
          {
            key: "verification_send",
            value: searchParams.get("verification_send")!,
          },
          { key: "token", value: searchParams.get("token")! },
          { key: "isFinished", value: "1" },
        ]);
        router.replace(url);
      }

      return () => clearInterval(interval);
    }, [time, pathname, router, searchParams]);

    const formatTime = useCallback((time: number) => {
      const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (time % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    }, []);

    if (searchParams.get("isFinished") === "1" || time === 0) {
      return <Element {...props} />;
    }

    return <p className="text-sm font-bold">{formatTime(time)}</p>;
  };
};

export default Timer;
