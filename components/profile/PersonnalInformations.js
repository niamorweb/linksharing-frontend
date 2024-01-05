import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function PersonnalInformations() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [displayedImage, setDisplayedImage] = useState(null);

  const userReducer = useSelector((state) => state.user.value);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setImage(selectedFile);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("photoFromFront", selectedFile);

      axios
        .put(
          `https://linksharing-backend.vercel.app/users/updateProfilePicture/${userReducer.id}`,
          formData
        )
        .then((response) => {
          handleFetchUserPhotos();
          console.log("Données mises à jour avec succès :", response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour des données :", error);
        });
    }
  };

  const handleFetchUserPhotos = () => {
    axios
      .get(`https://linksharing-backend.vercel.app/users/${userReducer.id}`)
      .then((response) => {
        setDescription(response.data.data.description);
        setName(response.data.data.name);
        setDisplayedImage(response.data.data.profilePicture);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour des données :", error);
      });
  };

  const handleUpdateInfosProfile = () => {
    const infos = {
      name: name,
      description: description,
    };

    axios
      .put(
        `https://linksharing-backend.vercel.app/users/updateInfos/${userReducer.id}`,
        infos
      )
      .then((response) => {
        console.log("Données mises à jour avec succès :", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour des données :", error);
      });
  };

  useEffect(() => {
    handleFetchUserPhotos();
  }, []);

  return (
    <div className="w-full h-fit bg-neutral-50 shadow-md flex flex-col gap-8 py-10 px-8 rounded-lg mr-10">
      <span className="text-3xl text-darkPurple font-bold ">
        My informations
      </span>
      <div className="flex flex-col gap-4">
        <div className="flex justify-start items-center gap-6 border-b-2 border-b-neutral-200 pb-10 mb-5">
          {displayedImage ? (
            <img
              className="w-32 h-32 rounded-full"
              src={displayedImage}
              alt=""
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-32 h-32"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          )}{" "}
          <button
            onClick={() => handleClick()}
            className="rounded-lg text-lg  text-bluePurple px-14 font-semibold py-4 self-start duration-150 hover:scale-[101%] border-2 border-bluePurple"
          >
            Change profile picture
          </button>
        </div>
        <input
          onChange={handleFileChange}
          accept="image/*"
          ref={fileInputRef}
          type="file"
          className="hidden"
        />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xl text-darkPurple">Name</span>
            <input
              value={name}
              minLength={1}
              onChange={(e) => setName(e.target.value)}
              className="input_connexion"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl text-darkPurple">Description</span>
            <textarea
              value={description}
              maxLength={240}
              onChange={(e) => setDescription(e.target.value)}
              className="input_connexion min-h-44 "
              type="text"
            />
          </div>
        </div>
        <button
          onClick={() => handleUpdateInfosProfile()}
          className="bg-bluePurple rounded-lg text-lg  mt-6 text-white px-14 font-semibold py-4 self-start duration-150 hover:scale-105 "
        >
          Update
        </button>
      </div>
    </div>
  );
}
