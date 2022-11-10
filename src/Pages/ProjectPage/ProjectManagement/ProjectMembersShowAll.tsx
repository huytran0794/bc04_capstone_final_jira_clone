import React from "react";

// import ant component
import { Avatar, Popconfirm } from "antd";
import { CloseCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";

// import local component Interface
import { InterfaceProjectMembersShowAllComponent } from "../../../core/models/Project/Project.interface";

export default function ProjectMembersShowAll({
  members,
  handleDeleteMember,
  containerStyle = "w-64",
  title = "ALL MEMBERS",
}: InterfaceProjectMembersShowAllComponent) {
  return (
    <div className={containerStyle}>
      <p className="w-full mb-0 px-2 bg-gray-200 text-sm text-gray-500 font-bold">
        {title}
      </p>
      <div className="w-full max-h-96 overflow-y-auto">
        {members.map((member, index) => (
          <div
            className="px-3 py-2 flex justify-between items-center hover:bg-orange-100"
            key={member.userId!.toString() + index}
          >
            <div>
              <Avatar src={member.avatar} />
              <span className="ml-2 align-middle text-lg">{member.name}</span>
            </div>
            <Popconfirm
              title={
                <span className="text-lg pl-1">
                  Are you sure to delete{" "}
                  <span className="font-semibold">{member.name}</span>?
                </span>
              }
              onConfirm={() => {
                handleDeleteMember(member.userId!);
              }}
              okText="Yes"
              cancelText="No"
              icon={
                <QuestionCircleOutlined className="top-1 text-red-500 text-xl" />
              }
            >
              <CloseCircleOutlined
                style={{ fontSize: 20 }}
                className="text-red-500 cursor-pointer"
              />
            </Popconfirm>
          </div>
        ))}
      </div>
    </div>
  );
}
