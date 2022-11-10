import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// import local Interface
import {
  InterfaceProject,
  InterfaceProjectMobileSetting,
} from "../../../core/models/Project/Project.interface";

// import local Components
import ProjectMembersShowAll from "./ProjectMembersShowAll";

// import local Services
import PROJECT_SERVICE from "../../../core/services/projectServ";
import { renderMembers } from "./ProjectMembers";

// import ANTD Component
import { Avatar, Collapse, message, Modal, Tag } from "antd";
import ProjectMembersAddNew from "./ProjectMembersAddNew";

export default function ProjectMobileSettting({
  projectID,
}: InterfaceProjectMobileSetting) {
  const [thisProject, setProject] = useState<InterfaceProject | null>(null);

  useEffect(() => {
    PROJECT_SERVICE.getDetailsAndSetProject(projectID, setProject);
  }, []);

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

  return !thisProject ? null : (
    <div>
      <div className="mb-3">
        <p className="mb-2 text-xl font-semibold">{thisProject.projectName}</p>
        <Tag color="lime" className="text-lg">
          {thisProject.creator.name}
        </Tag>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h4 className="text-lg">Members</h4>
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
              thisProject.members.length === 0 ? (
                "No member yet"
              ) : (
                <Avatar.Group size={40}>
                  {renderMembers(thisProject.members)}
                </Avatar.Group>
              )
            }
            key="1"
          >
            <ProjectMembersShowAll
              members={thisProject.members}
              handleDeleteMember={handleDeleteMember}
              containerStyle="w-full"
              title=""
            />
          </Panel>
        </Collapse>
      </div>

      <Modal
        width={"100vw"}
        destroyOnClose={true}
        footer={null}
        open={openModalAddMember}
        onCancel={handleCloseModalAddMember}
      >
        <ProjectMembersAddNew projectID={projectID} />
      </Modal>
    </div>
  );
}
