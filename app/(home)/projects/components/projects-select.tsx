import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComponentType, Dispatch, SetStateAction } from "react";
import { IProject } from "./project-menu";
import { SelectTriggerProps } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

interface IProjectsSelect extends SelectTriggerProps {
  projects: IProject[];
  project: string | undefined;
  setProject: (id: string) => void;
}
export default function ProjectsSelect({
  projects,
  project,
  setProject,
  className,
  ...props
}: IProjectsSelect) {
  return (
    <Select value={project} onValueChange={setProject}>
      <SelectTrigger
        className={cn("w-[180px] focus:ring-0 focus:ring-offset-0", className)}
        {...props}
      >
        <SelectValue placeholder="选择项目" />
      </SelectTrigger>
      <SelectContent>
        {projects.map((project, index) => {
          return (
            <SelectItem key={index} value={project.project_id}>
              {project.project_name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
