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
    <div className="space-y-6">
      <div className="flex items-start gap-8">
        <AssignedTaskTime userId={userId} className="flex-none w-[350px]" />
        <div className="flex-grow">
        <IncompletedTaskTable userId={userId} />
        </div>
      </div>
      <NewDraft userId={userId} className="flex-none" />
    </div>
  );
}
