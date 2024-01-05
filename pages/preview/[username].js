import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Preview() {
  const router = useRouter();
  const { username } = router.query;
  const [dataPreview, setDataPreview] = useState();
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);

  const fetchUser = () => {
    axios
      .get(`http://localhost:3000/users/findByUsername/${username}`)
      .then((response) => {
        setDataPreview(response.data.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour des données :", error);
      });
  };

  useEffect(() => {
    if (username) {
      fetchUser();
    }
  }, [username]);

  const handleClickOnImage = (url) => {
    setSelectedImage(url);
    setShowImage(true);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setShowImage(false);
  };

  const replaceAddresseQuality = (e) => {
    const editedAddresse = e.replace(
      /\/upload\/[^/]+/,
      "/upload/w_400,c_scale"
    );
    return editedAddresse;
  };

  return (
    <>
      <Head>
        <title>Zoka - {username}</title>
      </Head>
      <div className="min-h-screen bg-white relative">
        <div className=" overflow-x-auto h-screen overflow-y-hidden flex justify-center items-center gap-5 preview-scrollbar">
          {showImage && selectedImage && (
            <div className="fixed overflow-auto top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center ">
              <div className="bg-white relative rounded-xl shadow-2xl p-5 pt-14">
                <button
                  onClick={() => handleCloseImage()}
                  className="absolute hover:underline underline-offset-2 duration-150 top-2 right-3 px-6 py-2 text-xl"
                >
                  Close
                </button>
                <Image
                  src={selectedImage}
                  alt={`Picture zoomed`}
                  height={800}
                  width={800}
                  className="h-full rounded-xl"
                />
              </div>
            </div>
          )}
          {dataPreview && (
            <div className="w-1/5 h-full rounded-xl p-6">
              <div className=" bg-white h-full shadow-xl flex flex-col justify-between p-6  ">
                <div className=" flex flex-col gap-8">
                  {dataPreview.profilePicture ? (
                    <Image
                      src={dataPreview.profilePicture}
                      alt="Profile picture of the person"
                      width={100}
                      height={100}
                      className="rounded-full w-[100px] h-[100px] "
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

                  <div className="flex flex-col gap-3">
                    <span className="font-semibold text-xl">
                      {dataPreview.name}
                    </span>
                    <span className="text-neutral-600 text-sm">
                      {dataPreview.description}
                    </span>
                  </div>
                </div>
                <p className="text-sm self-end text-left w-full">
                  Realize with{" "}
                  <Link
                    href="/accueil"
                    className="text-bluePurple underline underline-offset-2"
                  >
                    Zoka
                  </Link>{" "}
                </p>
              </div>
            </div>
          )}
          <div className="rounded-xl h-full p-6 flex flex-col flex-wrap gap-4">
            {dataPreview &&
              dataPreview.photos.length > 0 &&
              dataPreview.photos.map((x, index) => (
                <Image
                  onClick={() => handleClickOnImage(x)}
                  src={replaceAddresseQuality(x)}
                  alt={`Picture ${index} of the person's gallery`}
                  width={800}
                  height={800}
                  className="rounded-lg cursor-pointer h-[48%] object-cover"
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
