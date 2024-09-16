import React, { useEffect, useState } from "react";
import ImageSlider from "../../components/ImageSlider";
import { FaRegHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Rating from "@mui/material/Rating";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const { category } = useParams();
  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const res = await fetch(`/server/product/getProducts/${category}`);
        const data = await res.json();

        console.log(data);

        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        const modifiedProducts = data.map((product) => ({
          ...product,
          images: product.images.map((image) => image.url),
        }));
        setProducts(modifiedProducts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMenProducts();
  }, [category]);

  const toggleFavourite = (productId) => {
    setFavourites((prevFavourites) =>
      prevFavourites.includes(productId)
        ? prevFavourites.filter((id) => id !== productId)
        : [...prevFavourites, productId]
    );
  };

  return (
    <div className="justify-center max-w-lg sm:max-w-lg md:max-w-3xl lg:max-w-7xl mx-auto my-12">
      <ul className="flex flex-wrap gap-12">
        {products.map((product) => (
          <Link to={`/${product._id}`}>
            <li
              key={product._id}
              className={`relative flex flex-col gap-1 p-1 z-10 ${
                product.stock == 0 ? "opacity-60" : "opacity-100"
              }`}
            >
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavourite(product._id);
                }}
                className="absolute top-2 right-2 text-white text-lg z-40"
              >
                {favourites.includes(product._id) ? (
                  <FaHeart color="red" />
                ) : (
                  <FaRegHeart />
                )}
              </div>
              <div className="relative h-56 w-48">
                <div className="absolute z-40 bottom-0 ml-2">
                  <Rating
                    name="read-only"
                    value={product.reviews.length === 0 ? 0 : product.rating}
                    readOnly
                    size="small"
                    className="text-red-600"
                  />
                </div>
                <ImageSlider images={product.images} />
              </div>
              <div className="ml-2 flex flex-col">
                <h1 className="font-bold text-sm tracking-wide">
                  {product.brand}
                </h1>
                <p className="text-xs tracking-wide font-semibold opacity-50 truncate w-40">
                  {product.productName}
                </p>
                <div className="flex mt-1 gap-1 items-center">
                  <div>
                    <span className="mr-1 text-customPink text-sm font-bold ">
                      &#8377;
                    </span>
                    <span className="tracking-wider text-sm font-semibold text-customBlue">
                      {Math.round(
                        product.price - product.price * (product.discount / 100)
                      )}
                    </span>
                  </div>
                  <span className="opacity-50 ml-1 text-sm line-through">
                    {product.price}
                  </span>
                  <span className="text-xs text-red-700 opacity-55 font-bold">
                    ({product.discount}% off)
                  </span>
                </div>
                {product.stock === 0 && (
                  <p className="text-base font-bold mt-2 text-cent text-customBlue">
                    OUT OF STOCK
                  </p>
                )}
                {product.stock <= 2 && product.stock > 0 && (
                  <p className="text-xs font-bold mt-1 text-cent text-green-500">
                    Hurry!! Only few left...
                  </p>
                )}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
