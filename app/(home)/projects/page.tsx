import ProjectsView from "../components/projects-view";

export default function HomePage() {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
      <ProjectsView />
    </div>
  );
}
