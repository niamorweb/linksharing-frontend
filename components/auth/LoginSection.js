import { addUserToStore } from "@/reducers/user";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function LoginSection({ setSectionDisplayed }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitLogin = (data) => {
    console.log(data);
    axios
      .post("https://linksharing-backend.vercel.app/users/signin", {
        username: data.username,
        password: data.password,
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data);
        if (response.data.result === true) {
          dispatch(
            addUserToStore({
              username: response.data.data.username,
              id: response.data.data._id,
            })
          );
          router.push("/");
        } else {
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="bg-white lg:shadow-lg mt-4 p-10 rounded-xl flex flex-col">
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
          <input
            {...register("username", {
              required: "Username is required",
            })}
            className="input_connexion"
            type="text"
            placeholder="e.g.alex"
          />
          {errors.username && (
            <p className="text-red-600">{errors.username.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-base text-gray-500">Password</span>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            className="input_connexion"
            type="password"
            placeholder="Enter a password"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button className="bg-bluePurple text-md font-medium text-white py-3 px-4 rounded-xl duration-150 hover:bg-[#beadff] hover:shadow-[0_0_32px_0_rgba(99,60,255,.25)]">
          Login
        </button>

        <span className="text-center text-gray-500 text-base mt-5">
          Don't have an account ?{" "}
          <Link
            href="signup"
            className="text-bluePurple cursor-pointer underline-offset-2 hover:underline "
          >
            Create an account
          </Link>{" "}
        </span>
      </form>
    </div>
  );
}
