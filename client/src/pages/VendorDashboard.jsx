import React, { useEffect, useState } from "react";
import { handleSignOut } from "../utils/functionalities.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import ImageSlider from "../components/ImageSlider.jsx";
import Rating from "@mui/material/Rating";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

export default function VendorDashboard() {
  const { currentUser } = useSelector((state) => state.user);

  const [vendorProducts, setVendorProducts] = useState([]);
  const [showProductsError, setShowProductsError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowProductsError(false);
        const res = await fetch(`/server/client/vendor/get/${currentUser._id}`);
        const data = await res.json();

        if (data.success === false) {
          setShowProductsError(data.message);
          return;
        }
        setVendorProducts(data);
      } catch (err) {
        setShowProductsError(true);
      }
    };
    if (currentUser?._id) {
      fetchData();
    }
  }, [currentUser._id]);

  const refinedVendorProducts = vendorProducts.map((product) => ({
    ...product,
    images: product.images.map((image) => image.url),
  }));

  const handleDeleteProduct = async (productId) => {
    try {
      const res = await fetch(`/server/product/delete/${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setVendorProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="mx-12 my-12">
      <div className="flex justify-center items-center gap-2 md:gap-4">
        <h1 className="text-xl md:text-3xl md:mb-2 ml-8 tracking-widest font-dancing-script font-bold text-customBlue ">
          {currentUser.companyName}
        </h1>
        <h1 className="text-xs md:text-sm mt-6 mb-1 md:mb-2 tracking-widest font-dancing-script font-bold text-customBlue3 ">
          <span className="mr-2 font-jersey-10 text-slate-400 font-semibold">
            by
          </span>
          {currentUser.name}
        </h1>
      </div>
      <Divider orientation="horizontal" flexItem />
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-8">
        <div className="flex flex-col px-20 py-10 justify-center items-center border rounded-lg border-customBlue3">
          <h1 className="text-lg font-dancing-script text-customBlack mb-2 font-semibold tracking-widest">
            Profile Information
          </h1>
          <Divider orientation="horizontal" flexItem />
          <div className="grid grid-cols-2 text-customTemp flex-wrap gap-x-8 md:gap-x-32 my-12 gap-y-6">
            <p className="truncate">Company Name</p>
            <p className="font-semibold">{currentUser.companyName}</p>

            <p className="truncate">Company Mail</p>
            <p className="truncate font-semibold">
              {currentUser.companyWebsite
                ? currentUser.companyWebsite
                : "- not added -"}
            </p>

            <p className="truncate">Owned By</p>
            <p className="font-semibold">{currentUser.name}</p>

            <p className="truncate">E-Mail</p>
            <p className="truncate font-semibold">{currentUser.email}</p>

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
              to={"/vendorDashboard/vendor/edit"}
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
        <div className="flex flex-col p-4 border rounded-lg border-customBlue3 items-center">
          <h1 className="text-lg font-dancing-script text-customBlack mb-5 underline underline-offset-4 font-semibold tracking-widest">
            Store Stock
          </h1>
          {refinedVendorProducts.map((product) => (
            <div
              key={product._id}
              className="relative flex flex-col sm:flex-row gap-6 sm:gap-12 sm:w-full bg-white border rounded-lg p-3 px-8 sm:p-2 mb-4"
            >
              <div className="flex flex-col gap-1 absolute top-1 right-1">
                <Link to={`/vendorDashboard/updateProduct/${product._id}`}>
                  <button className="text-customBlack text-xl px-2 py-1 rounded-3xl hover:bg-slate-200">
                    <CiEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="text-customBlack text-xl px-2 py-1 rounded-3xl hover:bg-slate-200"
                >
                  <MdDelete />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 sm:w-full">
                <div className="w-48 sm:w-36 h-64 sm:h-48 object-cover">
                  <ImageSlider images={product.images} />
                </div>
                <div className=" sm:mt-1 flex flex-col gap-1 justify-start">
                  <h1 className="font-semibold tracking-wide font-jersey-1 text-base opacity-95">
                    {product.brand}
                  </h1>
                  <p className="text-sm text-gray-500 opacity-60">
                    {product.productName}
                  </p>
                  <p className="font-semibold text-customBlue2 text-sm">
                    {product.stock === 0
                      ? "OUT OF STOCK"
                      : `${product.stock} ${product.subCategory} available`}
                  </p>
                  <div className="flex mb-2 justify-start gap-2 border rounded-lg p-1">
                    <Rating
                      name="read-only"
                      value={product.reviews.length === 0 ? 0 : product.rating}
                      readOnly
                      size="small"
                    />
                    <Divider orientation="vertical" flexItem />
                    <span className="text-xs mr-1 font-jersey-10 opacity-70">
                      {product.reviews.length} &nbsp;Ratings
                    </span>
                  </div>
                  <Divider orientation="horizontal" flexItem />
                  <div className="flex mt-1 text-base font-semibold gap-4">
                    <div>
                      <span className="mr-1 text-customPink font-bold ">
                        &#8377;
                      </span>
                      <span className="tracking-wider text-customBlue">
                        {Math.round(
                          product.price -
                            product.price * (product.discount / 100)
                        )}
                      </span>
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div className="flex items-center gap-2">
                      <span className="text-sm">MRP :</span>
                      <span className="text-customPink font-bold">&#8377;</span>
                      <span className="opacity-60 line-through">
                        {product.price}
                      </span>
                      <span className="text-xs text-red-700 opacity-55 font-bold">({product.discount}% off)</span>
                    </div>
                  </div>
                  <p className="text-sm text-green-700 font-semibold opacity-60">
                    Inclusive of all taxes
                  </p>
                </div>
              </div>
            </div>
          ))}
          <Divider orientation="horizontal" flexItem />
        </div>
      </div>
    </div>
  );
}
