import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// import redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux/useRedux";
import { generalActions } from "../../redux/slice/generalSlice";

// import ANTD components
import {
  FileAddOutlined,
  SnippetsOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [currentMenuItem, setCurrentMenuItem] = useState("0");

  let sidebarCollapse = useAppSelector(
    (state) => state.generalReducer.sidebarCollapse
  );

  const routes: { [key: string]: string } = {
    "/create-project": "create-project",
    "/": "project-management",
    "/profile": "profile",
    "/admin/userManagement": "admin/userManagement",
  };

  useEffect(() => {
    setCurrentMenuItem(routes[location.pathname]);
  }, [location.pathname]);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={sidebarCollapse}
      collapsedWidth={0}
      breakpoint="lg"
      theme={"light"}
      width="230"
      style={{ height: "100%", paddingTop: "80px" }}
      onBreakpoint={(broken) => {
        if (broken) {
          dispatch(generalActions.collapseSidebar());
        }
      }}
    >
      <div className="logo">
        <NavLink to="/" className="px-12 flex justify-center items-center">
          <img className="w-full" src="/jiraCloneLogo.png" alt="web-logo" />
        </NavLink>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[currentMenuItem]}
        items={[
          {
            key: "create-project",
            icon: (
              <div className="py-1 transition">
                <FileAddOutlined className="flex text-lg" />
              </div>
            ),
            label: (
              <NavLink to="/create-project" className="text-base font-semibold">
                Create Project
              </NavLink>
            ),
          },
          {
            key: "project-management",
            icon: (
              <div className="py-1 transition">
                <SnippetsOutlined className="flex text-lg" />
              </div>
            ),
            label: (
              <NavLink to="/" className="text-base font-semibold">
                Project Management
              </NavLink>
            ),
          },
          {
            key: "profile",
            icon: (
              <div className="py-1 transition">
                <UserOutlined className="flex text-lg" />
              </div>
            ),
            label: (
              <NavLink to="/profile" className="text-base font-semibold">
                My Profile
              </NavLink>
            ),
          },
          {
            key: "user-management",
            icon: (
              <div className="py-1 transition">
                <UserAddOutlined className="flex text-lg" />
              </div>
            ),
            label: (
              <NavLink to="/admin/userManagement" className="text-base font-semibold">
                User Management
              </NavLink>
            ),
          },
        ]}
      />
    </Sider>
  );
}
