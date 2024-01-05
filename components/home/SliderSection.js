import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import photographsData from "@/data/index/photographsData";

export default function SliderSection() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 600);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    autoplay: true,
    arrows: isLargeScreen,
    autoplaySpeed: 4000,
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: isLargeScreen,
    centerPadding: "100px",
  };

  const replaceAddresseQuality = (e) => {
    const editedAddresse = e.replace(
      /\/upload\/[^/]+/,
      "/upload/h_2000,c_scale"
    );
    return editedAddresse;
  };

  return (
    <div className="max-w-[1400px] mt-20 w-full mx-auto md:mb-32 flex flex-col gap-10">
      <div className="px-10">
        <h2 className="font-bold text-darkPurple text-4xl md:text-[48px] md:leading-[125%]">
          Join the photographs community
        </h2>
      </div>
      <Slider {...settings}>
        {photographsData.map((x) => (
          <div className="w-full md:w-[250px] h-[700px] relative">
            <div className="absolute z-20 top-0 right-0 left-0 bottom-0 bg-gradient-to-t from-[#00000035] to-[#ffffff05]"></div>
            <Image
              src={replaceAddresseQuality(x.photo)}
              alt="Picture of a photograph"
              width={2000}
              height={1000}
              className="w-full h-full object-cover relative"
            />
            <div className="absolute bottom-16 left-10 flex flex-col gap-3 z-30 text-white">
              <span className="text-4xl font-bold">{x.name}</span>
              <span className="text-xl">{x.description}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
