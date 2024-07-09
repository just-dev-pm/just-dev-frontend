import moment from "moment"

export const events = [
    {
        title:"hello!",
        start: new Date(2024, 6, 1, 10, 0, 0),
        end: new Date(2024, 6, 1, 12, 0, 0),
    },
    {
        title:"bye!",
        start: moment("2024-07-01T14:00:00").toDate(),
        end: moment("2024-07-01T16:00:00").toDate(),
    }
  ]