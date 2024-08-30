import React from "react";
import { handleSignOut } from "../utils/logout";
import { useDispatch } from "react-redux";

export default function VendorDashboard() {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => handleSignOut(dispatch)}
      className="bg-customPink rounded-lg p-2 text-customWhite"
    >
      Log Out
    </button>
  );
}
