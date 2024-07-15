import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
  } from "@/components/ui/dropdown-menu";
  import { MoreHorizontal } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import useRequirementDelete from "@/app/api/requirements/delete-requirement";
  import Link from "next/link";
  import useProjectRequirements from "@/app/api/requirements/get-project-requirements";
  import { mutate } from "swr";
  
  export default function TasksDropdown({
    task_list_id,
    task_id,
    handleDelete
  }: {
    task_list_id:string
    task_id: string;
    handleDelete:(task_id:string)=>void;
  }) {
      // const {mutate} = useProjectRequirements({project_id})
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={`./${task_list_id}/${task_id}`}>查看详情</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(task_id)}
          >
            复制任务ID
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuItem
            onClick={()=>{handleDelete(task_id)}}
          >
            删除任务
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  