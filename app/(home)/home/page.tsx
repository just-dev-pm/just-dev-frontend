import { UserView } from "./components/user-view";

export default function UserPage() {
  // TODO: 向后端发送一个空带 cookie 的请求, 根据响应决定渲染行为.
  // then 如果返回用户数据, 那么根据用户数据渲染项目列表
  // then 没返回用户数据, 说明没登录, 跳转到登录页

  return <UserView />;
}
