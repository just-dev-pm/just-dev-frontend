import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";

import moment from "moment";
const localizer = momentLocalizer(moment);

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect } from "react";

export default function Calendar(props: Omit<CalendarProps, "localizer">) {
  useEffect(()=>{console.log(props)})
  return <BigCalendar {...props} localizer={localizer}></BigCalendar>;
}
