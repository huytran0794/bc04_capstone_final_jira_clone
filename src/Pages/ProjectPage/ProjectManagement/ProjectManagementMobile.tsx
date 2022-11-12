import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import custom Hooks
import projectHooks from "../../../core/hooks/ProjectHooks/projectHooks";

// import redux
import {
  useAppDispatch,
  useAppSelector,
} from "../../../core/hooks/redux/useRedux";

// import local services
import PROJECT_SERVICE from "../../../core/services/projectServ";

// import local components
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";
import ProjectMobileSettting from "./ProjectMobileSettting";

// import antd components
import { SettingOutlined } from "@ant-design/icons";
import { Modal } from "antd";

export default function ProjectManagementMobile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const projectList = useAppSelector(
    (state) => state.projectReducer.projectList
  );
  const [projectSettingID, setProjectSettingID] = useState<number>(0);

  projectHooks.useFetchProjectList(dispatch, null);

  const handleOpenCreateProject = () => {
    navigate("create-project");
  };

  // ANTD Modal Control
  const [openModalSetting, setOpenModalSetting] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showModal = (projectID: number) => {
    setProjectSettingID(projectID);
    setOpenModalSetting(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenModalSetting(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    dispatch(PROJECT_SERVICE.getAllAndDispatch(null));
    setOpenModalSetting(false);
  };

  // Render function
  const renderProjectList = () => {
    return projectList?.map((project, index) => {
      return (
        <div
          className="mb-3 flex justify-between items-center"
          key={project.id.toString() + index}
        >
          <p className="mb-0 pr-4 text-xl">{project.projectName}</p>
          <SettingOutlined
            className="text-2xl cursor-pointer"
            onClick={() => {
              showModal(project.id);
            }}
          />
        </div>
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
          <Modal
            title="PROJECT SETTING"
            style={{
              top: 0,
              left: 0,
              maxWidth: "100%",
              margin: 0,
              padding: 0,
            }}
            width={"100%"}
            footer={null}
            destroyOnClose={true}
            open={openModalSetting}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <ProjectMobileSettting projectID={projectSettingID} />
          </Modal>
        </div>
      }
    />
  );
}
