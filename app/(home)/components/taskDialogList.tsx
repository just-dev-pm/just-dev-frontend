import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TodoList from "./tasksBoardList";
import { dialog_data } from "@/lib/Mockdata";

export function TaskDialog() {
  return (
    <div className="flex gap-6">
      {dialog_data.map((mockData) => (
        <TodoList
          todoListName={mockData.todoListName}
          tasks={mockData.tasks}
          dialogMessage={"Add Task"}
          dialogMembers={mockData.members}
        ></TodoList>
      ))}
      <Button className="w-80">
        <Plus></Plus>
        {"Add Column"}
      </Button>
    </div>
  );
}
