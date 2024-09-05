import React from "react";
import ImageSlider from "../components/ImageSlider";

import img1 from "../assets/slider_images/1.jpg";
import img2 from "../assets/slider_images/2.jpg";
import img3 from "../assets/slider_images/3.jpg";
import img4 from "../assets/slider_images/4.jpg";
import img5 from "../assets/slider_images/5.jpg";
import img6 from "../assets/slider_images/6.jpg";
import img7 from "../assets/slider_images/7.jpg";
import img8 from "../assets/slider_images/8.jpg";
import img9 from "../assets/slider_images/9.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

export default function Home() {
  return (
    <>
      <div className="w-full h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] object-cover mt-1">
        <ImageSlider images={images} />
      </div>
    </>
  );
}
