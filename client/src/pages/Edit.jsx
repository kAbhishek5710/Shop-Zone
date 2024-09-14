import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  updateClientStart,
  updateClientSuccess,
  updateClientFailure,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Edit() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateClientStart());
      const res = await fetch(
        currentUser.role === "user"
          ? `/server/client/update/user/${currentUser._id}`
          : `/server/client/update/vendor/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateClientFailure(data.message));
        return;
      }
      dispatch(updateClientSuccess(data));
      navigate(currentUser.role === "user" ? "/profile" : "/vendorDashboard");
    } catch (err) {
      dispatch(updateClientFailure(err.message));
    }
  };

  return (
    <div className="mt-16 items-center max-w-sm md:max-w-xl mx-auto">
      <h1 className="text-center text-xl font-bold underline underline-offset-4 text-customBlue tracking-widest">
        Edit the Details
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-4 mt-12"
      >
        {currentUser.role === "vendor" ? (
          <div className="flex flex-col w-full gap-4">
            <input
              id="companyName"
              type="text"
              className="p-3 rounded-lg opacity-70 bg-white outline-none"
              value={currentUser.companyName}
              disabled
            />
            <input
              id="companyWebsite"
              type="text"
              onChange={handleChange}
              className="p-3 rounded-lg bg-white outline-none"
              defaultValue={
                currentUser.companyWebsite ? currentUser.companyWebsite : ""
              }
              placeholder={currentUser.companyWebsite ? "" : "Company Website"}
            />
            <input
              id="name"
              type="text"
              onChange={handleChange}
              className="p-3 rounded-lg bg-white outline-none"
              value={currentUser.name}
            />
            <input
              id="email"
              type="email"
              className="p-3 rounded-lg opacity-75 bg-white outline-none"
              defaultValue={currentUser.email}
              disabled
            />
            <div className="flex flex-col gap-4">
              <input
                id="street"
                type="text"
                onChange={handleChange}
                className="p-3 rounded-lg bg-white outline-none"
                defaultValue={currentUser.address.street}
                required
              />
              <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                <input
                  id="city"
                  type="text"
                  onChange={handleChange}
                  className="p-3 flex-grow rounded-lg bg-white outline-none"
                  defaultValue={currentUser.address.city}
                  required
                />
                <input
                  id="state"
                  type="text"
                  onChange={handleChange}
                  className="p-3 flex-grow rounded-lg bg-white outline-none"
                  defaultValue={currentUser.address.state}
                  required
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                <input
                  id="postalCode"
                  type="text"
                  onChange={handleChange}
                  className="p-3 flex-grow rounded-lg bg-white outline-none"
                  defaultValue={currentUser.address.postalCode}
                  pattern="[0-9]{5,6}"
                  maxLength={6}
                  required
                />
                <input
                  id="country"
                  type="text"
                  onChange={handleChange}
                  className="p-3 flex-grow rounded-lg bg-white outline-none"
                  defaultValue={currentUser.address.country}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <input
              id="username"
              type="text"
              className="p-3 rounded-lg opacity-75 bg-white outline-none"
              defaultValue={currentUser.username}
              disabled
            />
            <input
              id="mobileNumber"
              type="text"
              onChange={handleChange}
              className="p-3 rounded-lg bg-white outline-none"
              defaultValue={
                currentUser.mobileNumber && currentUser.mobileNumber
              }
              placeholder={!currentUser.mobileNumber && "Mobile Number"}
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
            <input
              id="email"
              type="email"
              className="p-3 rounded-lg opacity-75 bg-white outline-none"
              defaultValue={currentUser.email}
              disabled
            />
          </div>
        )}
        {currentUser.role === "user" && (
          <div className="flex flex-col gap-4">
            <div className="pr-3 rounded-lg bg-white outline-none">
              <select
                id="gender"
                onChange={handleChange}
                defaultValue={currentUser.gender}
                className="p-3 rounded-lg bg-white outline-none w-full"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <input
              id="dateOfBirth"
              type="date"
              onChange={handleChange}
              className="p-3 rounded-lg bg-white outline-none"
              defaultValue={
                currentUser.dateOfBirth
                  ? moment(currentUser.dateOfBirth).format("YYYY-MM-DD")
                  : ""
              }
            />
            <input
              id="location"
              type="text"
              onChange={handleChange}
              className="p-3 rounded-lg bg-white outline-none"
              defaultValue={currentUser.location ? currentUser.location : ""}
              placeholder={currentUser.location ? "" : "Specify the Loaction!!"}
            />
            <input
              id="alternateMobile"
              type="text"
              onChange={handleChange}
              className="p-3 rounded-lg bg-white outline-none"
              defaultValue={
                currentUser.alternateMobile ? currentUser.alternateMobile : ""
              }
              placeholder={
                currentUser.alternateMobile
                  ? ""
                  : "Specify alternative Mobile number"
              }
              pattern="[0-9]{10}"
              maxLength="10"
            />
          </div>
        )}
        <button className="bg-customBlue2 uppercase font-semibold text-white p-3 rounded-lg hover:opacity-90">
          Apply Changes
        </button>
      </form>
    </div>
  );
}
