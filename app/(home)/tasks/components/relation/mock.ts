import { TaskRelation } from "@/types/task-link/get";

const mock: TaskRelation[] = [
  {
    id: "18",
    from: {
      id: "12",
    },
    to: {
      id: "81",
    },
    category: "auto",
  },
  {
    id: "11",
    from: {
      id: "81",
    },
    to: {
      id: "47",
    },
    category: "dep",
  },
  {
    id: "11",
    from: {
      id: "81",
    },
    to: {
      id: "347",
    },
    category: "auto",
  },
];

export { mock as relationMock };
