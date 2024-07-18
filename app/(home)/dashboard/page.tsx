"use client";

import NewDraft from "@/components/personal-dashboard/NewDraft";
import { useUserStore } from "@/store/userStore";
import IncompletedTaskTable from "@/components/personal-dashboard/IncompletedTaskTable";
import AssignedTaskTime from "@/components/personal-dashboard/AssignedTaskTime";

export default function DashboardPage() {
  const userId = useUserStore.getState().userId;
  return (
    <div className="flex gap-x-8">
      <div className="space-y-6 flex-none">
        <AssignedTaskTime userId={userId} className="flex-none w-[350px]" />
        <NewDraft userId={userId} className="" />
      </div>
      <div className="flex-grow">
        <IncompletedTaskTable userId={userId} />
      </div>
    </div>
  );
}
