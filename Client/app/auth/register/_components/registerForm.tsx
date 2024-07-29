"use client";
import { useState } from "react";
import { register } from "@/services/authApi";
import { useRouter } from "next/navigation";
const RegisterForm = () => {
  const router = useRouter();
  const [err, Seterr] = useState(false);
  const [UserData, SetUserData] = useState({
    name: "",
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
    const res = await register(UserData);
    if (res.valid) {
      router.push("/auth/login");
    } else {
      Seterr(true);
    }
    SetUserData({
      name: "",
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
              id="name"
              type="text"
              required
              name="name"
              value={UserData.name}
              onChange={HandleChange}
              placeholder="Full Name"
              className="mt-1 p-2 w-full  bg-[#EBEBEB] text-[#999999] border border-[#999999] rounded-[8px] outline-none"
            />
          </div>
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
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center">
          Already have an account ? <span className="cursor-pointer text-blue-500" onClick={()=>{router.push('/auth/login')}}>login</span> 
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
