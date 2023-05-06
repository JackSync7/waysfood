import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./context/userContext";

export function PrivateRouteLogin() {
  const [state] = useContext(UserContext);
  if (!state.isLogin) {
    return <Outlet />;
  }
  return <Outlet />;
}
export function PrivateRouteCustomer() {
  const [state] = useContext(UserContext);

  if (state.user.roles === "partner") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export function PrivateRoutePartner() {
  const [state] = useContext(UserContext);

  if (state.user.roles !== "partner") {
    return <Navigate to="/partner-dashboard" />;
  }
  return <Outlet />;
}
