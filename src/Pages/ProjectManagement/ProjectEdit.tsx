import React from "react";

// import local interface
import { InterfaceProjectEditComponent } from "../../core/models/Project/Project.interface";

// import local component
import ProjectForm from "../../core/Components/Forms/ProjectForm";

export default function ProjectEdit({
  project,
}: InterfaceProjectEditComponent) {
  console.log(project);
  return (
    <div className="form-wrapper">
      <div className="form-body">
        <ProjectForm layout="vertical" size="large" />
      </div>
    </div>
  );
}
