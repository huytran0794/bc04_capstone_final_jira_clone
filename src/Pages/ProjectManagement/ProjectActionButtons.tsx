import React from "react";

// import local interface
import {
  InterfaceProject,
  InterfaceProjectActionButtonsComponent,
} from "../../core/models/Project/Project.interface";

// import redux
import { useAppDispatch } from "../../core/hooks/redux/useRedux";
import { generalActions } from "../../core/redux/slice/generalSlice";

// import local component
import ProjectEdit from "./ProjectEdit";

// import local Service
import PROJECT_SERVICE from "../../core/services/projectServ";

// import antd components
import {
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { message, Popconfirm } from "antd";

export default function ProjectActionButtons({
  project,
  setAllProjects,
}: InterfaceProjectActionButtonsComponent) {
  let dispatch = useAppDispatch();

  const handleEditProject = (project: InterfaceProject) => {
    dispatch(
      generalActions.handleDrawerOpen(<ProjectEdit project={project} />)
    );
  };
  const handleDeleteProject = () => {
    PROJECT_SERVICE.delete(project.id)
      .then((res) => {
        console.log(res);
        PROJECT_SERVICE.getAll()
          .then((res) => {
            console.log(res);
            setAllProjects(res.content);
            message.success("Project deleted");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="space-x-2">
      <button
        onClick={() => {
          handleEditProject(project);
        }}
      >
        <FormOutlined className="text-yellow-500 text-xl" />
      </button>
      <Popconfirm
        title={
          <span className="text-lg pl-1">
            Are you sure to delete this project?
          </span>
        }
        onConfirm={handleDeleteProject}
        okText="Yes"
        cancelText="No"
        icon={<QuestionCircleOutlined className="top-1 text-red-500 text-xl" />}
      >
        <DeleteOutlined className="text-red-500 text-xl" />
      </Popconfirm>
    </div>
  );
}
