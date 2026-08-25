import logo from "@/image/projectLogo.png";
import Image from "next/image";
import React from "react";

const RightSideAuth = ({
  header,
  title,
  children,
}: {
  children: React.ReactNode;
  header: string | React.ReactNode;
  title: string;
}) => {
  return (
    <>
      <div className="h-full flex flex-col max-w-200 w-full p-5 xl:p-10 pb-0!">
        {/* <div className="text-right flex gap-2 items-center justify-end ">
          <div className="border p-2 flex items-center gap-2 rounded-md text-avocado">
            <BiSolidInfoSquare className="text-xl" />
            <p className="text-sm">More info</p>
          </div>
        </div> */}

        <div className="w-full h-full flex flex-col items-cr justify-center">
          <div className="bg-white  flex flex-col justify- items-center rounded-3xl p-5 2xl:p-10">
            <div className="flex justify-center items-center py-5">
              <Image
                src={logo}
                alt="Login"
                width={3000}
                height={200}
                quality={100}
                className="w-60 xl:w-80"
              />
            </div>
            <div className="text-center mb-3">
              <p className="text-font24 md:text-font34 2xl:text-font50 font-bold uppercase">
                {header}
              </p>
              <p className="2xl:text-font20">{title}</p>
            </div>
            {children}
            {/* <div>
            <div className="hidden md:flex bg-lightGreen p-5">
            <div className="flex flex-col gap-2">
            <div>
            <p className="font-semibold text-font20 2xl:text-font30 text-avocado">
            Download Neomanthan For Mobile
            </p>
            <p className="text-16">
            Lorem ipsum dolor sit amet consectetur.
            </p>
            </div>
            <button className="button">Download</button>
            <div>
            <p className="font-semibold text-font18">
            {" "}
            Stay Connected With Us
            </p>
            <div className="flex items-center gap-2 text-font14 font-medium">
            <IoCall size={20} className="text-avocado" />
            <p>+91 (978) 776-1982</p>
            <AiFillMail size={20} className="text-avocado" />
            <p>abc@gmail.com</p>
            </div>
            </div>
            </div>
            <div className="flex items-end">
            <Image
            src={contactIcon}
            alt="Login"
            width={3000}
            height={200}
            quality={100}
                  className="w-60 2xl:w-60"
                  />
                  </div>
                  </div>
                  <p className="w-full text-center text-font14">
                  © Copyright Neomanthan Systems Private Limited  All Rights
                  Reserved.
                  </p>
                  </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSideAuth;
