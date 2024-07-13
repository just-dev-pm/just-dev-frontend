export class MyError {
  status: number = 200;
  info: string = "发生错误";
  when = "";
}
export const handleResponse =
  (when: string = "", info: string = "") =>
  (res: Response) => {
    if (!res.ok) {
      let error = new Error() as any;
      error.when = when;
      error.info = info;
      if (res.status >= 400 && res.status < 500) {
        error.status = 400;
      } else {
        error.status = 500;
      }
      throw error;
    }
    return res;
  };
