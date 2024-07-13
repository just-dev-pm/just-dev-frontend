import { Middleware, SWRHook } from "swr";

export const logger: Middleware = (useSWRNext: SWRHook) => {
  return (key, fetcher, config) => {
    if (fetcher === null) return useSWRNext(key, config);
    // 将日志记录器添加到原始 fetcher。
    const extendedFetcher = (...args: Parameters<typeof fetch>) => {
      console.log("SWR Request:", key);
      // if (fetcher(...args) instanceof Promise<any>) {

      // };
      // console.log(typeof fetcher(...args));
      return fetcher(...args);
    };

    // 使用新的 fetcher 执行 hook。
    return useSWRNext(key, extendedFetcher, config);
  };
};
