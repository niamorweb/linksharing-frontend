import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ExistingLink({ dataExistingLink }) {
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
    <div className=" px-16 flex justify-center items-center rounded-xl">
      {dataExistingLink && (
        <div className="w-[310px] h-[630px] bg-white  border-2 relative">
          {dataExistingLink.image && (
            <img
              className="absolute object-cover rounded-full  flex flex-col justify-center items-center top-[65px] left-[105px]  w-[95px] h-[95px] "
              src={replaceAddresseQuality(dataExistingLink.image)}
              alt=""
            />
          )}
          {(dataExistingLink.firstName || dataExistingLink.lastName) && (
            <div className="absolute rounded-lg bg-white flex flex-col justify-center items-center top-[175px] left-9  w-[240px] h-9 ">
              <span>
                {dataExistingLink.firstName ? dataExistingLink.firstName : null}{" "}
                {dataExistingLink.lastName ? dataExistingLink.lastName : null}{" "}
              </span>
            </div>
          )}
          {dataExistingLink.email && (
            <div className="absolute rounded-lg bg-white flex flex-col justify-center items-center top-[200px] left-9  w-[240px] h-9 ">
              <span className="text-sm text-gray-500">
                {dataExistingLink.email}
              </span>
            </div>
          )}

          <div className="absolute rounded-lg flex flex-col gap-3 w-[240px] z-30 top-[280px] left-[35px]">
            {dataExistingLink.linkInfo &&
              dataExistingLink.linkInfo.length > 0 &&
              dataExistingLink.linkInfo.map((link) => (
                <a
                  target="_blank"
                  href={link.url}
                  style={{ backgroundColor: adaptColorBgLink(link.name) }}
                  className="w-full cursor-pointer rounded-lg flex items-center justify-between p-3  text-white h-[50px]"
                >
                  <span>{link.name}</span>
                  <img className="" src="/icons/icon-arrow-right.svg" alt="" />
                </a>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
