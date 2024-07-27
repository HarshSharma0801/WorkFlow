"use client";
import { useState } from "react";
import { login } from "@/services/authApi";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { defaultRedirect } from "@/routes";

const LoginForm = () => {
  const router = useRouter();
  const [err, Seterr] = useState(false);
  const [UserData, SetUserData] = useState({
    email: "",
    password: "",
  });

  const HandleChange = (e: any) => {
    const { name, value } = e.target;
    SetUserData({
      ...UserData,
      [name]: value,
    });
  };

  const UserSubmit = async (e: any) => {
    e.preventDefault();
    const res = await login(UserData.email, UserData.password);
    if (res.valid) {
        const email = UserData.email;
        const password = UserData.password;
        await signIn("credentials" , {
            email,
            password ,
            redirectTo:defaultRedirect
        })
    } else {
      Seterr(true);
    }
    SetUserData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="max-w-md w-full p-6 space-y-8 bg-white  rounded-[16px]">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-black">
            Welcome to <span className="text-main">Workflo</span>!
          </h2>
          {err && (
            <h1 className="text-[16px] md:text-xl pt-3 font-extrabold text-center text-red-500">
              Something went wrong !!
            </h1>
          )}
        </div>
        <form className="space-y-6" onSubmit={UserSubmit}>
          <div>
            <input
              id="email"
              type="email"
              required
              value={UserData.email}
              onChange={HandleChange}
              name="email"
              placeholder="Your email"
              className="mt-1 p-2 w-full  bg-[#EBEBEB] text-[#999999] border border-[#999999] rounded-[8px] outline-none"
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={UserData.password}
              onChange={HandleChange}
              name="password"
              placeholder="Password"
              className="mt-1 p-2 w-full  bg-[#EBEBEB] text-[#999999] border border-[#999999] rounded-[8px] outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex bg-custom-btn-gradient justify-center  p-[8px] transition duration-150 ease-in-out  rounded-md shadow-sm text-[20px] font-normal text-white focus:shadow-lg focus:outline-none "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
