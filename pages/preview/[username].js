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
      .get(
        `https://linksharing-backend.vercel.app/users/findByUsername/${username}`
      )
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
      "/upload/w_800,c_scale"
    );
    return editedAddresse;
  };

  const linksDemo = ["Instagram", "Twitter", "Youtube", "LinkedIn"];

  return (
    <>
      <Head>
        <title>Zoka - {username}</title>
      </Head>
      <div className="min-h-screen bg-white relative">
        {showImage && selectedImage && (
          <div className="fixed z-50 overflow-auto top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center ">
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

        <div className="w-full h-[110vh] overflow-hidden relative text-white">
          <div className="absolute left-0 top-0 h-full w-full bg-black/30 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#00000094] lg:to-[#0000000d]"></div>
          {dataPreview && (
            <img
              className="w-full h-full object-cover"
              src={dataPreview.photoBanner}
              alt=""
            />
          )}
          <div className="absolute bottom-[17%] left-10 z-20">
            {dataPreview && (
              <div className="rounded-xl p-6">
                <div className="flex flex-col justify-between p-6  ">
                  <div className=" flex flex-col gap-8">
                    {dataPreview.profilePicture ? (
                      <Image
                        src={dataPreview.profilePicture}
                        alt="Profile picture of the person"
                        width={170}
                        height={170}
                        className="rounded-full w-[170px] h-[170px] border-2 border-black "
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
                      <span className="font-semibold text-[50px]">
                        {dataPreview.name}
                      </span>
                      <span className="text-[16px]">
                        {dataPreview.description}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center mt-10">
                    {dataPreview.links.length > 0 &&
                      dataPreview.links.map((x) => (
                        <Link
                          href={x.url} // Remplacez ceci par le chemin de votre favicon
                          className="flex items-center py-2 gap-2 rounded-full bg-black bg-opacity-20 px-3 backdrop-blur-md transition duration-700 ease-in-out hover:bg-white hover:text-black hover:duration-300"
                          target="_blank"
                        >
                          <img
                            src={`https://s2.googleusercontent.com/s2/favicons?domain=${x.url}`} // Chemin vers le favicon (modifiez ceci)
                            alt={`Favicon de ${x}`}
                            className="w-4 h-4"
                          />
                          <span className="uppercase font-semibold tracking-wider text-sm">
                            {x.name}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className=" flex justify-center items-center gap-5 preview-scrollbar">
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

          <div className="mt-10 p-6 grid-cols-3 grid gap-4">
            {dataPreview &&
              dataPreview.photos.length > 0 &&
              dataPreview.photos.map((x, index) => (
                <Image
                  onClick={() => handleClickOnImage(x)}
                  src={replaceAddresseQuality(x)}
                  alt={`Picture ${index} of the person's gallery`}
                  width={800}
                  height={800}
                  className="rounded-lg cursor-pointer w-full h-[400px] object-cover"
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
