'use client'

import { useUserStore } from "@/store/userStore";
import { AssignedTasksTable } from "../components/assignedTasksTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useAssignedTasks from "@/app/api/task/get-assigned-tasks";
import Loading from "@/components/ui/loading";

export default function AssignedTasksPage() {
  const userId = useUserStore(stats => stats.userId);
  const {data,error} = useAssignedTasks({user_id:userId})
  const tasks = data.tasks;
  if(!tasks) return <Loading />
  return <div>
      <AssignedTasksTable data={tasks}></AssignedTasksTable>
  </div> 

}
