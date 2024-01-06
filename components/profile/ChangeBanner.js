import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ChangeBanner({}) {
  const userReducer = useSelector((state) => state.user.value);
  const [isChangeBannerDisplayed, setIsChangeBannerDisplayed] = useState(false);
  const [userBanner, setUserBanner] = useState();

  const [imageSelected, setImageSelected] = useState(
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=50&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  const imagesChoice = [
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=50&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1676139292729-0976e4162a17?q=50&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=50&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1682685795557-976f03aca7b2?q=50&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const handleUpdateURL = () => {
    axios
      .put(
        `https://linksharing-backend.vercel.app/users/${userReducer.id}/updateUrl`,
        {
          newURL: imageSelected,
        }
      )
      .then((response) => {
        console.log("URL mise à jour avec succès :", response.data);
        fetchUserInfo();
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'URL :", error);
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    axios
      .get(`https://linksharing-backend.vercel.app/users/${userReducer.id}`)
      .then((response) => {
        setUserBanner(response.data.data.photoBanner);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'URL :", error);
      });
  };

  const handleSubmit = () => {
    handleUpdateURL();
    setIsChangeBannerDisplayed(false);
  };

  return (
    <div className="flex gap-3 items-center">
      <img className="h-[200px]" src={userBanner} alt="" />
      <button
        onClick={() => setIsChangeBannerDisplayed(true)}
        className="px-3 md:px-4 py-1 md:py-2  text-bluePurple rounded-md md:rounded-lg  border-2 border-bluePurple duration-150 "
      >
        Change banner profile
      </button>

      {isChangeBannerDisplayed && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white flex flex-col gap-3 p-6 shadow-lg rounded-lg">
            <span className="text-xl">Change banner</span>
            <div className="bg-white grid grid-cols-2 gap-3 ">
              {imagesChoice.map((x) => (
                <img
                  onClick={() => setImageSelected(x)}
                  className={`cursor-pointer w-full h-[200px] object-cover ${
                    imageSelected === x
                      ? "outline-4 outline outline-bluePurple"
                      : "blur-[1px]"
                  } `}
                  src={x}
                  alt=""
                />
              ))}
            </div>
            <button
              onClick={() => handleSubmit()}
              className="self-end px-3 md:px-4 py-1 md:py-2 border-2  rounded-md md:rounded-lg bg-bluePurple text-white duration-150 hover:text-white hover:bg-bluePurple hover:border-white hover:scale-105 "
            >
              Validate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
