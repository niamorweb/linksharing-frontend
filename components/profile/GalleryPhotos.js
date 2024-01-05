import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function GalleryPhotos({
  setDisplayPopupAddPhoto,
  displayPopupAddPhoto,
}) {
  const [existingPhotos, setExistingPhotos] = useState();
  const userReducer = useSelector((state) => state.user.value);

  useEffect(() => {
    handleFetchUserPhotos();
  }, [displayPopupAddPhoto]);

  const handleFetchUserPhotos = () => {
    axios
      .get(`http://localhost:3000/users/${userReducer.id}`)
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
        `http://localhost:3000/users/deletePhoto/${userReducer.id}?photoUrl=${photoUrl}`
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
      <span className="text-3xl text-darkPurple font-bold ">My photos</span>
      {existingPhotos && existingPhotos.length > 0 ? (
        <div className=" w-full grid-cols-3 grid gap-4">
          {existingPhotos.map((x) => (
            <Image
              onClick={() => handleDeletePhoto(x)}
              src={replaceAddresseQuality(x)}
              alt="Picture of your gallery"
              width={400}
              height={400}
              className="h-[280px] w-full object-cover"
            />
          ))}
          <button
            onClick={() => setDisplayPopupAddPhoto(true)}
            className="rounded-lg text-lg  text-bluePurple px-14 font-semibold py-4 self-start duration-150 hover:scale-[101%] border-2 border-bluePurple"
          >
            Add Photo
          </button>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col gap-4">
          <span className="text-2xl duration-150">No photo uploaded</span>
          <button
            onClick={() => setDisplayPopupAddPhoto(true)}
            className="text-lg md:text-xl font-bold text-white bg-bluePurple px-8 py-3 md:px-10 md:py-5 rounded-xl"
          >
            Add Photo
          </button>
        </div>
      )}
    </div>
  );
}
