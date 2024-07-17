import { Link } from "react-router-dom";
import logo from "../../public/Image.png";
import { FaSearch, FaRegHeart } from "react-icons/fa";
import { IoCartOutline, IoPersonCircleSharp } from "react-icons/io5";

export default function Header() {
  return (
    <div className="p-4 shadow-lg bg-customWhite">
      <header className="flex justify-around items-center">
        <Link to={"/"}>
          <div className="flex justify-center gap-2 items-center">
            <img src={logo} alt="logo-Image" className="h-10" />
            <h1 className="text-2xl font-semibold hidden md:block text-customBlack">
              <span>Shop</span>
              <span>Zone</span>
            </h1>
          </div>
        </Link>
        <ul className="justify-between gap-6 text-lg hidden lg:flex font-semibold opacity-75">
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
            className="m-1 outline-none md:w-64 bg-transparent"
            placeholder="Search you Styles.."
          />
          <button>
            <FaSearch className="m-1 text-xl text-slate-600" />
          </button>
        </form>
        <ul className="flex justify-center items-center gap-4">
          <Link to={"/profile"}>
            <li className="justify-center hidden md:block items-center flex-col">
              <IoPersonCircleSharp className="text-4xl text-slate-700" />
            </li>
          </Link>
          <Link to={"/wishlist"}>
            <li>
              <FaRegHeart className="text-3xl text-red-400" />
            </li>
          </Link>
          <Link to={"/checkout/cart"}>
            <li>
              <IoCartOutline className="text-4xl text-slate-700" />
            </li>
          </Link>
        </ul>
      </header>
    </div>
  );
}
