import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashboardSection() {
  const [userData, setUserData] = useState();
  const [copyText, setCopyText] = useState("Copy link profile");

  const userReducer = useSelector((state) => state.user.value);

  useEffect(() => {
    handleFetchUserPhotos();
  }, []);

  const handleFetchUserPhotos = () => {
    axios
      .get(`http://localhost:3000/users/${userReducer.id}`)
      .then((response) => {
        if (response.data.result === true) {
          setUserData(response.data.data);
          console.log(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour des données :", error);
      });
  };

  const replaceAddresseQuality = (e) => {
    const editedAddresse = e.replace(
      /\/upload\/[^/]+/,
      "/upload/w_300,c_scale"
    );
    return editedAddresse;
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(
      `http://localhost:3000/preview/${userReducer.username}`
    );
    setCopyText("Link copied !");
    setTimeout(() => {
      setCopyText("Copy link profile");
    }, 3000);
  };

  return (
    <div className="w-full h-fit bg-neutral-50 shadow-md flex flex-col gap-14 py-10 px-8 rounded-lg mr-10">
      <span className="text-3xl text-darkPurple font-bold ">My dashboard</span>

      <div className="flex gap-4 items-center">
        <button
          onClick={() => handleCopyLink()}
          className="text-lg md:text-xl font-bold text-white bg-bluePurple px-8 py-3 md:px-10 md:py-5 rounded-xl"
        >
          {copyText}
        </button>
        <Link
          href={`/preview/${userReducer.username}`}
          target="_blank"
          className="rounded-lg text-lg  text-bluePurple px-14 font-semibold py-4 self-start duration-150 hover:scale-[101%] border-2 border-bluePurple"
        >
          View page
        </Link>
      </div>

      <div>
        {userData && (
          <div className="flex flex-col gap-8">
            <div className="flex gap-6 items-center">
              {userData.profilePicture ? (
                <Image
                  src={userData.profilePicture}
                  width={200}
                  height={200}
                  alt="Your profile picture"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-28 h-28"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
              <div className="flex flex-col gap-2">
                <span className="text-xl">{userData.username}</span>
                <span className="text-neutral-500">{userData.description}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {userData.photos.length > 0 &&
                userData.photos.map((x, index) => (
                  <Image
                    src={replaceAddresseQuality(x)}
                    width={300}
                    height={300}
                    alt={`Photo ${index} of your gallery`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
