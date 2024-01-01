import { useRouter } from "next/router";
import React from "react";

export default function Header({ setSectionActive, sectionActive, linkId }) {
  const router = useRouter();

  return (
    <div className="relative bg-white px-6 py-5 flex justify-between items-center rounded-xl ">
      <img className="w-[150px]" src="icons/logo-devlinks-large.svg" alt="" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  flex items-center gap-2">
        <button
          onClick={() => setSectionActive("mylink")}
          style={
            sectionActive === "mylink"
              ? { backgroundColor: "#EFEBFF", color: "#633cff" }
              : null
          }
          className="py-3 px-4 hover:bg-[#EFEBFF] duration-150 rounded-lg border-none font-semibold flex gap-1 items-center"
        >
          <img src="/icons/icon-links-header.svg" alt="" />
          <span>My link page</span>
        </button>
        <button
          onClick={() => setSectionActive("discover")}
          style={
            sectionActive === "discover"
              ? { backgroundColor: "#EFEBFF", color: "#633cff" }
              : null
          }
          className="py-3 hover:bg-[#EFEBFF] duration-150 px-4 rounded-lg border-none font-semibold flex gap-1 items-center"
        >
          <img src="/icons/icon-profile-details-header.svg" alt="" />
          <span>Discover</span>
        </button>{" "}
      </div>

      <button
        disabled={!linkId}
        onClick={() => router.push(`/preview/${linkId}`)}
        className=" border duration-150 hover:bg-[#EFEBFF] border-[#633cff] text-[#633cff] font-semibold px-5 py-3 rounded-lg"
      >
        Preview
      </button>
    </div>
  );
}
