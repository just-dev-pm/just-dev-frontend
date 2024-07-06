import { FolderKanbanIcon } from "lucide-react";

export default function MenuTitle() {
  return (
    <h4 className="flex items-center justify-around px-4 gap-2">
      {" "}
      <FolderKanbanIcon size={40} className="text-primary" /> Just Dev
    </h4>
  );
}
