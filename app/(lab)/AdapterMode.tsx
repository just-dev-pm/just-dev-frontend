class ProjectSchema {
  id: string = "";
  name: string = "";
}

interface IProject {
  project_id: string;
  project_name: string;
}
class Project extends ProjectSchema implements IProject {
  project_id: string = this.id;
  project_name: string = this.name;
}
