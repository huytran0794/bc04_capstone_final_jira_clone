import React, { useState, useRef } from "react";

// import redux
import { useAppDispatch } from "../../../core/hooks/redux/useRedux";

// import local Interface
import { User } from "../../../core/models/User/User.interface";
import { InterfaceProjectMembersAddNewComponent } from "../../../core/models/Project/Project.interface";

// import local service
import USER_SERVICE from "../../../core/services/userServ";
import PROJECT_SERVICE from "../../../core/services/projectServ";

// import antd components
import { Avatar, message, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export default function ProjectMembersAddNew({
  projectID,
  projectName,
}: InterfaceProjectMembersAddNewComponent) {
  let searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [userList, setUserList] = useState<Partial<User>[] | null>(null);
  const dispatch = useAppDispatch();

  const getUserList = (keyword: string) => {
    USER_SERVICE.getUserByKeyword(keyword)
      .then((res) => {
        // console.log(res);
        setUserList(res.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAssignUser = (projectId: number, userId: number) => {
    PROJECT_SERVICE.assignUser(projectId, userId)
      .then((res) => {
        console.log(res);
        dispatch(
          PROJECT_SERVICE.getAllAndDispatch("Member added successfully")
        );
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
      });
  };

  let renderUsers = (userList: Partial<User>[] | null) => {
    if (!userList) return null;
    return userList.map((user, index) => (
      <Popconfirm
        title={
          <span className="text-lg pl-1">
            Adding <span className="font-semibold">{user.name}</span> to{" "}
            <span className="font-semibold">{projectName}</span>?
          </span>
        }
        onConfirm={() => {
          handleAssignUser(projectID, user.userId!);
        }}
        okText="Yes"
        cancelText="No"
        icon={
          <QuestionCircleOutlined className="top-1 text-yellow-500 text-xl" />
        }
      >
        <div
          className="px-3 py-2 flex justify-between items-center hover:bg-orange-100 cursor-pointer"
          key={user.userId!.toString() + index}
        >
          <Avatar src={user.avatar} />
          <span className="ml-2 align-middle text-lg">{user.name}</span>
        </div>
      </Popconfirm>
    ));
  };

  return (
    <div className="w-64">
      <input
        type="search"
        placeholder="Search users"
        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:border-orange-500 focus-visible:outline-none"
        // value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (searchRef.current) {
            clearTimeout(searchRef.current);
          }
          searchRef.current = setTimeout(() => {
            // console.log(e.target.value);
            getUserList(e.target.value);
          }, 300);
        }}
      />
      <div className="w-full max-h-96 overflow-y-auto">
        {renderUsers(userList)}
      </div>
    </div>
  );
}
