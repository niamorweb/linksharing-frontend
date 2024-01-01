import { addUserToStore } from "@/reducers/user";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [sectionDisplayed, setSectionDisplayed] = useState("login");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitLogin = (data) => {
    fetch(`https://linksharing-backend.vercel.app/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(
          addUserToStore({
            username: data.data.username,
            isAdmin: data.data.isAdmin,
            id: data.data._id,
          })
        );
        router.push("/home");
      });
  };

  const onSubmitSignUp = (data) => {
    fetch(`https://linksharing-backend.vercel.app/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(
          addUserToStore({
            username: data.data.username,
            isAdmin: data.data.isAdmin,
            id: data.data._id,
          })
        );
        router.push("/");
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 justify-center p-10 bg-slate-100">
      <div>
        <img src="icons/logo-devlinks-large.svg" alt="" />{" "}
      </div>

      {sectionDisplayed === "login" ? (
        <div className="bg-white mt-4 p-10 rounded-xl flex flex-col">
          <span className="font-bold text-xl  mb-5">Login</span>
          <span className="text-gray-500 text-base">
            Add your details below to get back into the app
          </span>
          <form
            onSubmit={handleSubmit(onSubmitLogin)}
            className="flex flex-col gap-4 mt-5"
          >
            <div className="flex flex-col gap-2">
              <span className="text-base text-gray-500">Username</span>
              <div className="relative w-full">
                <img
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  src="icons/icon-email.svg"
                  alt=""
                />
                <input
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className="w-full duration-150 focus:shadow-[0_0_32px_0_rgba(99,60,255,.25)] pl-10 pr-4 py-2 outline outline-[2px] outline-gray-200 rounded-sm focus:outline-2 focus:outline-[#633cff]"
                  type="text"
                  placeholder="e.g.alex"
                />
              </div>
              {errors.username && (
                <p className="text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-base text-gray-500">Password</span>
              <div className="w-full relative">
                <img
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  src="icons/icon-password.svg"
                  alt=""
                />
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full duration-150 focus:shadow-[0_0_32px_0_rgba(99,60,255,.25)] pl-10 pr-4 py-2 outline outline-[2px] outline-gray-200 rounded-sm focus:outline-2 focus:outline-[#633cff]"
                  type="password"
                  placeholder="Enter a password"
                />
              </div>
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>

            <button className="bg-[#633cff] text-md font-medium text-white py-3 px-4 rounded-xl duration-150 hover:bg-[#beadff] hover:shadow-[0_0_32px_0_rgba(99,60,255,.25)]">
              Login
            </button>

            <span className="text-center text-gray-500 text-base mt-5">
              Don't have an account ?{" "}
              <span
                onClick={() => setSectionDisplayed("signup")}
                className="text-[#633cff] cursor-pointer underline-offset-2 hover:underline "
              >
                Create an account
              </span>{" "}
            </span>
          </form>
        </div>
      ) : (
        <div className="bg-white mt-4 p-10 rounded-xl flex flex-col">
          <span className="font-bold text-xl mb-5">Create an account</span>
          <span className="text-gray-500 text-base">
            Add your details below to create an account{" "}
          </span>{" "}
          <form onSubmit={handleSubmit(onSubmitSignUp)}>
            <div className="flex flex-col gap-2 mt-5 mb-2">
              <span className="text-base text-gray-500 ">Username</span>
              <div className="relative">
                <img
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  src="icons/icon-email.svg"
                  alt=""
                />
                <input
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 4,
                      message: "Username should be at least 4 characters",
                    },
                  })}
                  className="w-full duration-150 focus:shadow-[0_0_32px_0_rgba(99,60,255,.25)] pl-10 pr-4 py-2 outline outline-[2px] outline-gray-200 rounded-sm focus:outline-2 focus:outline-[#633cff]"
                  type="text"
                  placeholder="e.g.alex"
                />
              </div>
              {errors.username && (
                <p className="text-red-600">{errors.username.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-5 mb-2">
              <span className="text-base text-gray-500 ">
                Create a password
              </span>
              <div className="relative">
                <img
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  src="icons/icon-password.svg"
                  alt=""
                />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full duration-150 focus:shadow-[0_0_32px_0_rgba(99,60,255,.25)] pl-10 pr-4 py-2 outline outline-[2px] outline-gray-200 rounded-sm focus:outline-2 focus:outline-[#633cff]"
                  type="password"
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
            <button className="bg-[#633cff] mt-4 w-full text-md font-medium text-white py-3 px-4 rounded-xl duration-150 hover:bg-[#beadff] hover:shadow-[0_0_32px_0_rgba(99,60,255,.25)]">
              Create new account
            </button>
          </form>
          <span className="text-center text-gray-500 text-base mt-5">
            Already have an account?
            <span
              onClick={() => setSectionDisplayed("login")}
              className="text-[#633cff] cursor-pointer underline-offset-2 hover:underline"
            >
              {" "}
              Login
            </span>
          </span>
        </div>
      )}
    </main>
  );
}
