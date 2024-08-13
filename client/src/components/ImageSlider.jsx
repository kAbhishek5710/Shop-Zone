import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css/bundle";
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

export default function ImageSlider() {
  SwiperCore.use([Autoplay]);
  return (
    <Swiper
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="mt-3"
    >
      {images.map((image, index) => (
        <SwiperSlide>
          <div
            style={{
              background: `url(${image}) center no-repeat`,
              backgroundSize: "cover",
            }}
            className="h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
