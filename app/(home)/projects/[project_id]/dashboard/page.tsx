'use client'

import { ChartCard } from "@/app/(home)/components/chartCard";
import { DataTableDemo } from "@/app/(home)/components/tasksTable";

export default function DashboardPage() {
  return <div>
  <ChartCard></ChartCard>
  <DataTableDemo></DataTableDemo>
  </div>;
}
