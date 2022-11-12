import { useEffect, useState } from "react";

// import redux
import { useAppDispatch } from "../../../core/hooks/redux/useRedux";
import { spinnerActions } from "../../../core/redux/slice/spinnerSlice";

// import local Interface
import {
  InterfaceProject,
  InterfaceProjectMobileSetting,
  InterfaceProjectUpdate,
} from "../../../core/models/Project/Project.interface";

// import local Components
import ProjectMembersShowAll from "./ProjectMembersShowAll";
import ProjectMembersAddNew from "./ProjectMembersAddNew";
import ProjectForm from "../../../core/Components/Forms/ProjectForm";
import toastify from "../../../core/utils/toastify/toastifyUtils";

// import local Services
import PROJECT_SERVICE from "../../../core/services/projectServ";
import { renderMembers } from "./ProjectMembers";

// import ANTD Component
import { Avatar, Collapse, message, Modal, Tag } from "antd";

export default function ProjectMobileSettting({
  projectID,
}: InterfaceProjectMobileSetting) {
  const dispatch = useAppDispatch();
  const [project, setProject] = useState<InterfaceProject | null>(null);

  useEffect(() => {
    PROJECT_SERVICE.getDetailsAndSetProject(projectID, setProject);
  }, []);

  const handleUpdateProject = (values: InterfaceProjectUpdate) => {
    dispatch(spinnerActions.setLoadingOn());
    const updateProject = {
      ...values,
      id: projectID,
      creator: project!.creator.id,
    };
    PROJECT_SERVICE.update(project!.id, updateProject)
      .then(() => {
        toastify("success", "Updated project successfully !");
        setTimeout(() => {
          PROJECT_SERVICE.getDetailsAndSetProject(projectID, setProject);
          dispatch(spinnerActions.setLoadingOff());
        }, 2500);
      })
      .catch((err) => {
        setTimeout(() => {
          toastify("error", err.response.data.message);
          dispatch(spinnerActions.setLoadingOff());
        }, 2500);
      });
  };

  const handleAssignUser = (userId: number) => {
    PROJECT_SERVICE.assignUser(projectID, userId)
      .then((res) => {
        // console.log(res);
        PROJECT_SERVICE.getDetailsAndSetProject(
          projectID,
          setProject,
          "Member added successfully"
        );
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
      });
  };

  const handleDeleteMember = (memberID: number) => {
    PROJECT_SERVICE.deleteMember(projectID, memberID)
      .then((res) => {
        // console.log(res);
        PROJECT_SERVICE.getDetailsAndSetProject(
          projectID,
          setProject,
          "Member deleted successfully"
        );
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
      });
  };

  // ANTD Collapse control
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const { Panel } = Collapse;

  // ANTD Modal Control
  const [openModalAddMember, setOpenModalAddMember] = useState<boolean>(false);

  const showModalAddMember = () => {
    setOpenModalAddMember(true);
  };

  const handleCloseModalAddMember = () => {
    // console.log("Clicked cancel button");
    setOpenModalAddMember(false);
  };

  return !project ? null : (
    <div>
      <div className="mb-3">
        <p className="mb-2 text-xl font-semibold">{project.projectName}</p>
        <Tag color="lime" className="text-lg">
          {project.creator.name}
        </Tag>
      </div>
      <div className="mb-3">
        <div className="flex justify-between items-center">
          <h4 className="mb-0 text-lg">Members</h4>
          <span className="cursor-pointer" onClick={showModalAddMember}>
            ADD
          </span>
        </div>
        <Collapse
          expandIconPosition="end"
          onChange={onChange}
          className="projectSetting_members_showAll"
        >
          <Panel
            header={
              project.members.length === 0 ? (
                "No member yet"
              ) : (
                <Avatar.Group size={40}>
                  {renderMembers(project.members)}
                </Avatar.Group>
              )
            }
            key="showMem1"
          >
            <ProjectMembersShowAll
              members={project.members}
              handleDeleteMember={handleDeleteMember}
              containerStyle="w-full"
              title=""
            />
          </Panel>
        </Collapse>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h4 className="mb-0 text-lg">Project Information</h4>
        </div>
        <Collapse
          expandIconPosition="end"
          onChange={onChange}
          className="projectSetting_edit"
        >
          <Panel
            header={<span className="font-semibold">Show and Edit</span>}
            key="edit1"
          >
            <ProjectForm
              project={project}
              confirmText="Update"
              handleOnFinish={handleUpdateProject}
            />
          </Panel>
        </Collapse>
      </div>
      <Modal
        title="ADD MEMBERS"
        style={{ top: 0, left: 0 }}
        width={"100vw"}
        destroyOnClose={true}
        footer={null}
        open={openModalAddMember}
        onCancel={handleCloseModalAddMember}
      >
        <ProjectMembersAddNew
          handleAssignUser={handleAssignUser}
          containerStyle="w-full"
        />
      </Modal>
    </div>
  );
}
