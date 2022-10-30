import React, { useState, useRef } from "react";

// import local Interface
import { User } from "../../core/models/User/User.interface";
import { InterfaceProjectMembersAddNewComponent } from "../../core/models/Project/Project.interface";

// import local service
import USER_SERVICE from "../../core/services/userServ";
import PROJECT_SERVICE from "../../core/services/projectServ";

// import antd components
import { Avatar, message } from "antd";
import { useAppDispatch } from "../../core/hooks/redux/useRedux";

export default function ProjectMembersAddNew({
  projectID,
}: InterfaceProjectMembersAddNewComponent) {
  let searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [userList, setUserList] = useState<User[] | null>(null);
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

  let renderUsers = (userList: User[] | null) => {
    if (!userList) return null;
    return userList.map((user, index) => (
      <div
        className="px-3 py-2 flex justify-between items-center hover:bg-orange-100 cursor-pointer"
        key={user.userId!.toString() + index}
        onClick={() => {
          handleAssignUser(projectID, user.userId!);
        }}
      >
        <Avatar src={user.avatar} />
        <span className="ml-2 align-middle text-lg">{user.name}</span>
      </div>
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
            console.log(e.target.value);
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
