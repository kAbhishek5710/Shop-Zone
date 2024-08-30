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
      const res = await fetch(`/server/client/update/user/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateClientFailure(data.message));
        return;
      }
      dispatch(updateClientSuccess(data));
      navigate("/profile");
    } catch (err) {
      dispatch(updateClientFailure(err.message));
    }
  };

  return (
    <div className="mt-16 max-w-sm md:max-w-xl mx-auto">
      <h1 className="text-center text-xl font-bold underline underline-offset-4 text-customBlue tracking-widest">
        Edit the Details
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-12">
        {currentUser.role === "vendor" ? (
          <div className="flex flex-col gap-4">
            <input
              id="vendorName"
              type="text"
              onChange={handleChange}
              className="p-3 rounded-lg bg-white outline-none"
              value={currentUser.vendorName}
              required
            />
            <input
              id="brandName"
              type="text"
              onChange={handleChange}
              className="p-3 rounded-lg bg-white outline-none"
              placeholder={currentUser.brandName}
              required
            />
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
              className="p-3 rounded-lg opacity-75 bg-white outline-none"
              value={currentUser.mobileNumber}
              disabled
            />
          </div>
        )}
        <input
          id="email"
          type="email"
          className="p-3 rounded-lg opacity-75 bg-white outline-none"
          defaultValue={currentUser.email}
          disabled
        />
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

        <button className="bg-customBlue2 uppercase font-semibold text-white p-3 rounded-lg hover:opacity-90">
          Apply Changes
        </button>
      </form>
    </div>
  );
}
