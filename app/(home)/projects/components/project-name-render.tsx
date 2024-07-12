import { useProject } from "@/app/api/project/get-project";
import Loading from "@/components/ui/loading";
import { useEffect } from "react";

export default function ProjectNameRender({ id }: { id: string }) {
  const { mutate, data } = useProject(id);
  useEffect(() => {
    if (!data?.name) {
      mutate();
    }
  }, []);
  if (!data || !data?.name) return <Loading />;
  return <>{data?.name}</>;
}
