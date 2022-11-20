import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { LOCAL_SERVICE } from "../../services/localServ";
import { message } from "antd";

export default function Header() {
  const [user, setUser] = useState(LOCAL_SERVICE.user.get());
  let navigate = useNavigate();

  let handleLogout = () => {
    setUser(null);
    LOCAL_SERVICE.user.unset();
    message.error("please log in");
    navigate("/login");
  };

  let renderLogin = () => {
    return (
      <p>
        <NavLink to={"/admin/userManagement"}>
          <span className="text-blue-400 mr-3 animate-pulse">{user.name}</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="px-2 py-1 bg-red-400 hover:bg-red-600 duration-300 text-white rounded "
        >
          <LogoutOutlined className="text-xl py-1" /> <span> Log out</span>
        </button>
      </p>
    );
  };

  return (
    <div className="container bg-gray-800 shadow-xl fixed top-0 w-full z-50">
      <div className="flex justify-between pt-2 px-2">
        <NavLink to={"/"}>
          <div className="hover:animate-spin ">
            <span className="text-green-400 text-3xl">Amazzzing Jira</span>{" "}
          </div>
        </NavLink>

        <div className="pt-1"> {renderLogin()} </div>
      </div>
    </div>
  );
}
