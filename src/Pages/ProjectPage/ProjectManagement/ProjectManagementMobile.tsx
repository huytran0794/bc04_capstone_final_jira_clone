import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import custom Hooks
import projectHooks from "../../../core/hooks/ProjectHooks/projectHooks";

// import redux
import {
  useAppDispatch,
  useAppSelector,
} from "../../../core/hooks/redux/useRedux";

// import local components
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";

// import antd components
import { SettingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import ProjectMobileSettting from "./ProjectMobileSettting";

export default function ProjectManagementMobile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const projectList = useAppSelector(
    (state) => state.projectReducer.projectList
  );

  projectHooks.useFetchProjectList(dispatch, null);

  const handleOpenCreateProject = () => {
    navigate("create-project");
  };

  // ANTD Modal Control
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showModal = () => {
    setOpenModal(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenModal(false);
  };

  // Render function
  const renderProjectList = () => {
    return projectList?.map((project, index) => {
      return (
        <>
          <div
            className="mb-3 flex justify-between items-center"
            key={project.id.toString() + index}
          >
            <p className="mb-0 pr-4 text-xl">{project.projectName}</p>
            <SettingOutlined
              className="text-2xl cursor-pointer"
              onClick={() => {
                showModal();
              }}
            />
          </div>
          <Modal
            title="Project Setting"
            width={"100vw"}
            open={openModal}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <ProjectMobileSettting project={project} />
          </Modal>
        </>
      );
    });
  };

  return (
    <SectionWrapper
      title="Project Management"
      content={
        <div>
          <div>{renderProjectList()}</div>
          <div className="w-10 h-10 ml-2 flex justify-center items-center bg-orange-400 rounded-full text-white cursor-pointer">
            <span
              className="text-xl font-semibold"
              onClick={handleOpenCreateProject}
            >
              +
            </span>
          </div>
        </div>
      }
    />
  );
}
