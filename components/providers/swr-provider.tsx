"use client";
import { testBaseUrl } from "@/lib/global";
import { Suspense } from "react";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig value={{ fetcher: (url:string) => fetch(testBaseUrl+url).then(res => res.json()) ,errorRetryCount:3,suspense:true }}>
      
      {children}
    </SWRConfig>
  );
};
