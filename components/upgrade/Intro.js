import React from "react";

export default function Intro() {
  return (
    <section className="flex flex-col md:flex-row md:mt-10 gap-2 lg:gap-10 items-center">
      <img
        className="max-h-[400px] md:w-1/2 object-cover object-center rounded-lg"
        src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <div className="flex md:w-1/2 flex-col gap-6 p-6">
        <h2 className="font-bold text-darkPurple text-4xl md:text-[48px] md:leading-[125%]">
          Upgrade
        </h2>
        <span className="text-lg text-neutral-500">
          We make sure all of our pricing are designed to be loved by every
          aspiring and even professional photograpers who wanted to share their
          stories.
        </span>
      </div>
    </section>
  );
}
