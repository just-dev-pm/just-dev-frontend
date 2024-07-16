"use client";

import { ChartCard } from "@/app/(home)/components/chartCard";
import { TasksTable } from "@/app/(home)/tasks/components/tasksTable";

export default function DashboardPage() {
  return (
    <div>
      <ChartCard></ChartCard>
      <TasksTable data={[]} task_list_id={""}></TasksTable>
    </div>
  );
}
