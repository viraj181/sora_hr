import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RedirectService = (url: string, request: NextRequest) => {
  return NextResponse.redirect(new URL(url, request.url));
};

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isForgotPassword = request.cookies.get("isForgotPassword");
  const isForgotPasswordOtp = request.cookies.get("isForgotPasswordOtp");
  const isForgotChangePassword = request.cookies.get("isForgotChangePassword");
  const isOtp = request.cookies.get("isOtp");
  const isChangePassword = request.cookies.get("isChangePassword");

  const currentPath = request.nextUrl.pathname;

  if (!token) {
    if (isForgotPassword?.value === "true") {
      if (currentPath !== "/forgetPassword") {
        return RedirectService("/forgetPassword", request);
      }
    } else if (isOtp?.value === "true") {
      if (currentPath !== "/otpPage") {
        return RedirectService("/otpPage", request);
      }
    } else if (isForgotPasswordOtp?.value === "true") {
      if (currentPath !== "/forgetPasswordOtp") {
        return RedirectService("/forgetPasswordOtp", request);
      }
    } else if (isChangePassword?.value === "true") {
      if (currentPath !== "/changePassword") {
        return RedirectService("/changePassword", request);
      }
    } else if (isForgotChangePassword?.value === "true") {
      if (currentPath !== "/forgotChangePassword") {
        return RedirectService("/forgotChangePassword", request);
      }
    } else {
      if (currentPath !== "/login") {
        return RedirectService("/login", request);
      }
    }
  } else {
    if (isOtp?.value === "true") {
      if (currentPath !== "/otpPage") {
        return RedirectService("/otpPage", request);
      }
    } else if (isForgotPasswordOtp?.value === "true") {
      if (currentPath !== "/forgetPasswordOtp") {
        return RedirectService("/forgetPasswordOtp", request);
      }
    } else {
      if (
        [
          "/changePassword",
          "/forgetPassword",
          "/forgetPasswordOtp",
          "/forgotChangePassword",
          "/otpPage",
          "/login",
        ].includes(currentPath)
      ) {
        return RedirectService("/", request);
      }
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
