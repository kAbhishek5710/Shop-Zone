import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/user/userSlice";

export const handleSignOut = async (dispatch) => {
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
