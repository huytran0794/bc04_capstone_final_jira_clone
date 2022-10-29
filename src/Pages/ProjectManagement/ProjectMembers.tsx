import React from "react";

// import antd component
import { Avatar, Popover } from "antd";

// import local component interface
import { InterfaceProjectMembersComponent } from "../../core/models/Project/Project.interface";

// import local compoment
import ProjectMembersAddNew from "./ProjectMembersAddNew";
import ProjectMembersShowAll from "./ProjectMembersShowAll";

export default function ProjectMembers({
  projectID,
  members,
}: InterfaceProjectMembersComponent) {
  const renderMembers = () => {
    const totalMembers = members.length;
    if (totalMembers === 0) return null;
    if (totalMembers <= 2) {
      return members.map((member, index) => (
        <Avatar src={member.avatar} key={member.userId.toString() + index} />
      ));
    }
    const membersExcludeLast = members.slice(0, 2);
    // const lastMember = members[totalMembers - 1];
    return (
      <>
        {membersExcludeLast.map((member, index) => (
          <Avatar src={member.avatar} key={member.userId.toString() + index} />
        ))}

        <Avatar className="bg-orange-100 text-orange-500 text-sm">
          +{totalMembers - 2}
        </Avatar>
      </>
    );
  };

  return (
    <div className="flex items-center">
      <Popover
        className="cursor-pointer"
        placement="bottom"
        content={
          <ProjectMembersShowAll projectID={projectID} members={members} />
        }
        trigger="click"
      >
        <div className="flex">
          <Avatar.Group size={40}>{renderMembers()}</Avatar.Group>
        </div>
      </Popover>
      <Popover
        placement="bottom"
        content={<ProjectMembersAddNew projectID={projectID} />}
        trigger="click"
      >
        <div className="w-10 h-10 ml-2 flex justify-center items-center bg-orange-400 rounded-full text-white cursor-pointer">
          <span className="text-xl font-semibold">+</span>
        </div>
      </Popover>
    </div>
  );
}
