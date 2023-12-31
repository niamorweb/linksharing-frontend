import { addDetailsProfileToStore } from "@/reducers/links";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export default function Test() {
  const dispatch = useDispatch();
  const linksReducer = useSelector((state) => state.links.value);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const imageSrc = watch("imageSrc");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");

  const onSubmit = (data) => {
    const formData = {
      ...data,
      image: imageSrc, // Ajouter l'URL de l'image ici
    };
    dispatch(addDetailsProfileToStore(formData));
    console.log(data);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setValue("imageSrc", e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-slate-100 min-h-screen p-10 flex flex-col gap-10"
    >
      <div className="flex gap-10">
        <div className=" px-16 flex justify-center items-center  bg-white  rounded-xl">
          <div className="w-fit h-fit relative">
            <img
              className="w-[310px] object-contain"
              src="/images/illustration-phone-mockup.svg"
              alt=""
            />
            <div className="absolute rounded-lg bg-white flex flex-col gap-3 w-[240px] z-30 top-[280px] left-[35px] bottom-8"></div>
            {imageSrc && (
              <img
                className="absolute rounded-full  bg-white flex flex-col justify-center items-center top-[65px] left-[105px]  w-[95px] h-[95px] "
                src={imageSrc}
                alt=""
              />
            )}
            {(firstName || lastName) && (
              <div className="absolute rounded-lg bg-white flex flex-col justify-center items-center top-[175px] left-9  w-[240px] h-9 ">
                <span>
                  {firstName ? firstName : null} {lastName ? lastName : null}{" "}
                </span>
              </div>
            )}
            {email && (
              <div className="absolute rounded-lg bg-white flex flex-col justify-center items-center top-[200px] left-9  w-[240px] h-9 ">
                <span className="text-sm text-gray-500">{email}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-3/5 flex-col  bg-white  rounded-xl">
          <div className="flex p-16  flex-col gap-4 border-b border-b-gray-300">
            <span className="font-bold text-3xl">Profile Details</span>
            <span className="text-gray-700">
              Add your details to create a personal touch to your profile.
            </span>
            <div className="bg-[#fafafa] flex items-center gap-4 p-8">
              <span className="text-sm text-gray-500">Profile picture</span>
              <input
                type="file"
                {...register("profilePicture")} // Enregistrement du champ
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() =>
                  document.querySelector("input[type='file']").click()
                }
              >
                <div className="bg-[#633cff20] flex flex-col items-center justify-center rounded-xl w-44 h-44  shrink-0 grow-0">
                  <img src="/icons/icon-upload-image.svg" alt="" />
                  <span className="font-semibold text-[#633cff]">
                    + Upload image
                  </span>
                </div>
              </button>

              <span className="text-sm text-gray-500">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </span>
            </div>

            <div className="bg-[#fafafa] flex flex-col  gap-4 p-8">
              <div className="flex items-center justify-between gap-4">
                <span>First name*</span>

                <div className="flex flex-col w-3/4 gap-1 ">
                  <input
                    type="text"
                    {...register("firstName", {
                      required: true,
                      maxLength: 10,
                    })}
                    className="w-full px-4 py-2 outline outline-[2px] outline-gray-200 rounded-sm focus:outline-2 focus:outline-[#633cff]"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-600">
                      First name is required and it must contains 10 characters
                      max.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span>Last name*</span>
                <div className="flex flex-col w-3/4 gap-1 ">
                  <input
                    type="text"
                    {...register("lastName", { required: true, maxLength: 10 })} // Enregistrement avec validation requise
                    className="w-full px-4 py-2 outline outline-[2px] outline-gray-200 rounded-sm focus:outline-2 focus:outline-[#633cff]"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-600">
                      Last name is required and it must contains 10 characters
                      max.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span>Email</span>
                <input
                  type="text"
                  {...register("email", { pattern: /^\S+@\S+$/i })} // Validation du format email
                  className=" w-3/4 px-4 py-2 outline outline-[2px] outline-gray-200 rounded-sm focus:outline-2 focus:outline-[#633cff]"
                />
                {errors.email && <p>Invalid email address.</p>}
              </div>
            </div>
          </div>

          <div className="p-8 w-full flex flex-col">
            <button
              type="submit"
              className="bg-[#633cff] rounded-lg text-white px-7 font-semibold py-3 self-end"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
