import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { handleSignOut } from "../utils/functionalities.js";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  deleteClientStart,
  deleteClientFailure,
  deleteClientSuccess,
} from "../redux/user/userSlice.js";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteClientStart());
      const res = await fetch(`/server/client/delete/user/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteClientFailure(data.message));
        return;
      }
      dispatch(deleteClientSuccess(data));
    } catch (err) {
      dispatch(deleteClientFailure(err.message));
    }
  };

  return (
    <div className="mx-12 mt-8">
      <h1 className="ml-8 mb-4 font-extrabold text-xl font-dancing-script text-gray-500 tracking-widest">
        {currentUser.username}
      </h1>
      <Divider orientation="horizontal" flexItem />
      <div className="flex justify-start flex-col-reverse md:flex-row gap-6 text-gray-700">
        <div className="w-full md:w-1/5 min-w-[160px] flex-none grid gap-2 justify-center items-start  text-sm">
          <div className="p-4">
            <h3 className="text-base">
              <a href="#">Overview</a>
            </h3>
          </div>
          <Divider orientation="horizontal" flexItem />
          <div className="p-4">
            <h1 className="text-gray-500 text-base opacity-70">ORDERS</h1>
            <ul className="mt-3 ml-2">
              <li>
                <a href="#">Orders & Returns</a>
              </li>
            </ul>
          </div>
          <Divider orientation="horizontal" flexItem />
          <div className="p-4">
            <h1 className="text-gray-500 text-base opacity-70">CREDITS</h1>
            <ul className="mt-3 ml-2">
              <li>
                <a href="#">Coupons</a>
              </li>
              <li>
                <a href="#">Credits</a>
              </li>
              <li>
                <a href="#">Cash Points</a>
              </li>
            </ul>
          </div>
          <Divider orientation="horizontal" flexItem />
          <div className="p-4">
            <h1 className="text-gray-500 text-base opacity-70">PROFILE</h1>
            <ul className="mt-3 ml-2">
              <li>
                <a href="#">Saved Cards</a>
              </li>
              <li>
                <a href="#">Saved UPI</a>
              </li>
              <li>
                <a href="#">Saved Wallets</a>
              </li>
              <li>
                <a href="#">Addresses</a>
              </li>
              <li>
                <a href="#">Shopping Insiders</a>
              </li>
              <li onClick={handleDeleteUser}>
                <a href="#">Delete Account</a>
              </li>
            </ul>
          </div>
          <Divider orientation="horizontal" flexItem />
        </div>
        <Divider orientation="vertical" flexItem className="hidden md:flex" />
        <div className="flex flex-col items-center md:items-start px-2 flex-wrap md:px-12 lg:px-60 pt-8 my-5 border border-customBlue border-opacity-20 rounded-lg flex-grow">
          <h1 className="text-black ml-4 opacity-80 font-semibold text-2xl">
            Profile Details
          </h1>
          <Divider orientation="horizontal" flexItem />
          <div className="flex flex-col flex-wrap gap-8 my-8 text-base  font-medium w-full">
            <div>
              <img src="" alt="" />
            </div>
            <div className="grid grid-cols-2  flex-grow gap-y-6">
              <p className="truncate">Full Name</p>
              <p>{currentUser.username}</p>

              <p>Mobile Number</p>
              <p>
                {currentUser.mobileNumber
                  ? currentUser.mobileNumber
                  : "- not added -"}
              </p>

              <p>Email ID</p>
              <p className="truncate">{currentUser.email}</p>

              <p>Gender</p>
              <p>
                {currentUser.gender === null
                  ? "- not disclosed -"
                  : currentUser.gender}
              </p>

              <p>Date of Birth</p>
              <p>
                {currentUser.dateOfBirth === null
                  ? "- not disclosed -"
                  : moment(currentUser.dateOfBirth).format("DD / MM / YYYY")}
              </p>

              <p>Location</p>
              <p>
                {currentUser.location === null
                  ? "- not disclosed -"
                  : currentUser.location}
              </p>

              <p>Alternate Mobile</p>
              <p>
                {currentUser.alternateMobile === null
                  ? "- not disclosed -"
                  : currentUser.alternateMobile}
              </p>
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <Link
                to={"/profile/edit"}
                className="bg-customBlue text-center mt-4 rounded-lg p-2 text-customWhite"
              >
                Edit the details
              </Link>
              <button
                onClick={() => handleSignOut(dispatch)}
                className="bg-customPink rounded-lg p-2 text-customWhite"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
