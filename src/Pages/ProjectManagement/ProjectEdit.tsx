import React, { useEffect } from "react";
import { InterfaceProjectEditComponent } from "../../core/models/Project/Project.interface";
import PROJECT_SERVICE from "../../core/services/projectServ";

export default function ProjectEdit({
  project,
}: InterfaceProjectEditComponent) {
  console.log(project);
  return (
    <div>
      <p>{project.projectName}</p>
      <p>{project.categoryName}</p>
      <p>{project.creator.name}</p>
      <p>{project.description}</p>
    </div>
  );
}
