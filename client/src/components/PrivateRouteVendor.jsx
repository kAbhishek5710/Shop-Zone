import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRouteVendor() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? (
    currentUser.role === "vendor" ? (
      <Outlet />
    ) : (
      <Navigate to={"/profile"} />
    )
  ) : (
    <Navigate to={"/signin"} />
  );
}
