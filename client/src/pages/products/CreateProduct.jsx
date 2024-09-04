import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";

export default function CreateProduct() {
  const { currentUser } = useSelector((state) => state.user);
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: 0,
    discount: 0,
    category: "",
    subcategory: "",
    brand: "",
    images: [],
    stock: 0,
  });
  const navigate = useNavigate();

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setuploading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = {
    Men: ["Shirts", "Pants", "Shoes", "Accessories"],
    Women: ["Dresses", "Shoes", "Accessories"],
    Kids: ["Toys", "Clothes", "Books"],
    Tech: ["Laptops", "Phones", "Accessories"],
    Grooming: ["Skincare", "Haircare", "Fragrances"],
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubCategories(categories[selectedCategory] || []);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (err) => {
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.images.length <= 6) {
      setuploading(true);
      const promises = [];
      setImageUploadError(false);

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          const imageObjects = urls.map((url) => ({
            url,
            alt: "Product Image",
          }));
          setFormData({
            ...formData,
            images: formData.images.concat(imageObjects),
          });
          setImageUploadError(false);
          setuploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image Upload Failed (2 mb max per Image");
          setuploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 Images per product");
      setuploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.images.length < 2) {
        return setError("You have to at least upload 2 images!!!");
      }
      setLoading(true);
      setError(false);
      const res = await fetch("/server/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          vendorRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate("/vendorDashboard");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 flex flex-col justify-center gap-8 max-w-4xl mx-auto">
      <h1 className="text-3xl underline underline-offset-8 my-8 font-semibold font-dancing-script tracking-widest text-customBlue text-center">
        Product Details
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            id="productName"
            type="text"
            placeholder="Product Name"
            className="border p-3 rounded-lg outline-none"
            onChange={handleChange}
            maxLength="62"
            minLength={5}
            required
          />
          <textarea
            id="description"
            type="text"
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 rounded-lg outline-none"
            required
          />
          <div className="flex justify-between gap-2">
            <input
              id="price"
              type="number"
              onChange={handleChange}
              className="border p-3 rounded-lg outline-none"
              placeholder="Price"
              min={1}
              required
            />
            <input
              id="discount"
              type="number"
              onChange={handleChange}
              className="border p-3 flex-grow rounded-lg outline-none"
              placeholder="Discount in %"
              min="1"
              max="100"
            />
          </div>
          <div className="flex gap-2">
            <select
              id="category"
              type="text"
              onChange={(e) => {
                handleChange(e);
                handleCategoryChange(e);
              }}
              className="flex-grow p-3 rounded-lg appearance-none outline-none opacity-85"
              placeholder="Price"
              min={1}
              required
            >
              <option value="">Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Tech">Tech</option>
              <option value="Grooming">Grooming</option>
            </select>
            <select
              id="subCategory"
              type="text"
              onChange={handleChange}
              className="flex-grow p-3 rounded-lg disabled:opacity-75 appearance-none outline-none opacity-85"
              placeholder="Price"
              min={1}
              disabled={!category}
            >
              <option value="">Select Sub-Category</option>
              {subCategories.map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
            </select>
          </div>
          <input
            id="brand"
            type="text"
            onChange={handleChange}
            placeholder="Brand Name"
            className="border p-3 rounded-lg outline-none"
            required
          />
          <input
            type="number"
            id="stock"
            onChange={handleChange}
            className="border p-3 rounded-lg outline-none"
            min={1}
            placeholder="Quantity"
            required
          />
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              disabled={uploading}
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700">{imageUploadError && imageUploadError}</p>
          <div className="flex flex-wrap">
            {formData.images.length > 0 &&
              formData.images.map((img, index) => (
                <div
                  key={img.url}
                  className="relative py-3 px-2 border rounded-lg"
                >
                  <img
                    src={img.url}
                    alt="listing image"
                    className="w-24 h-24 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-xl absolute top-0 right-0 text-red-700 rounded-full hover:opacity-75"
                  >
                    <TiDelete />
                  </button>
                </div>
              ))}
          </div>
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disables:opacity-80"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
