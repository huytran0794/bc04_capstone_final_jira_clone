import React, { useState, useRef } from "react";

// import local Interface
import { User } from "../../../core/models/User/User.interface";
import { InterfaceProjectMembersAddNewComponent } from "../../../core/models/Project/Project.interface";

// import local service
import USER_SERVICE from "../../../core/services/userServ";

// import antd components
import { Avatar, Modal, Popconfirm } from "antd";
import {
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  DesktopView,
  MobileView,
  TabletView,
} from "../../../core/HOC/Responsive";

export default function ProjectMembersAddNew({
  projectName,
  handleAssignUser,
  containerStyle = "w-64",
}: InterfaceProjectMembersAddNewComponent) {
  let searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [userList, setUserList] = useState<Partial<User>[] | null>(null);

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

  // ANTD Modal Control
  const { confirm } = Modal;
  const showAssignUserConfirm = (user: Partial<User>) => {
    confirm({
      title: "Are you sure you want to assign this member?",
      icon: <ExclamationCircleOutlined />,
      content: `${user.name}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleAssignUser(user.userId!);
      },
    });
  };

  // render function
  const renderUser = (
    user: Partial<User>,
    index: number,
    isMobile: boolean
  ) => (
    <div
      className="px-3 py-2 flex justify-between items-center hover:bg-orange-100 cursor-pointer"
      key={user.userId!.toString() + index}
      onClick={() => {
        if (isMobile) showAssignUserConfirm(user);
      }}
    >
      <Avatar src={user.avatar} />
      <span className="ml-2 align-middle text-lg">{user.name}</span>
    </div>
  );

  const renderUserDesktop = (user: Partial<User>, index: number) => (
    <Popconfirm
      title={
        <span className="text-lg pl-1">
          Adding <span className="font-semibold">{user.name}</span> to{" "}
          <span className="font-semibold">
            {projectName ? projectName : "Project"}
          </span>
          ?
        </span>
      }
      onConfirm={() => {
        handleAssignUser(user.userId!);
      }}
      okText="Yes"
      cancelText="No"
      icon={
        <QuestionCircleOutlined className="top-1 text-yellow-500 text-xl" />
      }
    >
      {renderUser(user, index, false)}
    </Popconfirm>
  );

  const renderUsersList = (userList: Partial<User>[] | null) => {
    if (!userList) return null;
    return userList.map((user, index) => (
      <>
        <DesktopView>{renderUserDesktop(user, index)}</DesktopView>
        <TabletView>{renderUser(user, index, true)}</TabletView>
        <MobileView>{renderUser(user, index, true)}</MobileView>
      </>
    ));
  };

  return (
    <div className={containerStyle}>
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
        {renderUsersList(userList)}
      </div>
    </div>
  );
}
