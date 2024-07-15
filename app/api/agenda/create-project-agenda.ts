/** @key [/api/projects/,{project_id},/agendas] */

import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import useSWRMutation from "swr/mutation";

type event = {
    id: string;
};

export default function useProjectAgendaCreate({project_id}:{project_id:string}){
    const {toast} = useToast();
    const urlPrefix = `/api/projects/`
    const urlSuffix = `/agendas`
    const {data,error,trigger} = useSWRMutation(
        project_id ? [urlPrefix,project_id,urlSuffix] : null,
        ([urlPrefix,project_id,urlSuffix],{arg}:{arg:{name:string,events:event[]}})=>
            fetch(BASE_URL + urlPrefix + project_id + urlSuffix,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                body:JSON.stringify(arg),
                credentials:"include"
            }).then(handleResponse("创建项目日程"))
            .then((res)=> res.json()),
            {
                onError(error){
                    toast({description:"创建失败"})
                },
                onSuccess(data){
                    toast({description:"创建成功"})
                }
            }
    )
    return {
        data,error,trigger
    }
}