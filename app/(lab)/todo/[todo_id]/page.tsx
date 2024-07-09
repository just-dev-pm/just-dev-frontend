"use client";

import useSWR from "swr";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export default function TodoPage({ params }: { params: { todo_id: string } }) {
  const {
    data: todo,
    error,
    isLoading,
  } = useSWR<Todo>(
    `https://jsonplaceholder.typicode.com/todos/${params.todo_id}`
  );

  if (error) return <div>error!</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <p>用户ID: {todo?.userId}</p>
      <p>任务ID: {todo?.id}</p>
      <p>标题: {todo?.title}</p>
      <p>状态: {todo?.completed ? "完成" : "未完成"}</p>
    </div>
  );
}
