"use client";
import { forgotChangePasswordApi } from "@/apis/loginApis";
import { LoginButton } from "@/components/Buttons/LoginButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import BackToLogin from "../_loginComponents/BackToLogin";
import FormPasswordInput from "../_loginComponents/loginInputFields/FormPasswordInput";
import RightSideAuth from "../_loginComponents/RightSideAuth";
import cookies from "js-cookie";
import { useAppSelector } from "@/store/hook";
import toast from "react-hot-toast";

const changePasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("please enter new password")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#&*~]).{8,}$/,
      "Password must be 8+ chars with upper, lower, number & symbol",
    ),
  confirmPassword: yup
    .string()
    .required("please enter confirm password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

type Inputs = yup.InferType<typeof changePasswordSchema>;

const ChangePasswordPage = () => {
  const router = useRouter();

  const { forgetPassData, email } = useAppSelector((state) => state.auth);

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
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [newPassword, confirmPassword] = useWatch({
    control,
    name: ["newPassword", "confirmPassword"],
  });

  const handleForgotChangePassword: SubmitHandler<Inputs> = async (data) => {
    const payload = {
      new_password: data?.newPassword,
      confirm_password: data?.confirmPassword,
      email: email || "",
    };
    const res = await forgotChangePasswordApi(payload);

    if (res?.success) {
      reset();
      toast.success(res.msg || res.message || "Password changed successfully!");
      Object.keys(cookies.get()).forEach((cookieName) => {
        cookies.remove(cookieName);
      });
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
        <form
          onSubmit={handleSubmit(handleForgotChangePassword)}
          className="max-w-150 w-full"
        >
          <FormPasswordInput
            inputLabel="New Password"
            inputName="newPassword"
            register={register}
            errors={errors}
            mandatory={true}
            value={newPassword}
          />

          <FormPasswordInput
            inputLabel="Confirm Password"
            inputName="confirmPassword"
            register={register}
            errors={errors}
            mandatory={true}
            value={confirmPassword}
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
