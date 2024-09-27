import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { Divider } from "@mui/material";
import { TbTruckDelivery } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { FaExchangeAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../utils/cartActions";

export default function Product() {
  const { currentUser } = useSelector((state) => state.user);
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch(`/server/product/get/${params.productId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setProductData({
          ...data,
          images: data.images.map((image) => image.url),
        });
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProductData();
  }, [params.productId]);

  const getEstimatedDate = (daysAhead) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);

    const options = { weekday: "short", month: "short", day: "numeric" };
    const estimatedDate = date.toLocaleDateString("en-US", options);

    return `${estimatedDate}`;
  };

  const expectedDeliveryDate = getEstimatedDate(
    Math.floor(Math.random() * (12 - 5 + 1)) + 5
  );

  return (
    <div className="my-12 max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-7xl mx-auto">
      {!loading && productData && productData.images ? (
        <div>
          <div className="flex flex-col md:flex-row justify-evenly w-full">
            <div className="md:w-2/3 p-2">
              <ul className="flex flex-wrap gap-4">
                {productData.images.map((imageUrl, index) => (
                  <li key={index}>
                    <img
                      src={imageUrl}
                      alt={`Product Image ${index + 1}`}
                      className="h-72 w-52 rounded-lg"
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/3 mt-8 text-start flex flex-col md:mt-4">
              <h1 className="font-bold from-neutral-400 text-xl">
                {productData.brand}
              </h1>
              <p className="text-base opacity-80 tracking-wide">
                {productData.productName}
              </p>
              <div className="flex items-center justify-start gap-2 ml-1 my-1">
                <span className="flex items-center gap-1">
                  <h2 className="font-semibold">{productData.rating}</h2>
                  <FaStar color="green" />
                </span>
                <Divider orientation="vertical" flexItem />
                <span className="text-xs font-semibold mr-1 opacity-70">
                  {productData.reviews.length} &nbsp;Ratings
                </span>
              </div>
              <Divider orientation="horizontal" flexItem />
              <div className="flex items-center text-lg mt-2 font-bold gap-4">
                <div>
                  <span className="mr-1 text-customPink">&#8377;</span>
                  <span className="opacity-85">
                    {Math.round(
                      productData.price -
                        productData.price * (productData.discount / 100)
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">MRP :</span>
                  <span className="text-customPink font-bold">&#8377;</span>
                  <span className="opacity-60 line-through">
                    {productData.price}
                  </span>
                  <span className="text-xs text-red-700 opacity-55 font-bold">
                    ({productData.discount}% off)
                  </span>
                </div>
              </div>
              <p className="text-sm text-green-700 font-semibold opacity-80 mb-2">
                (Inclusive of all taxes)
              </p>
              <Divider orientation="horizontal" flexItem />
              <div className="flex flex-col gap-3 my-3">
                <button
                  onClick={() => {
                    const quantity = 1;
                    dispatch(
                      addToCart(currentUser._id, params.productId, quantity)
                    );
                  }}
                  className="bg-red-500 rounded-lg text-slate-100 font-semibold tracking-wide p-1 py-2"
                >
                  Add to Cart
                </button>
                <button className="bg-slate-300 opacity-85 text-black font-semibold tracking-wide rounded-lg p-1 py-2">
                  Wishlist
                </button>
              </div>
              <Divider orientation="horizontal" flexItem />
              <div className="flex flex-col gap-1 my-2">
                <p className="font-semibold opacity-65">
                  Get it by{"  "}
                  {expectedDeliveryDate}
                </p>
                <p className="font-semibold flex gap-2">
                  <span className="opacity-85">Sold by : </span>
                  <span className="text-customBlue2 font-bold">
                    {productData.soldBy}
                  </span>
                </p>
              </div>
              <Divider orientation="horizontal" flexItem />
              <div className="mt-6 flex flex-col gap-1">
                <h1 className="text-lg font-bold text-red-500 tracking-wider text-center">
                  Delivery Options
                </h1>
                <Divider orientation="horizontal" flexItem />
                <div className="mt-2 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <TbTruckDelivery size={24} className="opacity-75" />
                    <p className="font-semibold opacity-75">
                      Get it by {expectedDeliveryDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <GiMoneyStack size={24} className="opacity-75" />
                    <p className="font-semibold opacity-75 tracking-wide">
                      Pay on Delivery available
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaExchangeAlt size={24} className="opacity-75" />
                    <p className="font-semibold opacity-75 tracking-wide">
                      Easy 14 days return & exchange available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mt-16">
            <h1 className="text-3xl text-customBlue opacity-90 ml-4 mb-1 font-bold">Customer Reviews</h1>
            <Divider orientation="horizontal" flexItem />
            <div>

            </div>
          </div> */}
        </div>
      ) : (
        // Show a loading indicator or message if data is loading
        <p>Loading images...</p>
      )}
    </div>
  );
}
