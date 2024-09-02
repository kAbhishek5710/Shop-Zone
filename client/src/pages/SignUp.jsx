import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import {
  signInSuccess,
  signUpFailure,
  signUpStart,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickUserType = () => {
    setChecked((check) => !check);
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpStart());
      const res = await fetch(
        checked ? "/server/auth/vendorSignup" : "/server/auth/userSignup",
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
        setError(data.message);
        dispatch(signUpFailure(data.message));
        return;
      }
      dispatch(signInSuccess());
      navigate("/signin");
    } catch (err) {
      setError(err.message);
      dispatch(signUpFailure(err.message));
    }
  };

  return (
    <div className="flex max-w-2xl justify-center mx-auto my-12 items-center">
      <div className="flex flex-col text-center justify-center p-8 rounded-lg shadow-xl backdrop-hue-rotate-90  shadow-gray-500 border">
        <h1 className="text-4xl m-10 md:mx-16 lg:mx-24 font-dancing-script mt-4 mb-6 font-bold text-center text-customBlack">
          Let's get Started
        </h1>
        <div className="flex flex-col justify-center font-semibold items-center mb-14">
          <h1 className="text-customTemp font-semibold text-lg">
            Sign Up As :{" "}
          </h1>
          <div className="mt-1 text-lg">
            <span className="text-customBlue3">User</span>
            <Switch {...label} onClick={handleClickUserType} />
            <span className="text-customBlue3">Vendor</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {checked ? (
            <div className="flex flex-col gap-4">
              <input
                id="name"
                type="text"
                onChange={handleChange}
                className="p-3 rounded-lg bg-white outline-none"
                placeholder="Vendor Name"
                required
              />
              <input
                id="companyName"
                type="text"
                onChange={handleChange}
                className="p-3 rounded-lg bg-white outline-none"
                placeholder="Company Name"
                required
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <input
                id="username"
                type="text"
                onChange={handleChange}
                className="p-3 rounded-lg bg-white outline-none"
                placeholder="Name"
                required
              />
              <input
                id="mobileNumber"
                type="text"
                onChange={handleChange}
                className="p-3 rounded-lg bg-white outline-none"
                placeholder="Mobile Number"
                required
                pattern="[0-9]{10}"
                maxLength="10"
              />
            </div>
          )}
          <input
            id="email"
            type="email"
            onChange={handleChange}
            className="p-3 rounded-lg bg-white outline-none"
            placeholder="email"
            required
          />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            className="border p-2 pl-3 rounded-lg bg-white"
            placeholder="password"
            required
            disableUnderline
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {checked && (
            <div className="flex flex-col gap-4">
              <input
                id="street"
                type="text"
                onChange={handleChange}
                className="p-3 rounded-lg bg-white outline-none"
                placeholder="Street"
                required
              />
              <div className="flex justify-between flex-grow">
                <input
                  id="city"
                  type="text"
                  onChange={handleChange}
                  className="p-3 rounded-lg bg-white outline-none"
                  placeholder="City"
                  required
                />
                <input
                  id="state"
                  type="text"
                  onChange={handleChange}
                  className="p-3 rounded-lg bg-white outline-none"
                  placeholder="State"
                  required
                />
              </div>
              <div className="flex justify-between">
                <input
                  id="postalCode"
                  type="text"
                  onChange={handleChange}
                  className="p-3 rounded-lg bg-white outline-none"
                  placeholder="Postal Code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                />
                <input
                  id="country"
                  type="text"
                  placeholder="India"
                  onChange={handleChange}
                  className="p-3 rounded-lg bg-white outline-none"
                />
              </div>
            </div>
          )}

          <button className="bg-customBlue2 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-80">
            SIGN UP
          </button>
          {!checked && <OAuth />}
        </form>
        <div className="flex justify-between mt-3 gap-20">
          <span>
            Have an account?{" "}
            <Link to={"/signin"}>
              <b>Sign In</b>
            </Link>
          </span>
        </div>
        <div className="flex mt-2 text-red-600 font-semibold">
          {!error ? null : <p>Error!! : Fill the Details correctly!!</p>}
        </div>
      </div>
    </div>
  );
}
