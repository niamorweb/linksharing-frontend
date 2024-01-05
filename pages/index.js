import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SliderSection from "@/components/home/SliderSection";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function Index() {
  const userReducer = useSelector((state) => state.user.value);

  return (
    <>
      <Head>
        <title>Your Main Title | Your Site's Name</title>
        <meta
          name="description"
          content="Share your visual stories with [Your Site's Name], the platform to organize and share your photos simply and effectively."
        />
      </Head>
      <div className="min-h-screen bg-white">
        <div className="bg_home absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-full blur-lg rounded-full -translate-y-1/2"></div>
        <Header />

        <main className=" mb-32 relative z-10">
          <div className="max-w-[1400px] mx-auto px-10 py-20 lg:justify-center flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
            <div className="lg:w-3/5 flex flex-col gap-8 items-start">
              <h1 className="font-bold text-darkPurple text-4xl leading-10 md:text-[90px] md:leading-[90%]">
                The place for all Photographs
              </h1>
              <span className="text-lg text-neutral-500">
                Unleash your creativity, share your narrative. Your story,
                beautifully told.
              </span>
              <Link
                className="text-lg md:text-xl font-bold text-white bg-bluePurple px-8 py-3 md:px-10 md:py-5 rounded-xl"
                href={userReducer.id ? "dashboard" : "/signup"}
              >
                {userReducer.id ? "Dashboard" : "Get started"}
              </Link>
            </div>
            <div className="lg:w-2/5">
              <img
                className="w-full"
                src="images/home/illustration_home1.png"
                alt=""
              />
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto px-10 py-20 flex flex-col lg:flex-row gap-10 md:gap-28 lg:items-center">
            <img src="images/home/illustration_home2.png" alt="" />
            <div className="flex lg:w-[415px]  flex-col gap-8 items-start">
              <span className="text-xl uppercase font-semibold text-bluePurple">
                GET TO KNOW US
              </span>{" "}
              <h2 className="font-bold text-darkPurple text-4xl md:text-[48px] md:leading-[125%]">
                Where creative process happens
              </h2>
              <span className="text-lg text-neutral-500">
                Share your beautiful pictures to the rest of the world.
              </span>
              <Link
                className="text-lg md:text-xl font-bold text-white bg-bluePurple px-8 py-3 md:px-10 md:py-5 rounded-xl"
                href={userReducer.id ? "dashboard" : "/signup"}
              >
                {userReducer.id ? "Dashboard" : "Get started"}
              </Link>
            </div>
          </div>

          <SliderSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
