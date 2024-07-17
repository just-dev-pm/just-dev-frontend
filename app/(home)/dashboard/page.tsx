"use client"

import NewDraft from "@/components/personal-dashboard/NewDraft";
import { ChartCard } from "../components/chartCard";
import { TasksTable } from "../tasks/components/tasksTable";
import { useUserStore } from "@/store/userStore";


export default function DashboardPage() {
  const userId = useUserStore.getState().userId;
  return (
    <div>
      <NewDraft userId={userId} />
    </div>
  )
}
