import ProfilePhoto from "@/image/profilePhoto.jpg";
import { useAppSelector } from "@/store/hook";
import Image from "next/image";
import { IoMdNotifications } from "react-icons/io";
import { VscListSelection } from "react-icons/vsc";
import Sidebar from "../sideBar/Sidebar";
import { useState } from "react";

const Header = () => {
  const { userData } = useAppSelector((state) => state.auth);
  const [mobileSideBar, setMobileSideBar] = useState(false);
  return (
    <>
      {mobileSideBar && (
        <div className="fixed top-0 left-0 w-full bg-black/50  h-full z-[3]">
          <Sidebar
            mobileSideBar={mobileSideBar}
            setMobileSideBar={setMobileSideBar}
          />
        </div>
      )}
      <header className="bg-white border-b border-borderLine h-16 flex items-center px-4 sm:px-6">
        <p className="text-font16 font-bold text-darkOlive">
          {userData?.first_name || "Welcome Admin"}
        </p>
        <div className="flex justify-end items-center w-full gap-4 lg:hidden">
          <button
            onClick={() => setMobileSideBar(true)}
            className="p-2 rounded-lg hover:bg-[#F1F3E8] transition-colors"
          >
            <VscListSelection className="w-6 h-6 text-avocado" />
          </button>
          {/* Hamburger Button */}
          {/*

          <div
            className="hidden lg:flex items-center bg-[#FFF9E6] border border-[#FBBC04] rounded-[10px] px-4 py-1.5 max-w-2xl flex-1 mx-4
       shadow-[0_1px_3px_0_#00000026,0_5px_5px_0_#00000021,0_10px_6px_0_#00000014,0_18px_7px_0_#00000005,0_29px_8px_0_#00000000]"
          >
            <IoMdMegaphone className="w-5 h-5 text-[#FBBC04] shrink-0 mr-2" />
            <span className="text-xs font-normal text-darkOlive truncate">
              Please reply with the specific service (e.g., Passport, Birth
              Certificate, Voter ID) For Direct Steps!
            </span>
          </div> */}

          {/* <div className="flex items-center justify-end gap-3">
            {/* <div className="flex items-center gap-3 ml-auto"> *
            <button className="flex justify-center items-center w-10 h-10 rounded-[10px] bg-[#F6F7ED] text-avocado hover:bg-[#E6EAD4] transition-colors">
              <IoMdNotifications size={22} />
            </button>

            <div className="flex justify-center items-center w-10 h-10 rounded-[10px] bg-[#F6F7ED] overflow-hidden">
              <Image
                src={ProfilePhoto}
                alt="Profile Photo"
                width={34}
                height={34}
                className="object-cover"
              />
            </div>
          </div> */}
        </div>
      </header>
    </>
  );
};

export default Header;
