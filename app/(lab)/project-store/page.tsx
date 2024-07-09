"use client";
import { useProjectStore } from "@/store/projectStore";
import { useShallow } from "zustand/react/shallow";
import { enableMapSet } from "immer";

import { useEffect, useState } from "react";

const ProjectComponent: React.FC = () => {
  useEffect(() => {
    enableMapSet();
  }, []);
  const projects = useProjectStore(
    useShallow(state => Array.from(state.projects.entries()))
  );
  const defaultId = useProjectStore(state => state.defaultId);
  const addProject = useProjectStore(state => state.addProject);
  const getProjectNameById = useProjectStore(state => state.getProjectNameById);
  const getProjectList = useProjectStore(state => state.getProjectList);
  const setDefaultId = useProjectStore(state => state.setDefaultId);

  const [newProjectId, setNewProjectId] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [queryId, setQueryId] = useState("");
  const [queriedName, setQueriedName] = useState<string | undefined>(undefined);

  const handleAddProject = () => {
    if (newProjectId && newProjectName) {
      addProject(newProjectId, newProjectName);
      setNewProjectId("");
      setNewProjectName("");
    }
  };

  const handleQueryProject = () => {
    const name = getProjectNameById(queryId);
    setQueriedName(name);
  };

  const handleSetDefaultId = () => {
    setDefaultId(queryId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Project Manager</h1>

        <div className="mb-4">
          <input
            type="text"
            value={newProjectId}
            onChange={e => setNewProjectId(e.target.value)}
            placeholder="Project ID"
            className="border p-2 mr-2 rounded w-full"
          />
          <input
            type="text"
            value={newProjectName}
            onChange={e => setNewProjectName(e.target.value)}
            placeholder="Project Name"
            className="border p-2 mt-2 rounded w-full"
          />
          <button
            onClick={handleAddProject}
            className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
          >
            Add Project
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={queryId}
            onChange={e => setQueryId(e.target.value)}
            placeholder="Query Project ID"
            className="border p-2 mr-2 rounded w-full"
          />
          <button
            onClick={handleQueryProject}
            className="bg-green-500 text-white p-2 rounded mt-2 w-full"
          >
            Query Project
          </button>
          {queriedName !== undefined && (
            <div className="mt-2">
              Queried Project Name:{" "}
              <span className="font-bold">{queriedName || "Not Found"}</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <button
            onClick={handleSetDefaultId}
            className="bg-yellow-500 text-white p-2 rounded w-full"
          >
            Set as Default ID
          </button>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold">Projects</h2>
          <ul className="list-disc list-inside">
            {projects.map(([id, name]) => (
              <li key={id}>
                {id}: {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          Default Project ID: <span className="font-bold">{defaultId}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectComponent;
