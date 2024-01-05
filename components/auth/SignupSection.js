import { addUserToStore } from "@/reducers/user";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function SignupSection() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitSignUp = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3000/users/signup", {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.result === true) {
          console.log(response.data.data);
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
      <span className="font-bold text-xl mb-5">Create an account</span>
      <span className="text-gray-500 text-base">
        Add your details below to create an account{" "}
      </span>{" "}
      <form onSubmit={handleSubmit(onSubmitSignUp)}>
        <div className="flex flex-col gap-2 mt-5 mb-2">
          <span className="text-base text-gray-500 ">Username</span>
          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 4,
                message: "Username should be at least 4 characters",
              },
            })}
            className="input_connexion"
            type="text"
            placeholder="e.g.alex"
          />
          {errors.username && (
            <p className="text-red-600">{errors.username.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-5 mb-2">
          <span className="text-base text-gray-500 ">Email</span>
          <input
            {...register("email", {
              required: "Email is required",
            })}
            className="input_connexion"
            type="email"
            placeholder="e.g.alex@example.com"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-5 mb-2">
          <span className="text-base text-gray-500 ">Create a password</span>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
            })}
            className="input_connexion"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>
        <button className="bg-bluePurple mt-4 w-full text-md font-medium text-white py-3 px-4 rounded-xl duration-150 hover:bg-[#beadff] hover:shadow-[0_0_32px_0_rgba(99,60,255,.25)]">
          Create new account
        </button>
      </form>
      <span className="text-center text-gray-500 text-base mt-5">
        Already have an account ?
        <Link
          href="/login"
          className="text-bluePurple cursor-pointer underline-offset-2 hover:underline"
        >
          {" "}
          Login
        </Link>
      </span>
    </div>
  );
}
