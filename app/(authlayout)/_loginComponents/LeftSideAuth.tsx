"use client";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import loginImage from "@/image/loginImage.png";

const LeftSideAuth = () => {
  const ImageArray = [
    { image: loginImage },
    { image: loginImage },
    { image: loginImage },
    { image: loginImage },
  ];
  return (
    <>
      {" "}
      <div className="hidden h-full lg:flex justify-center items-center col-span-3 p-10">
        <div className="rounded-3xl overflow-hidden h-[90vh] w-full bg-white">
          <Carousel
            autoPlay
            infiniteLoop
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            className="h-full"
          >
            {ImageArray.map((item, index) => (
              <div key={index} className="relative h-[90vh]">
                <Image src={item.image} alt="Login" fill className="h-full" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default LeftSideAuth;
