import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TasksLayout({
  children,
  assigned,
}: {
  children: React.ReactNode;
  assigned: React.ReactNode;
}) {
  return (
    <div>
      <Tabs defaultValue="person">
        <TabsList>
          <TabsTrigger value="person">个人任务</TabsTrigger>
          <TabsTrigger value="project">被分配任务</TabsTrigger>
        </TabsList>
        <TabsContent value="person">{children}</TabsContent>
        <TabsContent value="project">{assigned}</TabsContent>
      </Tabs>
    </div>
  );
}
