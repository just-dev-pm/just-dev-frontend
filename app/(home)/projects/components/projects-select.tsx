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
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProjectNameRender from "./project-name-render";
import { Project } from "@/types/projects";

interface IProjectsSelect extends SelectTriggerProps {
  projects: Project[];
  value: string;
  handleValueChange: (newProjectId: string) => void;
}
export default function ProjectsSelect({
  projects,
  value,
  handleValueChange,
  className,
  ...props
}: IProjectsSelect) {
  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger
        className={cn("w-[180px] focus:ring-0 focus:ring-offset-0", className)}
        {...props}
      >
        <SelectValue placeholder="选择项目" />
      </SelectTrigger>
      <SelectContent>
        {projects.map((project, index) => {
          return (
            <SelectItem key={index} value={project.id}>
              <ProjectNameRender id={project.id} />
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
