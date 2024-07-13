'use client'

import { ChartCard } from "@/app/(home)/components/chartCard";
import { TasksTable } from "@/app/(home)/components/tasksTable";

export default function DashboardPage() {
  return <div>
  <ChartCard></ChartCard>
  <TasksTable></TasksTable>
  </div>;
}
