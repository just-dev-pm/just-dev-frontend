import moment from "moment";

export const events = [
  {
    title: "hello!",
    start: new Date(2024, 6, 1, 10, 0, 0),
    end: new Date(2024, 6, 1, 12, 0, 0),
    id: "0",
  },
  {
    title: "bye!",
    start: moment("2024-07-01T14:00:00").toDate(),
    end: moment("2024-07-01T16:00:00").toDate(),
    id: "1",
  },
];

export const agenda_calendar = [
    {id:"1",name:"Google"},
    {id:"2",name:"小新"},
    {id:"3",name:"ASUS"},
    {id:"4",name:"H3C"},
]

export const agenda_items_data = [
  {
    agenda_item_id: "1",
    title: "需求分析会",
    description: "开会",
    time: "2024-07-09",
    place: "五楼",
  },
  {
    agenda_item_id: "2",
    title: "吃饭",
    description: "好吃",
    time: "2024-07-09",
    place: "桌上",
  },
  {
    agenda_item_id: "3",
    title: "喝水",
    description: "好喝",
    time: "2024-07-09",
    place: "家里",
  },
  {
    agenda_item_id: "4",
    title: "洗澡",
    description: "唱歌",
    time: "2024-07-09",
    place: "厕所",
  },
  {
    agenda_item_id: "5",
    title: "睡觉",
    description: "爽睡",
    time: "2024-07-09",
    place: "床上",
  },
  {
    agenda_item_id: "6",
    title: "开发",
    description: "好吃",
    time: "2024-07-09",
    place: "随时随地",
  },
];

export const task_items_data = [
  {
    task_items_id: "1",
    title: "发布",
    description: "好吃",
    ddl: "2024-07-20",
    collaborators: ["Alice", "Bob", "Alex"],
  },
  {
    task_items_id: "2",
    title: "分析",
    description: "好吃",
    ddl: "2024-07-20",
    collaborators: ["DawnChan", "Bob", "Alex"],
  },
  {
    task_items_id: "3",
    title: "分享",
    description: "好吃",
    ddl: "2024-07-20",
    collaborators: ["Crush", "Bob", "Alex"],
  },
  {
    task_items_id: "4",
    title: "编码",
    description: "好吃",
    ddl: "2024-07-20",
    collaborators: ["Alice", "Bob", "Alex"],
  },
  {
    task_items_id: "5",
    title: "技术攻关",
    description: "好吃",
    ddl: "2024-07-20",
    collaborators: ["Alice", "Bob", "Alex"],
  },
  {
    task_items_id: "6",
    title: "运维",
    description: "好吃",
    ddl: "2024-07-20",
    collaborators: ["Alice", "Bob", "Alex"],
  },
];

export const requirment_items_data = [
    {id:"1",name:"吃饭",content:"吃吃吃"},
    {id:"2",name:"喝水",content:"喝喝喝"},
    {id:"3",name:"睡觉",content:"睡睡睡"},
    {id:"4",name:"开发",content:"写写写"},
    {id:"5",name:"上学",content:"大傻逼"},
    {id:"6",name:"放假",content:"起飞"},
]

export const dialog_data = [
  {
    members: [
      { id: 1, name: "Bob" },
      { id: 2, name: "Alex" },
    ],
    todoListName: "Backlog",
    tasks: [
      { id: "1", name: "Cookie", isComplete: false },
      { id: "2", name: "Hello?", isComplete: false },
      { id: "1", name: "Cookie", isComplete: false },
      { id: "1", name: "Cookie", isComplete: false },
      { id: "1", name: "Cookie", isComplete: false },
      { id: "1", name: "Cookie", isComplete: false },
      { id: "1", name: "Cookie", isComplete: false },
    ],
  },
  {
    members: [
      { id: 1, name: "Bob" },
      { id: 2, name: "Alex" },
    ],
    todoListName: "Backlog",
    tasks: [
      { id: "1", name: "Cookie", isComplete: false },
      { id: "2", name: "Hello?", isComplete: false },
      { id: "1", name: "Cookie", isComplete: false },
      { id: "1", name: "Cookie", isComplete: false },
      { id: "1", name: "Cookie", isComplete: false },
      { id: "1", name: "Cookie", isComplete: false },
      { id: "1", name: "Cookie", isComplete: false },
    ],
  },
];

export const barChartData = [
  { month: "January", on_time: 186, time_out: 80 },
  { month: "February", on_time: 305, time_out: 200 },
  { month: "March", on_time: 237, time_out: 120 },
  { month: "April", on_time: 73, time_out: 190 },
  { month: "May", on_time: 209, time_out: 130 },
  { month: "June", on_time: 214, time_out: 140 },
];

export const barChartConfig = {
  on_time: {
    label: "on_time",
    color: "hsl(var(--chart-1))",
  },
  time_out: {
    label: "time_out",
    color: "hsl(var(--chart-2))",
  },
};

export const lineChartData = [
  { month: "January", completed_task: 186 },
  { month: "February", completed_task: 305 },
  { month: "March", completed_task: 237 },
  { month: "April", completed_task: 73 },
  { month: "May", completed_task: 209 },
  { month: "June", completed_task: 214 },
];

export const lineChartConfig = {
  completed_task: {
    label: "completed_task",
    color: "hsl(var(--chart-1))",
  },
};

export const pieChartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
  ]
  
  export const pieChartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  }

  export type draftsTablePayment = {
    id: string
    name:string
    description:string
    email: string
  }

  export const draftsData: draftsTablePayment[] = [
    {
      id: "1",
      name: "需求分析图",
      description:"进行需求分析",
      email: "ken99@yahoo.com",
    },
    {
      id: "2",
      name: "聊天室",
      description:"讨论工作交接",
      email: "Abe45@gmail.com",
    },
    {
      id: "3",
      name: "概念设计白板",
      description:"进行概念设计",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "4",
      name: "技术讲解",
      description:"技术学习",
      email: "Silas22@gmail.com",
    },
    {
      id: "5",
      name: "团队建设",
      description:"团队建设协商",
      email: "carmella@hotmail.com",
    },
  ]

  export type requirmentTablePayment = {
    id: string
    name:string
    description:string
    email: string
  }

  export const requirmentData: requirmentTablePayment[] = [
    {
      id: "1",
      name: "需求分析图",
      description:"进行需求分析",
      email: "ken99@yahoo.com",
    },
    {
      id: "2",
      name: "聊天室",
      description:"讨论工作交接",
      email: "Abe45@gmail.com",
    },
    {
      id: "3",
      name: "概念设计白板",
      description:"进行概念设计",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "4",
      name: "技术讲解",
      description:"技术学习",
      email: "Silas22@gmail.com",
    },
    {
      id: "5",
      name: "团队建设",
      description:"团队建设协商",
      email: "carmella@hotmail.com",
    },
  ]