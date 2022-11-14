import React, { useState } from "react";

// import local components
import ProjectMembersShowAll from "../ProjectMembersShowAll";
import { renderMembers } from "../Desktop/ProjectMembers";

// import ANTD components
import { Avatar, Collapse, message, Modal } from "antd";
import PROJECT_SERVICE from "../../../../core/services/projectServ";
import { InterfaceProjectMobileMembers } from "../../../../core/models/Project/Project.interface";
import ProjectMembersAddNew from "../ProjectMembersAddNew";

export default function ProjectMobileMembers({
  project,
  setProject,
}: InterfaceProjectMobileMembers) {
  const handleAssignUser = (userId: number) => {
    PROJECT_SERVICE.assignUser(project.id, userId)
      .then(() => {
        PROJECT_SERVICE.getDetailsAndSetProject(
          project.id,
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
    PROJECT_SERVICE.deleteMember(project.id, memberID)
      .then(() => {
        PROJECT_SERVICE.getDetailsAndSetProject(
          project.id,
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
  const { Panel } = Collapse;

  // ANTD Modal Control
  const [openModalAddMember, setOpenModalAddMember] = useState<boolean>(false);
  const showModalAddMember = () => {
    setOpenModalAddMember(true);
  };
  const handleCloseModalAddMember = () => {
    setOpenModalAddMember(false);
  };

  return (
    <>
      <div className="mb-3">
        <div className="flex justify-between items-center">
          <h4 className="mb-0 text-lg">Members</h4>
          <span className="cursor-pointer" onClick={showModalAddMember}>
            ADD
          </span>
        </div>
        <Collapse
          expandIconPosition="end"
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
    </>
  );
}
