import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";

export default function AddPhotos({ setDisplayPopupAddPhoto }) {
  const [photos, setPhotos] = useState([]);
  const [isUploading, setIsUploading] = useState(false); // Nouvelle variable d'état pour suivre le statut de chargement
  const userReducer = useSelector((state) => state.user.value);

  const onDrop = useCallback((acceptedFiles) => {
    setPhotos((prevPhotos) => [...prevPhotos, ...acceptedFiles]); // Concaténer les nouveaux fichiers avec les fichiers existants
    acceptedFiles.forEach((file) => {
      console.log("Fichier image sélectionné:", file);
    });
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
  });

  const handleUploadPhotos = () => {
    if (photos.length === 0) {
      return;
    }
    const formData = new FormData();
    setIsUploading(true);

    photos.forEach((photo, index) => {
      formData.append(`photoFromFront`, photo);
    });
    axios
      .post(
        `https://linksharing-backend.vercel.app/users/uploadPhotos/${userReducer.id}`,
        formData
      )
      .then((response) => {
        setPhotos(null);
        setDisplayPopupAddPhoto(false);
        console.log("Données mises à jour avec succès :", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour des données :", error);
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  const removePhoto = (indexToRemove) => {
    const updatedPhotos = photos.filter((_, index) => index !== indexToRemove);
    setPhotos(updatedPhotos);
  };

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm">
      <div className="relative bg-neutral-50 shadow-md flex flex-col gap-8 justify-center items-center h-3/4 w-3/4">
        <button
          onClick={() => setDisplayPopupAddPhoto(false)}
          className="p-4 absolute top-4 right-4 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div
          className="py-10 px-10 border-black border-2 cursor-pointer "
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-lg text-neutral-500">
              Glissez et déposez les fichiers ici...
            </p>
          ) : (
            <p className="text-lg text-neutral-500">
              Glissez et déposez des fichiers ici, ou cliquez pour sélectionner
              des fichiers
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {photos &&
            photos.map((photo, index) => (
              <div className="relative flex-col flex items-center justify-center">
                <img
                  key={index}
                  src={URL.createObjectURL(photo)}
                  alt={`Photo ${index}`}
                  className=" w-20 h-20 object-cover"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="px-2 py-2"
                >
                  delete
                </button>
              </div>
            ))}
        </div>
        <button
          disabled={isUploading}
          onClick={() => handleUploadPhotos()}
          className={`py-3 px-12 bg-bluePurple text-white rounded-lg ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isUploading ? "Loading" : "Add"}
        </button>
      </div>
    </div>
  );
}
