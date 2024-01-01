import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Preview() {
  const router = useRouter();
  const { linkId } = router.query;
  const linksReducer = useSelector((state) => state.links.value);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (linkId) {
      fetch(`https://linksharing-backend.vercel.app/links/findById/${linkId}`)
        .then((res) => res.json())
        .then((data) => setData(data.data[0]));
    }
  }, [linkId]);

  const adaptColorBgLink = (linkName) => {
    const lowercaseLinkName = linkName.toLowerCase();
    if (lowercaseLinkName === "github") {
      return "black";
    } else if (lowercaseLinkName === "instagram") {
      return "purple";
    } else if (lowercaseLinkName === "youtube") {
      return "red";
    } else if (lowercaseLinkName === "twitter") {
      return "blue";
    }
  };

  const replaceAddresseQuality = (e) => {
    const editedAddresse = e.replace(/\/upload\/[^/]+/, "/upload/q_10");
    return editedAddresse;
  };

  return (
    <div className=" min-h-screen flex flex-col gap-10 ">
      <div className="w-full h-[350px] bg-[#633cff] rounded-bl-[40px] rounded-br-[40px] "></div>
      <div className=" px-16 flex justify-center items-center rounded-xl">
        {data && (
          <div className="w-[310px] h-[630px] bg-white -mt-[200px] mb-16 rounded-lg border-2 relative">
            {data.image && (
              <img
                className="outline outline-[#633cff] outline-4 absolute object-cover rounded-full  flex flex-col justify-center items-center top-[65px] left-[105px]  w-[95px] h-[95px] "
                src={replaceAddresseQuality(data.image)}
                alt=""
              />
            )}
            {(data.firstName || data.lastName) && (
              <div className="absolute rounded-lg bg-white flex flex-col justify-center items-center top-[175px] left-9  w-[240px] h-9 ">
                <span>
                  {data.firstName ? data.firstName : null}{" "}
                  {data.lastName ? data.lastName : null}{" "}
                </span>
              </div>
            )}
            {data.email && (
              <div className="absolute rounded-lg bg-white flex flex-col justify-center items-center top-[200px] left-9  w-[240px] h-9 ">
                <span className="text-sm text-gray-500">{data.email}</span>
              </div>
            )}

            <div className="absolute rounded-lg flex flex-col gap-3 w-[240px] z-30 top-[280px] left-[35px]">
              {data.linkInfo &&
                data.linkInfo.length > 0 &&
                data.linkInfo.map((link) => (
                  <a
                    target="_blank"
                    href={link.url}
                    style={{ backgroundColor: adaptColorBgLink(link.name) }}
                    className="w-full cursor-pointer rounded-lg flex items-center justify-between p-3  text-white h-[50px]"
                  >
                    <span>{link.name}</span>
                    <img
                      className=""
                      src="/icons/icon-arrow-right.svg"
                      alt=""
                    />
                  </a>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
