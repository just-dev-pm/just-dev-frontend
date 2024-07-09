import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NoStyleInput } from "./noStyleInput"
import { X } from "lucide-react"
import TaskDialog from "./taskDialogButton"


type Props = {
    todoListName:string
    tasks: {id:number,name:string}[]
    dialogMessage: string
    dialogMembers:{id:number,name:string}[]
}



function TodoList({todoListName,tasks,dialogMessage,dialogMembers}:Props) {
    const [isShow,SetShow] = React.useState(true);
    const handleShowChange = ()=>{
        SetShow(!isShow)
    }
  return (
    isShow && <Card className="w-[350px]">
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
          <div className="flex items-center">
              <NoStyleInput className="h-10" value={todoListName}/>
          </div>
          <div className="flex items-center h-10">
            <Button  onClick={handleShowChange} className="bg-white text-black hover:bg-white">
            <X className="h-full"></X>
            </Button>
          </div>
      </CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-2">
      {tasks.map((task)=>(
          <NoStyleInput className="border-slate-200 border-solid border rounded-md" value={task.name} key={task.id}>
          </NoStyleInput>
      ))}
    </CardContent>
    <CardFooter>
      <TaskDialog message={dialogMessage} members={dialogMembers}></TaskDialog>
    </CardFooter>
  </Card>

  )
}

export default TodoList