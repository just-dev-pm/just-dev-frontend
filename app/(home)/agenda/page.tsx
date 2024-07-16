// TODO : 正确使用useEffect控制数据获取过程，保证数据状态只会存在一份
// 问题： 107行代码的加入会导致重新聚焦到这个页面时，曾经的数据清空，如果没有107行代码，则重新聚焦到页面时会导致重复的数据被加入到状态中
// TODO : 为idsAndNams设定checked值，并且根据AgendaDataSheeet中的选择让其状态发生改变，最终实现只获取选中的agenda的值

"use client";

import { Label } from "@/components/ui/label";
import AgendaDataSheeet from "./components/AgendaDataSheet";
import Calendar from "./components/calendar";
import useUserAgenda from "@/app/api/agenda/get-user-agenda";
import { useUserStore } from "@/store/userStore";
import Loading from "@/components/ui/loading";
import { useEffect, useMemo, useState } from "react";
import { BASE_URL } from "@/lib/global";
import { handleResponse } from "@/lib/handle-response";
import moment from "moment";

type agenda = {
  id: string;
  name: string;
  events: { event_id: string }[];
};

type event_res = {
  description: string;
  end_time: string;
  id: string;
  name: string;
  participants: Participant[];
  start_time: string;
};

type Participant = {
  id: string;
};

export default function AgendaPage() {
  const userId = useUserStore((stats) => stats.userId);
  const { data, error,isLoading } = useUserAgenda({
    user_id: userId,
  });
  const [idsAndNames, setIdsAndNames] = useState<
    { id: string; name: string }[]
  >([]);
  const [events_new, setEvents_new] = useState<any[]>([]);

  const agendas = data.agendas;

  const urlPrefix = `/api/agendas/`;
  const urlSuffix = `/events`;
  const fetcher = (agenda_id: string) =>
    fetch(BASE_URL + urlPrefix + agenda_id + urlSuffix, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then(handleResponse("获取事件"))
      .then((res) => res.json());


  // const events_newMemo = useMemo(()=>{
  //   if(!agendas || agendas.length === 0 || idsAndNames.length !== agendas.length){
  //     return [];
  //   }
  //   const fetchPromises = idsAndNames.map(({id})=>
  //     fetcher(id).then((res)=> res.events));
  //   return Promise.all(fetchPromises).then((eventsArrays) => {
  //     const allEvents = eventsArrays.flat();
  //     return allEvents.map((event)=>({
  //       id: event.id,
  //       title: event.name,
  //       start: moment(
  //         event.start_time,
  //         "YYYY-MM-DDThh:mm:ss[.mmm]TZD"
  //       ).toDate(),
  //       end: moment(
  //         event.end_time,
  //         "YYYY-MM-DDThh:mm:ss[.mmm]TZD"
  //       ).toDate(),
  //       data: {
  //         // agenda_id: id,
  //         description: event.description,
  //         participants: event.participants,
  //       },
  //     }))
  //   })
  // },[agendas,idsAndNames])

  // useEffect(()=>{
  //   if(events_newMemo){
  //     events_newMemo.then((fetchedEvents)=>{
  //       setEvents_new(fetchedEvents);
  //     })
  //   }
  // },[events_newMemo])

  useEffect(() => {
    if(!data || isLoading) return ;
    if (data) {
      agendas.map((agenda: agenda) => {
        setIdsAndNames((stats) => [
          ...stats,
          { id: agenda.id, name: agenda.name },
        ]);
      });
      setEvents_new([])
      return;
    }
  }, [data]);

  useEffect(() => {
    if (agendas.length !== 0) {
      if (idsAndNames.length === agendas.length) {
        idsAndNames.map(async ({ id }) => {
          let data = await fetcher(id);
          let events = data.events;
          if (events) {
            events.map((event: event_res) => {
              const startDate = moment(
                event.start_time,
                "YYYY-MM-DDThh:mm:ss[.mmm]TZD"
              ).toDate();
              const endDate = moment(
                event.end_time,
                "YYYY-MM-DDThh:mm:ss[.mmm]TZD"
              ).toDate();
              let event_new = {
                id: event.id,
                title: event.name,
                start: startDate,
                end: endDate,
                data: {
                  agenda_id: id,
                  description: event.description,
                  participants: event.participants,
                },
              };
              setEvents_new((state) => [...state, event_new]);
            });
          }
        });
      }
    }
  }, [agendas, idsAndNames]);

  if (!events_new) return <Loading />;

  // const components = {
  //   event: (props) => {
  //     const agenda_id_unique = props?.event?.data?.agenda_id;
  //     return <div className="bg-[#E21D48]">{props.title}</div>;
  //   },
  // };

  return (
    <div>
      <div style={{ height: "88vh" }} className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Label className="text-xl font-bold">日程总览</Label>
          <AgendaDataSheeet
            calendars={idsAndNames}
            project={{
              isProject: false,
              project_id: "",
            }}
          ></AgendaDataSheeet>
        </div>
        <Calendar
          events={events_new}
          views={["month", "week", "day"]}
          // components={components}
        />
      </div>
    </div>
  );
}
