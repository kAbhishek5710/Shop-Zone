import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageSlider from "../components/ImageSlider";
import { ImCross } from "react-icons/im";
import { Divider } from "@mui/material";
import { FaTag } from "react-icons/fa6";
import { handleRemovefromCart } from "../utils/cartActions";

export default function Cart() {
  const { currentUser } = useSelector((state) => state.user);
  const [productsData, setProductsData] = useState([{}]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [platformCharges, setPlatformCharges] = useState(25);
  const dispatch = useDispatch();

  const productIds = currentUser
    ? currentUser.cart.map((item) => item.productId)
    : [];

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const fetchedProductsData = await Promise.all(
          productIds.map(async (id) => {
            const res = await fetch(`/server/product/get/${id}`);
            const data = await res.json();
            return data;
          })
        );
        const refinedProductsData = fetchedProductsData.map((product) => ({
          ...product,
          images: Array.isArray(product.images)
            ? product.images.map((image) => image.url)
            : [],
        }));
        setProductsData(refinedProductsData);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    if (productIds.length > 0) {
      fetchProductData();
    }
  }, [currentUser]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // console.log(productsData);

  const totalMRP = productsData.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  const totalDiscounts = productsData.reduce((acc, product) => {
    const discount = Math.round(product.price * (product.discount / 100));
    return acc + discount;
  }, 0);

  const shippingCharges =
    totalMRP - totalDiscounts > 1200
      ? 0
      : Math.round((totalMRP - totalDiscounts) * (5 / 100));

  const finalAmount =
    totalMRP - totalDiscounts - shippingCharges - platformCharges;

  return (
    <>
      <div className="mt-16">
        <Divider orientation="horizontal" flexItem />
      </div>
      <div className="flex md:flex-row flex-col gap-6 max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-7xl mx-auto mb-16">
        <div className="mt-8 md:w-2/3">
          {productsData.map((product) => (
            <div
              key={product._id}
              className="relative flex flex-col flex-wrap md:flex-row gap-6 sm:gap-12 sm:w-full bg-white bg-opacity-80 rounded-lg p-3 px-8 sm:p-2 mb-4"
            >
              <div className="flex flex-col absolute top-3 right-3">
                <button
                  className="text-customBlack text-xs px-2 py-1 rounded-3xl hover:bg-slate-200"
                >
                  <ImCross />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 overflow-hidden sm:gap-12 sm:w-full">
                <div className="w-48 sm:w-36 h-64 sm:h-48 object-cover">
                  {Array.isArray(product.images) &&
                  product.images.length > 0 ? (
                    <ImageSlider images={product.images} />
                  ) : (
                    <div className="text-gray-500 text-sm">
                      No images available
                    </div> // Fallback for no images
                  )}
                </div>
                <div className="sm:mt-1 flex flex-wrap flex-col gap-1 overflow-hidden">
                  <h1 className="font-semibold tracking-wide font-jersey-1 text-base opacity-95">
                    {product.brand}
                  </h1>
                  <p className="text-sm flex flex-wrap text-gray-500 opacity-60 truncate">
                    {product.productName}
                  </p>
                  <p className="text-xs opacity-65 font-semibold">
                    Sold By : {product.soldBy}
                  </p>
                  <p className="font-semibold text-customBlue2 text-sm">
                    {product.stock === 0 && "OUT OF STOCK"}
                  </p>
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
                      <span className="text-xs text-red-700 opacity-55 font-bold">
                        ({product.discount}% off)
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-green-700 font-semibold opacity-60">
                    Inclusive of all taxes
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Divider orientation="vertical" flexItem />
        <div className="mt-4 flex flex-col md:w-1/3">
          <h1 className="text-center items-center font-semibold text-xl tracking-wider my-1">
            Cart Summary
          </h1>
          <Divider orientation="horizontal" flexItem />
          <div className="my-3 flex flex-col gap-1">
            <h3 className="text-xs font-semibold text-slate-500">Coupons</h3>
            <div className="flex items-center justify-between mr-8 gap-2">
              <span className="flex items-center gap-4">
                <FaTag className="text-xl" />
                <p className="md:text-base font-semibold text-customBlue uppercase">
                  Apply Coupons
                </p>
              </span>
              <button className="border px-4 py-1 uppercase rounded-lg text-red-600 font-semibold border-red-300">
                Apply
              </button>
            </div>
          </div>
          <Divider orientation="horizontal" flexItem />
          <div className="flex flex-col items-center my-4">
            <h3 className="text-base font-semibold mb-6 text-slate-500">
              Price Details
              <Divider orientation="horizontal" flexItem />
            </h3>

            <div className="grid grid-cols-2 gap-4 items-center sm:gap-x-48 md:gap-x-24 lg:gap-x-48 my-3 w-full">
              <p className="text-xs text-slate-700 font-semibold opacity-80">
                Total MRP
              </p>
              <p className="text-sm font-semibold text-customBlue2">
                <span className="mr-1 text-customBlue3 font-bold ">
                  &#8377;
                </span>
                {totalMRP.toLocaleString("en-In")}
              </p>

              <p className="text-xs text-slate-700 font-semibold opacity-80">
                Total Discounts
              </p>
              <p className="text-red-600 text-sm font-semibold opacity-65">
                -&nbsp;
                <span className="mr-1font-bold ">&#8377;</span>
                {totalDiscounts.toLocaleString("en-In")}
              </p>

              <p className="text-xs text-slate-700 font-semibold opacity-80">
                Shipping Charges
              </p>
              <p className="text-sm font-semibold text-customBlue2">
                <span className="mr-1 text-customBlue3 font-bold ">
                  &#8377;
                </span>
                {shippingCharges}
              </p>

              <p className="text-xs text-slate-700 font-semibold opacity-80">
                Platform Fees
              </p>
              <p className="text-sm font-semibold text-customBlue2">
                <span className="mr-1 text-customBlue3 font-bold ">
                  &#8377;
                </span>
                {platformCharges}
              </p>
            </div>
            <Divider orientation="horizontal" flexItem />
            <div className="grid grid-cols-2 sm:gap-x-48 md:gap-x-24 lg:gap-x-48 my-3 w-full">
              <p className="font-bold text-sm opacity-90">Final Amount</p>
              <p className="mr-5">
                <span className="mr-1 text-customBlue3 font-bold ">
                  &#8377;
                </span>
                {finalAmount.toLocaleString("en-In")}
              </p>
            </div>
            <button className="border p-2 w-full mt-3 rounded-xl text-customWhite text-lg tracking-wider bg-red-500">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
