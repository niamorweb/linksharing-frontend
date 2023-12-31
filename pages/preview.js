import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Preview() {
  const linksReducer = useSelector((state) => state.links.value);
  const [sectionActive, setSectionActive] = useState("links");

  const adaptColorBgLink = (linkName) => {
    if (linkName === "Github") {
      return "black";
    } else if (linkName === "Instagram") {
      return "purple";
    } else if (linkName === "Youtube") {
      return "red";
    } else if (linkName === "Twitter") {
      return "blue";
    }
  };

  const replaceAddresseQuality = (e) => {
    const editedAddresse = e.replace(/\/upload\/[^/]+/, "/upload/q_10");
    return editedAddresse;
  };

  return (
    <div className=" min-h-screen p-10 flex flex-col gap-10 bg-white">
      <div className=" px-16 flex justify-center items-center  bg-white  rounded-xl">
        <div className="w-fit h-fit relative">
          <img
            className="w-[310px] object-contain"
            src="/images/illustration-phone-mockup.svg"
            alt=""
          />
          <div className="absolute rounded-lg flex flex-col items-center gap-3 w-[240px] z-30 top-[280px] left-[35px]">
            {linksReducer.links.length > 0 &&
              linksReducer.links.map((x) => (
                <div
                  style={{ backgroundColor: adaptColorBgLink(x.name) }}
                  className="w-full cursor-pointer rounded-lg flex items-center justify-between p-3  text-white h-[50px]"
                >
                  <span>{x.name}</span>
                  <img className="" src="/icons/icon-arrow-right.svg" alt="" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
