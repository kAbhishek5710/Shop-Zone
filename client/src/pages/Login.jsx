import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClickUserType = () => setChecked((check) => !check);
  // console.log(checked);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex justify-center items-center h-[92vh]">
      <div className="flex flex-col text-center justify-center p-6 rounded-lg shadow-xl backdrop-hue-rotate-90  shadow-gray-500 border">
        <h1 className="text-4xl md:mx-28 lg:mx-32 underline-offset-8 font-dancing-script mt-4 mb-6 font-bold text-center text-customBlack">
          Welcome Back
        </h1>
        <div className="flex flex-col justify-center font-semibold items-center mb-14">
          <h1 className="text-customTemp font-semibold text-lg">Login As : </h1>
          <div className="mt-1">
            <span className="text-customBlue3 text-base">User</span>
            <Switch {...label} onClick={handleClickUserType} />
            <span className="text-customBlue3 text-base">Vendor</span>
          </div>
        </div>
        <form action="" className="flex flex-col gap-4">
          {checked ? (
            <input
              id="vendor-name"
              type="text"
              className="p-3 rounded-lg bg-white outline-none"
              placeholder="Vendor Name"
            />
          ) : (
            <input
              id="email"
              type="email"
              className="p-3 rounded-lg bg-white outline-none"
              placeholder="E-Mail"
            />
          )}
          <Input
            id="standard-adornment-password password"
            type={showPassword ? "text" : "password"}
            className="border p-2 pl-3 rounded-lg bg-white"
            placeholder="password"
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

          <button className="bg-customBlue2 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-80">
            SIGN IN
          </button>
        </form>
        <div className="flex justify-between mt-3 gap-20">
          <span>
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <b>Sign Up</b>
            </Link>
          </span>
          <span>Forgot Password</span>
        </div>
      </div>
    </div>
  );
}
