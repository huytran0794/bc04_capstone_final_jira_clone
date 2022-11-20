import React from "react";
import { useNavigate } from "react-router-dom";

// import redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux/useRedux";
import { generalActions } from "../../redux/slice/generalSlice";

// import local component
import Container from "../Container/Container";

// import local services
import { LOCAL_SERVICE } from "../../services/localServ";

// import ANTD Component
import {
  ExportOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Space } from "antd";
import toastify from "../../utils/toastify/toastifyUtils";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sidebarCollapse = useAppSelector(
    (state) => state.generalReducer.sidebarCollapse
  );

  const user = LOCAL_SERVICE.user.get();
  if (!user) return null;

  // ANTD dropdown control
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a onClick={() => { }} className="text-base">
              Profile
            </a>
          ),
          icon: (
            <div className="py-1">
              <UserOutlined className="flex text-lg" />
            </div>
          ),
        },
        {
          key: "4",
          danger: true,
          label: (
            <a
              onClick={() => {
                LOCAL_SERVICE.user.unset();
                toastify("success", "Log out sucessfully");
                setTimeout(() => {
                  navigate("login");
                }, 700);
              }}
              className="text-base"
            >
              Log out
            </a>
          ),
          icon: (
            <div className="py-1 transition">
              <ExportOutlined rotate={180} className="flex text-lg" />
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <Container>
      <div className="my-4 flex justify-between items-center">
        <div>
          {React.createElement(
            sidebarCollapse ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className:
                "trigger text-3xl hover:text-rose-500 transition duration-300",
              onClick: () => dispatch(generalActions.toggleCollapseSidebar()),
            }
          )}
        </div>
        <Dropdown trigger={["click"]} overlay={menu}>
          <Space className="cursor-pointer">
            <Avatar src={user.avatar} size={40} />
            <span className="inline-block text-lg">{user.name}</span>
          </Space>
        </Dropdown>
      </div>
    </Container>
  );
};

export default Header;
