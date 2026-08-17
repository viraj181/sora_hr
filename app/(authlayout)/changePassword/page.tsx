"use client";
import React from "react";
import RightSideAuth from "../_loginComponents/RightSideAuth";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import FormPasswordInput from "../_loginComponents/loginInputFields/FormPasswordInput";
import * as yup from "yup";
import { changePasswordApi } from "@/apis/loginApis";
import cookies from "js-cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginButton } from "@/components/Buttons/LoginButton";
import BackToLogin from "../_loginComponents/BackToLogin";

const changePasswordSchema = yup.object().shape({
  old_password: yup.string().required("please enter old password"),
  new_password: yup
    .string()
    .required("please enter new password")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#&*~]).{8,}$/,
      "Password must be 8+ chars with upper, lower, number & symbol",
    ),
  confirm_password: yup
    .string()
    .required("please enter confirm password")
    .oneOf([yup.ref("new_password")], "Passwords must match"),
});

type Inputs = yup.InferType<typeof changePasswordSchema>;

const ChangePasswordPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    mode: "all",
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const [old_password, new_password, confirm_password] = useWatch({
    control,
    name: ["old_password", "new_password", "confirm_password"],
  });

  const handleLogin: SubmitHandler<Inputs> = async (data) => {
    const res = await changePasswordApi({
      ...data,
      username: cookies.get("userName") as string,
    });
    if (res?.st) {
      cookies.remove("isChangePassword");
      cookies.remove("userName");
      reset();
      router.push("/login");
    }
  };

  return (
    <>
      {" "}
      <RightSideAuth
        header="Create new password"
        title="Please enter your new password"
      >
        <form onSubmit={handleSubmit(handleLogin)} className="max-w-125 w-full">
          <FormPasswordInput
            inputLabel="Old Password"
            inputName="old_password"
            register={register}
            errors={errors}
            mandatory={true}
            value={old_password}
          />

          <FormPasswordInput
            inputLabel="New Password"
            inputName="new_password"
            register={register}
            errors={errors}
            mandatory={true}
            value={new_password}
          />

          <FormPasswordInput
            inputLabel="Confirm Password"
            inputName="confirm_password"
            register={register}
            errors={errors}
            mandatory={true}
            value={confirm_password}
          />

          <div className="mt-2 w-full text-center grid gap-2 justify-center">
            <LoginButton isSubmitting={isSubmitting} />
            <BackToLogin isSubmitting={isSubmitting} />
          </div>
        </form>
      </RightSideAuth>
    </>
  );
};

export default ChangePasswordPage;
