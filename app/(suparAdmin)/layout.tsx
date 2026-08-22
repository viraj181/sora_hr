"use client";
import { useAppDispatch } from "@/store/hook";
import { adminDetail } from "@/store/slices/authSlice";
import { useEffect } from "react";
import Header from "./_SAComponents/header/Header";
import Sidebar from "./_SAComponents/sideBar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(adminDetail());
  // }, [dispatch]);

  return (
    <>
      <div className="h-dvh flex flex-col overflow-hidden ">
        <div className="flex-1 overflow-hidden flex divide-x divide-borderLine">
          {/* sidebar */}
          <div className="bg-white hidden lg:block">
            <Sidebar />
          </div>

          {/* header and main section */}
          <div className="flex flex-1 min-w-0 flex-col overflow-hidden">
            {/* Header */}
            <Header />

            {/* Main area */}
            <main className="flex flex-col flex-1 min-w-0 overflow-hidden bg-lightGreen p-4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
