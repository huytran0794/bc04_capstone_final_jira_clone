import React from "react";

// import redux
import { useAppDispatch } from "../../../core/hooks/redux/useRedux";

// import local services
import PROJECT_SERVICE from "../../../core/services/projectServ";

// import local component interface
import { InterfaceProjectMembersComponent } from "../../../core/models/Project/Project.interface";
import { User } from "../../../core/models/User/User.interface";

// import local compoment
import ProjectMembersAddNew from "./ProjectMembersAddNew";
import ProjectMembersShowAll from "./ProjectMembersShowAll";

// import antd component
import { Avatar, message, Popover } from "antd";

// local Render
export const renderMembers = (members: Partial<User>[]) => {
  const totalMembers = members.length;
  if (totalMembers === 0) return null;
  if (totalMembers <= 2) {
    return members.map((member, index) => (
      <Avatar src={member.avatar} key={member.userId!.toString() + index} />
    ));
  }
  const membersExcludeLast = members.slice(0, 2);

  return (
    <>
      {membersExcludeLast.map((member, index) => (
        <Avatar src={member.avatar} key={member.userId!.toString() + index} />
      ))}

      <Avatar className="bg-orange-100 text-orange-500 text-sm">
        +{totalMembers - 2}
      </Avatar>
    </>
  );
};

export default function ProjectMembers({
  projectID,
  projectName,
  members,
}: InterfaceProjectMembersComponent) {
  const dispatch = useAppDispatch();

  const handleAssignUser = (userId: number) => {
    PROJECT_SERVICE.assignUser(projectID, userId)
      .then((res) => {
        // console.log(res);
        dispatch(
          PROJECT_SERVICE.getAllAndDispatch("Member added successfully")
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
        dispatch(PROJECT_SERVICE.getAllAndDispatch("Member deleted"));
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
      });
  };

  return (
    <div className="flex items-center">
      <Popover
        className="cursor-pointer"
        placement="bottom"
        content={
          <ProjectMembersShowAll
            members={members}
            handleDeleteMember={handleDeleteMember}
          />
        }
        trigger="click"
      >
        <div className="flex">
          <Avatar.Group size={40}>{renderMembers(members)}</Avatar.Group>
        </div>
      </Popover>
      <Popover
        placement="bottom"
        content={
          <ProjectMembersAddNew
            projectName={projectName}
            handleAssignUser={handleAssignUser}
          />
        }
        trigger="click"
        destroyTooltipOnHide={true}
      >
        <div className="w-10 h-10 ml-2 flex justify-center items-center bg-orange-400 rounded-full text-white cursor-pointer">
          <span className="text-xl font-semibold">+</span>
        </div>
      </Popover>
    </div>
  );
}
