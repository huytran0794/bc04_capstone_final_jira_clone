// import local interface
import { InterfaceProjectEditComponent } from "../../../core/models/Project/Project.interface";

// import local component
import ProjectFormEdit from "../../../core/Components/Forms/ProjectFormEdit";

export default function ProjectEdit({
  project,
}: InterfaceProjectEditComponent) {
  // console.log(project);
  return (
    <div className="form-wrapper">
      <div className="form-body">
        <ProjectFormEdit layout="vertical" size="large" project={project} />
      </div>
    </div>
  );
}
