import React from "react";
import shop from "../assets/Shop.jpg";

export default function Login() {
  const backgroundStyle = {
    backgroundImage: `url(${shop})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "92vh",
    margin: "0",
    overflow: "hidden",
  };
  return (
    <div style={backgroundStyle}>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl my-10 mt-16 font-semibold text-center text-red-500">
          Sign In
        </h1>
        <form action="" className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="username"
            className="border p-3 rounded-lg outline-gray-500"
            id="ussername"
          />
          <input
            type="password"
            id="password"
            className="border p-3 rounded-lg outline-gray-500"
            placeholder="password"
          />
          <button className="bg-customBlue2 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-80">
            SIGN IN
          </button>
        </form>
        <div className="flex justify-between mt-3">
          <span>
            Don't have an account? <b>Sign Up</b>
          </span>
          <span>Forgot Password</span>
        </div>
      </div>
    </div>
  );
}
