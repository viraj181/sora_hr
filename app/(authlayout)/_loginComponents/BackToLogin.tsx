"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import cookies from "js-cookie";
import { useAppDispatch } from "@/store/hook";

const BackToLogin = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <>
      <p className="text-fon20 text-darkOlive capitalize font-bold">
        back to{" "}
        <span
          className="text-avocado cursor-pointer"
          onClick={() => {
            if (!isSubmitting) {
              Object.keys(cookies.get()).forEach((cookieName) => {
                if (cookieName !== "rememberMe" && cookieName !== "username") {
                  cookies.remove(cookieName);
                }
              });
              localStorage.clear();
              // dispatch(logout());
              router.push("/login");
            }
          }}
        >
          login ?
        </span>
      </p>
    </>
  );
};

export default BackToLogin;

{
  /* <button
  type="button"
  className="button"
  disabled={isSubmitting}
  onClick={() => {
    sessionStorage.setItem("isMpin", "true");
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
  back to login
</button> */
}
