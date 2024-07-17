/** @key /api/task_lists/{task_list_id}/tasks */

import { statusSchema } from "@/app/(home)/tasks/components/form/create-task-context";
import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation"
import {z} from "zod"



export default function useTaskCreate({task_list_id}:{task_list_id:string}){
    const {toast} = useToast();
    const urlPrefix = `/api/task_lists/`
    const urlSuffix = `/tasks`
    const {data,error,trigger} = useSWRMutation(
        task_list_id ? [urlPrefix,task_list_id,urlSuffix] : null,
        ([urlPrefix,task_list_id,urlSuffix],{arg}:{arg:Form}) =>
            fetch(BASE_URL + urlPrefix + task_list_id + urlSuffix,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json; charset=UTF-8",
                },
                body: JSON.stringify(arg),
                credentials:"include"
            }).then(handleResponse("添加任务"))
            .then((res)=> res.json())
            ,{
                onError(){
                    toast({description:"添加失败"})
                },onSuccess(){
                    toast({description:"添加成功"})
                }
            }
    )
    return {
        data,error,trigger
    }
}

const formSchema = z.object({
    name: z.string().min(1, "任务名不能为空"),
    description: z.string().min(1, "任务描述不能为空"),
    assignees: z.array(z.object({id:z.string()})),
    deadline: z.date({ required_error: "截止时间不能为空" }),
    pr: z.string(),
    status: statusSchema,
  });
  
  type Form = z.infer<typeof formSchema>;