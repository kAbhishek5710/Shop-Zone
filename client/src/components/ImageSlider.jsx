import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css/bundle";

export default function ImageSlider({ images }) {
  SwiperCore.use([Autoplay]);
  return (
    <Swiper
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      // className="mt-3"
      className="w-full h-full"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="flex items-center justify-center" >
          <div
            style={{
              background: `url(${image}) center no-repeat`,
              backgroundSize: "cover",
            }}
            // className="h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
            className="w-full h-full rounded-lg object-cover"
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
