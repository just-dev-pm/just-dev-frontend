import { BASE_URL } from "@/lib/global"
import useSWR from "swr"

/** @key [/api/projects/,{project_id},/requirements/,{requirement_id}] */

export default function useRequirement({project_id,requirement_id}:{project_id:string,requirement_id:string}){
    const urlPrefix = `/api/projects/`
    const urlMitfix = `/requirements/`
    const {data,error} = useSWR(
        (project_id && requirement_id ) ? [urlPrefix,project_id,urlMitfix,requirement_id] : null,
        ([urlPrefix,project_id,urlMitfix,requirement_id]) =>
            fetch(BASE_URL + urlPrefix + project_id + urlMitfix + requirement_id,{
            method:"GET",
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            },
            credentials:"include"
        }).then((res)=>{
            if(!res.ok){
                throw new Error(`Error! Status:${res.status}`)
            }
            return res.json();
        }),
        {suspense:true,fallbackData:{id:"",name:"",content:""}}
    );
    return {
        data,
        error,
    }
}