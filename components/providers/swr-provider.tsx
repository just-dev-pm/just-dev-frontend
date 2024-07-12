"use client";
import { testBaseUrl } from "@/lib/global";
import { logger } from "@/lib/swr-logger";
import { Suspense } from "react";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(testBaseUrl + url).then(res => res.json()),
        errorRetryCount: 3,
        suspense: true,
        use: [logger],
        onError: error => {
          // if (error.name === "auth") {
          //   throw new Error("验证错误");
          // } else {
          //   throw new Error("服务器错误");
          // }
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
