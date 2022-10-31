import React from "react";

// import ant component
import { Avatar, message, Popconfirm } from "antd";
import { CloseCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";

// import local component Interface
import { InterfaceProjectMembersShowAllComponent } from "../../../core/models/Project/Project.interface";
import PROJECT_SERVICE from "../../../core/services/projectServ";
import { useAppDispatch } from "../../../core/hooks/redux/useRedux";

export default function ProjectMembersShowAll({
  projectID,
  members,
}: InterfaceProjectMembersShowAllComponent) {
  const dispatch = useAppDispatch();

  const handleDeleteMember = (projectID: number, memberID: number) => {
    PROJECT_SERVICE.deleteMember(projectID, memberID)
      .then((res) => {
        console.log(res);
        dispatch(PROJECT_SERVICE.getAllAndDispatch("Member deleted"));
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
      });
  };
  return (
    <div className="w-64">
      <p className="w-full mb-0 px-2 bg-gray-200 text-sm text-gray-500 font-bold">
        ALL MEMBERS
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
                handleDeleteMember(projectID, member.userId);
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
