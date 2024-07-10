"use client";
import { SWRConfig } from "swr";
export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: ([url, options]) =>
          fetch(url, options).then(res => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
};
