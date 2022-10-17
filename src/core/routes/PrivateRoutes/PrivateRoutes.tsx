import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LOCAL_SERV } from "../../services/localServ";

const PrivateRoutes = () => {
  let auth = LOCAL_SERV.user.get();
  return auth ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoutes;
