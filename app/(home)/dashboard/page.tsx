"use client";

import NewDraft from "@/components/personal-dashboard/NewDraft";
import { ChartCard } from "../components/chartCard";
import { TasksTable } from "../tasks/components/tasksTable";
import { useUserStore } from "@/store/userStore";
import IncompletedTaskTable from "@/components/personal-dashboard/IncompletedTaskTable";
import AssignedTaskTime from "@/components/personal-dashboard/AssignedTaskTime";

export default function DashboardPage() {
  const userId = useUserStore.getState().userId;
  return (
    <div>
      <NewDraft userId={userId} />
      <IncompletedTaskTable userId={userId} />
      <AssignedTaskTime userId={userId} className="" />
    </div>
  );
}
