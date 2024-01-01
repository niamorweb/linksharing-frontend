import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Discover({ adaptColorBgLink }) {
  const [data, setData] = useState([]);
  const userReducer = useSelector((state) => state.user.value);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://linksharing-backend.vercel.app/links")
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      });
  };

  const handleDeleteLink = (linkId) => {
    fetch(`https://linksharing-backend.vercel.app/links/deleteLink/${linkId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        fetchData();
      })
      .catch((error) => {});
  };

  const replaceAddresseQuality = (e) => {
    const editedAddresse = e.replace(/\/upload\/[^/]+/, "/upload/q_10");
    return editedAddresse;
  };

  return (
    <div className="w-full bg-white p-8 lg:p-16">
      <span className="text-3xl font-bold">Some creations from people</span>
      <div className="flex gap-5 lg:gap-10 flex-wrap justify-center mt-14">
        {data &&
          data.length > 0 &&
          data.map((x) => (
            <div className="flex flex-col gap-6 items-center">
              <Link
                href={`/preview/${x._id}`}
                className="relative shadow-md hover:shadow-lg duration-150 w-[190px] h-[190px] overflow-hidden rounded-md lg:w-[310px] lg:h-[310px] flex flex-col gap-3 items-center justify-center border-2 border-neutral-200"
              >
                {x.image && (
                  <img
                    className="object-cover w-[50px] h-[50px] lg:w-[140px] lg:h-[140px] rounded-full "
                    src={replaceAddresseQuality(x.image)}
                    alt=""
                  />
                )}
                {(x.firstName || x.lastName) && (
                  <div className="flex flex-col justify-center items-center  ">
                    <span>
                      {x.firstName ? x.firstName : null}{" "}
                      {x.lastName ? x.lastName : null}{" "}
                    </span>
                  </div>
                )}
                {x.email && (
                  <span className="text-sm text-gray-500">{x.email}</span>
                )}
              </Link>
              {userReducer.isAdmin && (
                <button
                  onClick={() => handleDeleteLink(x._id)}
                  className=" bg-red-400 text-sm text-white font-medium py-2 px-6 mx-auto rounded-lg"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
