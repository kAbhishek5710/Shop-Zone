import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/user/userSlice";

export default function LogOut() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/server/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess());
    } catch (err) {
      dispatch(signOutFailure(err.message));
    }
  };
  return (
    <button
      onClick={handleSignOut}
      className="bg-customPink rounded-lg p-2 text-customWhite"
    >
      Log Out
    </button>
  );
}
