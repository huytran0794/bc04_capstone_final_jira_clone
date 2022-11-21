import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// import redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux/useRedux";

// import ANTD components
import { FileAddOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import { generalActions } from "../../redux/slice/generalSlice";

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
      style={{ height: "100%" }}
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
        ]}
      />
    </Sider>
  );
}
