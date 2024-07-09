'use client'

import { JustDevPieChart } from "@/app/(home)/components/pieChart";
import { DataTableDemo } from "@/app/(home)/components/tasksTable";

export default function DashboardPage() {
  return <div>
    <JustDevPieChart></JustDevPieChart>
    <DataTableDemo></DataTableDemo>
  </div>;
}
