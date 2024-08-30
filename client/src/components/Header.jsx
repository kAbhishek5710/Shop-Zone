import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "/Image.png";
import { FaSearch, FaRegHeart } from "react-icons/fa";
import { IoCartOutline, IoPersonCircleSharp } from "react-icons/io5";
import DropdownItem from "./DropdownItem";
import user from "../assets/dropdown_img/user.png";
import edit from "../assets/dropdown_img/edit.png";
import help from "../assets/dropdown_img/help.png";
import logout from "../assets/dropdown_img/logout.png";
import { useDispatch, useSelector } from "react-redux";
import { handleSignOut } from "../utils/functionalities";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(!open);
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div className="p-2 shadow-lg  bg-customWhite sticky top-0 w-full z-50">
      <header className="flex justify-around items-center">
        <Link to={"/"}>
          <div className="flex justify-center gap-2 items-center">
            <img src={logo} alt="logo-Image" className="h-8" />
            <h1 className="text-xl font-semibold hidden md:block text-customBlack">
              <span>Shop</span>
              <span>Zone</span>
            </h1>
          </div>
        </Link>
        <ul className="justify-between gap-6 text-base hidden lg:flex font-semibold opacity-75">
          <Link to={"/shop/men"}>
            <li>Men</li>
          </Link>
          <Link to={"/shop/women"}>
            <li>Women</li>
          </Link>
          <Link to={"/shop/kids"}>
            <li>Kids</li>
          </Link>
          <Link to={"/shop/home-living"}>
            <li>Home & Living</li>
          </Link>
          <Link to={"/shop/beauty"}>
            <li>Beauty</li>
          </Link>
        </ul>
        <form className="flex justify-center items-center rounded-lg p-1 px-3 border-slate-400 bg-slate-200">
          <input
            type="text"
            className="m-1 outline-none w-32 md:w-64 bg-transparent"
            placeholder="Search Styles.."
          />
          <button>
            <FaSearch className="m-1 text-lg md:text-xl text-slate-600" />
          </button>
        </form>
        <ul className="flex justify-center items-center gap-4" ref={menuRef}>
          <Link>
            <li
              className="justify-center items-center flex-col"
              onClick={handleClick}
            >
              <IoPersonCircleSharp className="text-3xl text-slate-700" />
            </li>
            <div
              className={`absolute right-0 mt-4 w-522 mr-8 md:mr-16 lg:mr-20 bg-white rounded-md shadow-lg ${
                open ? "block" : "hidden"
              }`}
            >
              {currentUser && (
                <Link
                  to={
                    currentUser.role === "user"
                      ? "/profile"
                      : "/vendorDashboard"
                  }
                >
                  <h3
                    onClick={handleClick}
                    className="p-4 border-b text-base font-semibold opacity-80"
                  >
                    {currentUser.role == "user"
                      ? currentUser.username
                      : currentUser.brandName}
                  </h3>
                </Link>
              )}
              <ul className="p-2">
                {!currentUser && (
                  <li onClick={handleClick}>
                    <Link to={"/signin"}>
                      <DropdownItem img={user} text="Login / Sign Up" />
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <div>
                    <li onClick={handleClick}>
                      <Link
                        to={
                          currentUser.role === "user"
                            ? "/profile"
                            : "/vendorDashboard"
                        }
                      >
                        <DropdownItem img={user} text="My Profile" />
                      </Link>
                    </li>
                    <li onClick={handleClick}>
                      <Link to={"/profile/edit"}>
                        <DropdownItem img={edit} text="Edit Profile" />
                      </Link>
                    </li>
                  </div>
                )}
                <li onClick={handleClick}>
                  <Link to={"/help"}>
                    <DropdownItem img={help} text="Help" />
                  </Link>
                </li>
                {currentUser && (
                  <li
                    onClick={() => {
                      handleSignOut(dispatch);
                      handleClick();
                    }}
                  >
                    <DropdownItem img={logout} text="Logout" />
                  </li>
                )}
              </ul>
            </div>
          </Link>
          <Link to={"/wishlist"}>
            <li className="flex flex-col justify-center items-center">
              <FaRegHeart className="text-2xl text-red-400" />
            </li>
          </Link>
          <Link to={"/checkout/cart"}>
            <li>
              <IoCartOutline className="text-3xl text-slate-700" />
            </li>
          </Link>
        </ul>
      </header>
    </div>
  );
}
