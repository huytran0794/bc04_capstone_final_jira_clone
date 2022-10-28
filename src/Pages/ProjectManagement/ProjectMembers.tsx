import React from "react";

// import antd component
import { Avatar, Tooltip } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { InterfaceProjectMembersComponent } from "../../core/models/Project/Project.interface";

export default function ProjectMembers({
  projectID,
  members,
}: InterfaceProjectMembersComponent) {
  const totalMembers = members.length;
  if (totalMembers === 0) return null;

  const renderMembers = () => {
    if (totalMembers <= 2) {
      return members.map((member, index) => (
        <Avatar src={member.avatar} key={member.userId.toString() + index} />
      ));
    }
    const membersExcludeLast = members.slice(0, -1);
    const lastMember = members[totalMembers - 1];
    return (
      <>
        {membersExcludeLast.map((member, index) => (
          <Avatar src={member.avatar} key={member.userId.toString() + index} />
        ))}
        <Tooltip title="Other member(s)" placement="top">
          <Avatar
            src={lastMember.avatar}
            key={lastMember.userId.toString() + (totalMembers - 1)}
          />
        </Tooltip>
      </>
    );
  };

  return (
    <div>
      <Avatar.Group
        maxCount={2}
        maxPopoverTrigger="click"
        size="large"
        maxStyle={{
          color: "#f56a00",
          backgroundColor: "#fde3cf",
          cursor: "pointer",
        }}
      >
        {renderMembers()}
      </Avatar.Group>
    </div>
  );
}
