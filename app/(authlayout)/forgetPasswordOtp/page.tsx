"use client";
import React, { useEffect, useState } from "react";
import RightSideAuth from "../_loginComponents/RightSideAuth";
import ReactJsOtpInputModal from "@/components/inputs/ReactJsOtpInputModal";
import InputLoginError from "../_loginComponents/loginInputFields/InputLoginError";
import { LoginButton } from "@/components/Buttons/LoginButton";
import BackToLogin from "../_loginComponents/BackToLogin";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppSelector } from "@/store/hook";
import { resendOtpApi, verifyForgetPasswordOtpApi } from "@/apis/loginApis";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";

const otpSchema = yup.object({
  code: yup
    .string()
    .required("Please enter code")
    .min(6, "Min 6 digits required")
    .max(6, "Max 6 digits required"),
});

type Inputs = yup.InferType<typeof otpSchema>;

const ForgetPasswordOtpPage = () => {
  const router = useRouter();
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(60);

  const { forgetPassData, email } = useAppSelector((state) => state.auth);

  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(otpSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });
  const code = watch("code");

  const handleForgetPasswordOtp: SubmitHandler<Inputs> = async (data) => {
    const payload = {
      email: email,
      otp: data?.code,
      reference_id: forgetPassData?.referenceId || "",
      journey_id: forgetPassData?.journeyId || "",
    };
    // try {
    const res = await verifyForgetPasswordOtpApi(payload);
    if (res?.st) {
      toast.success(res?.data?.message ?? "Otp verified successfully!");
      reset();
      cookies.remove("isForgotPasswordOtp");
      cookies.set("isForgotChangePassword", "true");
      cookies.set("token", res?.data?.accessToken);
      router.push("/forgotChangePassword");
    }
    //  else {
    //   toast.error(res?.msg ?? "Something went wrong!");
    // }
    // } catch (error: unknown) {
    //   const err = error as AxiosError<{ message?: string; detail?: string }>;
    //   toast.error(err?.response?.data?.message ?? "Something went wrong!");
    // }
  };

  const handleResendOtp = async () => {
    const res = await resendOtpApi({
      referenceId: forgetPassData?.referenceId || "",
      journeyId: forgetPassData?.journeyId || "",
    });
    if (res?.st) {
      setCountdown(60);
      setResendDisabled(true);
      toast.success(res?.data?.message ?? "Resend otp successfully!");
      reset();
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false); // Enable the resend button after 60 seconds
    }
    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [resendDisabled, countdown]);

  return (
    <>
      <RightSideAuth
        header="Verify your OTP"
        title="Enter the OTP sent to your registered mobile number or email address to continue."
      >
        <form
          onSubmit={handleSubmit(handleForgetPasswordOtp)}
          className="mb-5 max-w-100 w-full  gap-2 flex flex-col items-center"
        >
          <div className="max-w-full  mb-2 px-0.5">
            <ReactJsOtpInputModal
              otp={code}
              handleChange={(code) => {
                setValue("code", code);
              }}
              maxlength={6}
              type="password"
              autoFocus={true}
            />

            <InputLoginError errors={errors} inputName="code" />
          </div>

          <div>
            <p className="text-darkOlive text-font14 text-center font-light">
              If you don&apos;t receive the code!{" "}
              <button
                type="button"
                disabled={resendDisabled}
                className={`text-avocado font-semibold text-font14 ${
                  resendDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : " cursor-pointer"
                }`}
                onClick={() => {
                  setValue("code", "");

                  handleResendOtp();
                }}
              >
                {countdown > 0 ? `in (${countdown} seconds)` : ""} Resend
              </button>
            </p>
          </div>
          <LoginButton isSubmitting={isSubmitting} />

          <BackToLogin isSubmitting={isSubmitting} />
        </form>
      </RightSideAuth>
    </>
  );
};

export default ForgetPasswordOtpPage;
