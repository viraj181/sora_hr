"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RightSideAuth from "../_loginComponents/RightSideAuth";
import FormInputText from "../_loginComponents/loginInputFields/FormInputText";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import FormPasswordInput from "../_loginComponents/loginInputFields/FormPasswordInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginApi } from "@/apis/loginApis";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import { useAppDispatch } from "@/store/hook";
import {
  setBaseImageUrl,
  setEmail,
  setLoginData,
  setToken,
} from "@/store/slices/authSlice";
import { LoginButton } from "@/components/Buttons/LoginButton";
import TransparentScreen from "@/components/loaders/TransparentScreen";

const loginSchema = yup.object().shape({
  login: yup.string().required("please enter username or email"),
  password: yup.string().required("please enter password"),
});

type Inputs = yup.InferType<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

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
      login: "",
      password: "",
    },
  });

  const [login, password] = useWatch({
    control,
    name: ["login", "password"],
  });

  const handleLogin: SubmitHandler<Inputs> = async (data) => {
    const res = await loginApi(data);
    console.log("res::: ", res);

    if (res?.success) {
      Object.keys(cookies.get()).forEach((cookieName) => {
        cookies.remove(cookieName);
      });
      reset();
      dispatch(setLoginData(res?.data));
      dispatch(setEmail(data?.login));
      dispatch(setToken(res?.data?.accessToken));
      // cookies.set("token", res?.data?.accessToken);
      // cookies.set("isOtp", "true");
      // router.push("/otpPage");
      dispatch(setBaseImageUrl(res?.meta?.imageBaseUrl));
      if (res?.data?.otp_required) {
        // cookies.set("token", res?.data?.accessToken);
        cookies.set("isOtp", "true");
        router.push("/otpPage");
      } else {
        cookies.set("userName", data?.login);
        cookies.set("isChangePassword", "true");
        router.push("/changePassword");
      }
    }
  };
  return (
    <>
      {isSubmitting && <TransparentScreen />}
      <RightSideAuth
        header={
          <>
            <span className="text-avocado">Welcome </span>
            Back!
          </>
        }
        title="It's nice to see you again!"
      >
        <form onSubmit={handleSubmit(handleLogin)} className="max-w-125 w-full">
          <FormInputText
            inputLabel="Email or Phone Number"
            inputName="login"
            register={register}
            errors={errors}
            mandatory={true}
            value={login}
          />

          <FormPasswordInput
            inputLabel="Password"
            inputName="password"
            register={register}
            errors={errors}
            mandatory={true}
            value={password}
          />
          <div className="flex items-center justify-between gap-2">
            <LoginButton isSubmitting={isSubmitting} btnName="login" />

            <div
              onClick={() => {
                cookies.set("isForgotPassword", "true");
                router.push("/forgetPassword");
              }}
              className="text-avocado text-font14 text-center font-bold cursor-pointer hover:underline whitespace-nowrap"
            >
              Forget Password
            </div>
          </div>
        </form>
      </RightSideAuth>
    </>
  );
};

export default LoginPage;

// <button
//   type="submit"
//   className="button w-full"
//   disabled={isSubmitting}
// >
//   submit
//   {/* {isSubmitting ? <ButtonLoader /> : <>{btnName || "Submit"}</>} */}
// </button>
