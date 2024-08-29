import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? (
    currentUser.role === "user" ? (
      <Outlet />
    ) : (
      <Navigate to={"/vendorDashboard"} />
    )
  ) : (
    <Navigate to={"/signin"} />
  );
}
