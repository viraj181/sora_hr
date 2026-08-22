"use client";
import Image from "next/image";
import React, { useState } from "react";
import { menuItems } from "./SidebarMenu";
import Link from "next/link";
import ProjectLogo from "@/image/projectLogo.png";
import { usePathname, useRouter } from "next/navigation";
import cookies from "js-cookie";
import { RxCross2 } from "react-icons/rx";

const Sidebar = ({
  mobileSideBar,
  setMobileSideBar,
}: {
  mobileSideBar?: boolean;
  setMobileSideBar?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [activeItem, setActiveItem] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <aside className="flex flex-col w-50 bg-white relative h-full">
        {mobileSideBar && (
          <div
            className="absolute -right-7.5 top-[0%] cursor-pointer lg:hidden"
            onClick={() => {
              setMobileSideBar?.(false);
            }}
          >
            <RxCross2 size={30} className="bg-cyan p-1 text-white" />
          </div>
        )}
        <div className="h-16 flex items-center justify-center py-2 px-6">
          <Image src={ProjectLogo} alt="Logo" width={180} height={180} />
        </div>
        <nav className="flex-1 pl-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <div className="flex items-center justify-center gap-4">
                  <Link
                    href={item.url ? item.url : ""}
                    key={item.name}
                    onClick={() => setActiveItem(item.name)}
                    className={`w-full flex items-center gap-3 p-2.5 text-sm text-darkOlive font-normal rounded-[10px] transition-colors duration-150 capitalize  ${
                      pathname === item.url ||
                      pathname.split("/")[1] === item.name
                        ? "bg-lightGreen font-bold!"
                        : "hover:bg-lightGreen"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                  <div
                    className={`${
                      pathname === item.url ||
                      pathname.split("/")[1] === item.name
                        ? "w-1 h-10 bg-avocado"
                        : ""
                    }`}
                  />
                </div>

                {(activeItem === item.name ||
                  pathname.split("/")[1] === item.name) &&
                  item?.subMenu &&
                  item?.subMenu?.map((subItem) => {
                    return (
                      <React.Fragment key={subItem.id}>
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className={`${pathname === subItem.url || pathname.split("/")[2] === subItem.name ? "w-1 h-5 bg-avocado" : ""} ml-8`}
                          />
                          <Link
                            href={subItem.url ? subItem.url : ""}
                            key={subItem.name}
                            // onClick={() => setActiveItem(subItem.name)}
                            className={`w-full flex items-center gap-3 p-1 px-0!  text-sm text-darkOlive font-normal rounded-[10px] transition-colors duration-150 capitalize ${
                              pathname === subItem.url ||
                              pathname.split("/")[2] === subItem.name
                                ? "font-bold!"
                                : "hover:font-bold"
                            }`}
                          >
                            {subItem.icon}
                            <span>{subItem.label}</span>
                          </Link>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </React.Fragment>
            );
          })}
        </nav>
        <div className="flex items-center justify-center gap-2 p-2">
          <button
            className="button py-2! w-full!"
            onClick={() => {
              Object.keys(cookies.get()).forEach((cookieName) => {
                if (cookieName !== "rememberMe" && cookieName !== "username") {
                  cookies.remove(cookieName);
                }
              });
              localStorage.clear();
              // dispatch(logout());
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
