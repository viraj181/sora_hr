"use client";
import React from "react";
import RightSideAuth from "../_loginComponents/RightSideAuth";
import FormInputText from "../_loginComponents/loginInputFields/FormInputText";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginButton } from "@/components/Buttons/LoginButton";
import BackToLogin from "../_loginComponents/BackToLogin";
import { forgetPasswordApi } from "@/apis/loginApis";
import { setEmail, setForgetPassData } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/hook";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";

type Inputs = yup.InferType<typeof loginSchema>;

const loginSchema = yup.object().shape({
  email: yup.string().required("please enter your email").email(),
});

const ForgetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    mode: "all",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const [email] = useWatch({
    control,
    name: ["email"],
  });

  const handleForgetPassword: SubmitHandler<Inputs> = async (data) => {
    const res = await forgetPasswordApi(data);
    if (res?.success) {
      reset();
      dispatch(setForgetPassData(res?.data));
      dispatch(setEmail(data?.email));

      cookies.remove("isForgotPassword");
      cookies.set("isForgotPasswordOtp", "true");
      // cookies.set("token", res?.data?.accessToken);
      router.push("/forgetPasswordOtp");
    }
  };

  return (
    <>
      <RightSideAuth
        header="Forget Password"
        title="Enter your registered email address to receive a reset code."
      >
        <form
          onSubmit={handleSubmit(handleForgetPassword)}
          className="mb-5 max-w-100 w-full  gap-2 flex flex-col items-center"
        >
          <FormInputText
            inputLabel="Email"
            inputName="email"
            register={register}
            errors={errors}
            mandatory={true}
            value={email}
          />

          <LoginButton isSubmitting={isSubmitting} />

          <BackToLogin isSubmitting={isSubmitting} />
        </form>
      </RightSideAuth>
    </>
  );
};

export default ForgetPasswordPage;
