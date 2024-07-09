import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import TodoList from "./tasksBoardList"

export function TaskDialog(){
    const message = "Add Task"
    const members = [{id:1,name:"Bob"},{id:2,name:"Alex"}]
    const todoListName = "Backlog"
    const tasks = [{id:1,name:"Cookie"},{id:2,name:"Hello?"}]
    return(
        <div className="flex gap-6">
            {/* <TaskDialog message={message} members={members}></TaskDialog> */}
            <TodoList todoListName={todoListName} tasks={tasks} dialogMessage={message} dialogMembers={members} ></TodoList>
            <TodoList todoListName={todoListName} tasks={tasks} dialogMessage={message} dialogMembers={members} ></TodoList>
            <Button className="w-80"><Plus></Plus>{"Add Column"}</Button>
        </div>
    )
  }