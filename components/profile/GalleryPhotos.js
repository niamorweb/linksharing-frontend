import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function GalleryPhotos({
  setDisplayPopupAddPhoto,
  displayPopupAddPhoto,
}) {
  const [existingPhotos, setExistingPhotos] = useState();
  const [isOverlayDelete, setIsOverlayDelete] = useState(false);
  const userReducer = useSelector((state) => state.user.value);

  useEffect(() => {
    handleFetchUserPhotos();
  }, [displayPopupAddPhoto]);

  const handleFetchUserPhotos = () => {
    axios
      .get(`https://linksharing-backend.vercel.app/users/${userReducer.id}`)
      .then((response) => {
        if (response.data.result === true) {
          setExistingPhotos(response.data.data.photos);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour des données :", error);
      });
  };

  const handleDeletePhoto = (photoUrl) => {
    axios
      .delete(
        `https://linksharing-backend.vercel.app/users/deletePhoto/${userReducer.id}?photoUrl=${photoUrl}`
      )
      .then((response) => {
        console.log("Supression réussie :", response);
        handleFetchUserPhotos();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression :", error);
      });
  };

  ("");

  const replaceAddresseQuality = (e) => {
    const editedAddresse = e.replace(
      /\/upload\/[^/]+/,
      "/upload/w_400,c_scale"
    );
    return editedAddresse;
  };

  return (
    <div className="w-full bg-neutral-50 shadow-md flex flex-col gap-8 py-10 px-8 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-3xl text-darkPurple font-bold ">My photos</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOverlayDelete(!isOverlayDelete)}
            className="px-3 md:px-4 py-1 md:py-2  text-bluePurple rounded-md md:rounded-lg  border-2 border-bluePurple duration-150 "
          >
            {isOverlayDelete ? "Cancel" : "Manage photos"}
          </button>
          <button
            onClick={() => setDisplayPopupAddPhoto(true)}
            className="px-3 md:px-4 py-1 md:py-2  text-bluePurple rounded-md md:rounded-lg  border-2 border-bluePurple duration-150 "
          >
            Add Photo
          </button>
        </div>
      </div>
      {existingPhotos && existingPhotos.length > 0 ? (
        <div className=" w-full grid-cols-3 grid gap-4">
          {existingPhotos.map((x) => (
            <div className="h-[280px] w-full relative">
              {isOverlayDelete && (
                <div className="absolute top-0 left-0 h-full w-full duration-150 bg-[#ffffff65] flex items-center justify-center  ">
                  <button
                    className="px-3 md:px-4 py-1 md:py-2  text-bluePurple bg-white rounded-md md:rounded-lg  border-2 border-bluePurple duration-150 "
                    onClick={() => handleDeletePhoto(x)}
                  >
                    Delete
                  </button>
                </div>
              )}{" "}
              <Image
                src={replaceAddresseQuality(x)}
                alt="Picture of your gallery"
                width={400}
                height={400}
                className="h-[280px] w-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col gap-4">
          <span className="text-2xl duration-150">No photo uploaded</span>
        </div>
      )}
    </div>
  );
}
