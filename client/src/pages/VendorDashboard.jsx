import React from "react";
import { handleSignOut } from "../utils/functionalities.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";

export default function VendorDashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="mx-12 my-12">
      <div className="flex justify-center items-center gap-4">
        <h1 className="text-3xl mb-2 ml-8 tracking-widest font-dancing-script font-bold text-customBlue ">
          {currentUser.companyName}
        </h1>
        <h1 className="text-sm mt-6 mb-2 tracking-widest font-dancing-script font-bold text-customBlue3 ">
          <span className="mr-2 font-jersey-10 text-slate-400 font-semibold">
            by
          </span>
          {currentUser.name}
        </h1>
      </div>
      <Divider orientation="horizontal" flexItem />
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-8">
        <div className="flex flex-col px-20 py-10 justify-center items-center border rounded-lg border-customBlue3">
          <h1 className="text-base mb-3 font-semibold tracking-widest">
            Profile Information
          </h1>
          <Divider orientation="horizontal" flexItem />
          <div className="grid grid-cols-2 text-customTemp flex-wrap gap-x-32 my-12 gap-y-6">
            <p className="truncate">Company Name</p>
            <p className="font-semibold">{currentUser.companyName}</p>

            <p className="truncate">Company Mail</p>
            <p className="font-semibold">
              {currentUser.companyWebsite
                ? currentUser.companyWebsite
                : "- not added -"}
            </p>

            <p className="truncate">Owned By</p>
            <p className="font-semibold">{currentUser.name}</p>

            <p className="truncate">E-Mail</p>
            <p className="font-semibold">{currentUser.email}</p>

            <p className="truncate">Address</p>
            <p className="font-semibold">
              {currentUser.address.street + ", " + currentUser.address.city}
            </p>

            <p className="truncate">State</p>
            <p className="font-semibold">{currentUser.address.state}</p>

            <p className="truncate">Country</p>
            <p className="font-semibold">{currentUser.address.country}</p>
          </div>
          <div className="flex flex-col w-full gap-3 justify-center">
            <Link
              to={"/vendorDashboard/add"}
              className="bg-customBlue3 text-center mt-4 rounded-lg p-2 text-customWhite"
            >
              Add Products
            </Link>
            <Link
              to={"/vendorDashboard/edit"}
              className="bg-customBlue text-center rounded-lg p-2 text-customWhite"
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
        <div className="flex flex-col p-4 border rounded-lg border-customBlue3 justify-center items-center">
          <h1 className="text-base mb-3 font-semibold tracking-widest">
            Store Stock
          </h1>
          <Divider orientation="horizontal" flexItem />
        </div>
      </div>
    </div>
  );
}