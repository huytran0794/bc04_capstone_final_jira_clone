// import local Interface
import { InterfaceProjectMobileSetting } from "../../../core/models/Project/Project.interface";

// import ANTD Component
import { Tag } from "antd";

export default function ProjectMobileSettting({
  project,
}: InterfaceProjectMobileSetting) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">{project.projectName}</p>
        <Tag color="lime" className="text-lg">
          {project.creator.name}
        </Tag>
      </div>
    </div>
  );
}
