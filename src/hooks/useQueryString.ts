"use client";

import { createQueryString } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type RedirectURLType = {
  path: string;
  params?: { key: string; value: string }[];
};

const useQueryString = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectURL = useCallback(
    ({ path, params }: RedirectURLType) => {
      const url = createQueryString(path, params);
      router.push(url);
    },
    [router]
  );

  const generateCurrentParams = useCallback(() => {
    return Array.from(searchParams.keys()).map((key: any, index: number) => ({
      key,
      value: Array.from(searchParams.values())[index],
    }));
  }, [searchParams]);

  const replaceURL = useCallback(
    (params?: { key: string; value: string }[]) => {
      let url = "";
      if (params && params.length) {
        url = createQueryString(
          pathname,
          generateCurrentParams().concat(params)
        );
      } else {
        url = createQueryString(pathname, generateCurrentParams());
      }
      router.replace(url);
    },
    [generateCurrentParams, pathname, router]
  );

  return [redirectURL, replaceURL];
};

export default useQueryString;
