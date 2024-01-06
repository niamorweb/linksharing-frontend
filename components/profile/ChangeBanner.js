import React, { useState } from "react";

export default function ChangeBanner({ setIsChangeBannerDisplayed }) {
  const [imageSelected, setImageSelected] = useState(
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=50&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  const imagesChoice = [
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=50&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1676139292729-0976e4162a17?q=50&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=50&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1682685795557-976f03aca7b2?q=50&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
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
          onClick={() => setIsChangeBannerDisplayed(false)}
          className="self-end px-3 md:px-4 py-1 md:py-2 border-2  rounded-md md:rounded-lg bg-bluePurple text-white duration-150 hover:text-white hover:bg-bluePurple hover:border-white hover:scale-105 "
        >
          Validate
        </button>
      </div>
    </div>
  );
}
