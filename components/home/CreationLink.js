import { addLinkToStore } from "@/reducers/links";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";
import ExistingLink from "./ExistingLink";

export default function CreationLink({
  links,
  setLinks,
  listPossibiltyLinks,
  adaptColorBgLink,
  handleFetchExitingLink,
}) {
  const [image, setImage] = useState(null);
  const [isExistingLink, setIsExistingLink] = useState(false);
  const [dataExistingLink, setDataExistingLink] = useState(null);
  const dispatch = useDispatch();
  const linksReducer = useSelector((state) => state.links.value);
  const userReducer = useSelector((state) => state.user.value);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const imageSrc = watch("imageSrc");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        setValue("imageSrc", e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchCreatorLink();
  }, []);

  const fetchCreatorLink = () => {
    if (userReducer.id) {
      fetch(
        `https://linksharing-backend.vercel.app/links/findByCreator/${userReducer.id}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok.");
          }
          return res.json();
        })
        .then((data) => {
          if (data.data.length === 0) {
            setDataExistingLink(null);
            setIsExistingLink(false);
          } else {
            setDataExistingLink(data.data[0]);
            setIsExistingLink(true);
          }
        })
        .catch((error) => {});
    }
  };

  const addLink = () => {
    const newLink = {
      url: "",
      name: "GitHub", // Initialisez les valeurs par défaut
    };
    setLinks([...links, newLink]); // Ajoutez le nouvel objet lien à la liste
  };

  const findRegex = (item) => {
    let regex;
    listPossibiltyLinks.map((x) => {
      if (x.name === item.name) {
        regex = x.regex;
      }
    });
    return regex;
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("photoFromFront", image); // Utilisez le même nom que le serveur attend pour l'image
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("userId", userReducer.id);

    formData.append("linkInfo", JSON.stringify(data.links));

    try {
      const response = await fetch(
        "https://linksharing-backend.vercel.app/links/addLink",
        {
          method: "POST",
          body: formData, // Envoyez les données sous forme de FormData
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const responseData = await response.json();
      handleFetchExitingLink();
    } catch (error) {}
  };

  const repeatNumberLink = [1, 2, 3, 4, 5];

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
        fetchCreatorLink();
      })
      .catch((error) => {});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:p-6 flex flex-col">
      <div className="flex gap-10">
        {isExistingLink ? (
          <div className="mx-auto px-16 flex flex-col justify-center items-center font-semibold py-16  bg-white  rounded-xl ">
            <span className="font-semibold text-xl mb-10">
              Your current link
            </span>
            <ExistingLink dataExistingLink={dataExistingLink} />

            <button
              onClick={() => handleDeleteLink(dataExistingLink._id)}
              className="mt-8 border-2 w-full duration-150 hover:bg-[#EFEBFF] border-[#633cff] text-[#633cff] font-semibold px-5 py-3 rounded-lg "
            >
              Delete this link
            </button>
          </div>
        ) : (
          <div className=" px-16 hidden lg:flex justify-center items-start py-16  bg-white  rounded-xl ">
            <div className=" w-[310px] h-[630px] bg-white  border-2 relative">
              <div className="absolute rounded-lg flex flex-col gap-3 w-[240px] z-30 top-[280px] left-[35px]">
                {links.length > 0
                  ? links.map((x) => (
                      <div
                        style={{ backgroundColor: adaptColorBgLink(x.name) }}
                        className="w-full cursor-pointer rounded-lg flex items-center justify-between p-3  text-white h-[50px]"
                      >
                        <span>{x.name}</span>
                        <img
                          className=""
                          src="/icons/icon-arrow-right.svg"
                          alt=""
                        />
                      </div>
                    ))
                  : repeatNumberLink.map((x) => (
                      <div className="w-full rounded-lg bg-neutral-200 h-[50px]"></div>
                    ))}
              </div>{" "}
              {imageSrc ? (
                <img
                  className="absolute rounded-full  bg-white flex flex-col justify-center items-center top-[65px] left-[105px]  w-[95px] h-[95px] "
                  src={imageSrc}
                  alt=""
                />
              ) : (
                <div className="absolute rounded-full  bg-neutral-200 flex flex-col justify-center items-center top-[65px] left-[105px]  w-[95px] h-[95px] "></div>
              )}
              <div className="absolute rounded-lg bg-white flex flex-col justify-center items-center top-[175px] left-9  w-[240px] h-9 ">
                <span className="flex items-center gap-2">
                  {firstName ? (
                    firstName
                  ) : (
                    <div className=" bg-neutral-200 rounded-md w-[50px] h-[12px]  shadow-md"></div>
                  )}{" "}
                  {lastName ? (
                    lastName
                  ) : (
                    <div className=" bg-neutral-200 rounded-md w-[50px] h-[12px] shadow-md "></div>
                  )}{" "}
                </span>
              </div>
              {email ? (
                <div className="absolute rounded-lg bg-white flex flex-col justify-center items-center top-[200px] left-9  w-[240px] h-9 ">
                  <span className="text-sm text-gray-500">{email}</span>
                </div>
              ) : (
                <div className="absolute rounded-lg bg-white flex flex-col justify-center items-center top-[200px] left-9  w-[240px] h-9 ">
                  <div className=" bg-neutral-200 rounded-md w-[108px] h-[12px] shadow-md "></div>
                </div>
              )}
            </div>
          </div>
        )}

        {!isExistingLink && (
          <div className="flex w-full lg:w-3/5 flex-col  bg-white  rounded-xl">
            <div className="flex p-16  flex-col gap-4 border-b border-b-gray-300">
              <span className="font-bold text-3xl">Customize your links</span>
              <span className="text-gray-700">
                Add/edit/remove links below and then share all your profiles
                with the world
              </span>
              <div className="bg-[#fafafa] flex items-center gap-4 p-8">
                <span className="text-sm text-gray-500">Profile picture</span>
                <input
                  type="file"
                  accept="image/*"
                  {...register("profilePicture")} // Enregistrement du champ
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() =>
                    document.querySelector("input[type='file']").click()
                  }
                >
                  <div className="bg-[#633cff20] flex flex-col items-center justify-center rounded-xl w-44 h-44  shrink-0 grow-0">
                    <img src="/icons/icon-upload-image.svg" alt="" />
                    <span className="font-semibold text-[#633cff]">
                      + Upload image
                    </span>
                  </div>
                </button>

                <span className="text-sm hidden md:flex text-gray-500">
                  Image must be below 1024x1024px. Use PNG or JPG format.
                </span>
              </div>
              <div className="bg-[#fafafa] flex flex-col  gap-4 p-8">
                <div className="flex items-center justify-between gap-4">
                  <span>First name*</span>

                  <div className="flex flex-col w-3/4 gap-1 ">
                    <input
                      placeholder="e.g. John"
                      type="text"
                      {...register("firstName", {
                        required: true,
                        maxLength: 10,
                      })}
                      className="w-full focus:shadow-[0_0_32px_0_rgba(99,60,255,.25)] px-4 py-2 outline outline-[2px] outline-gray-200 rounded-sm focus:outline-2 focus:outline-[#633cff] "
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-600">
                        First name is required and it must contains 10
                        characters max.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span>Last name*</span>
                  <div className="flex flex-col w-3/4 gap-1 ">
                    <input
                      placeholder="e.g. Appleseed"
                      type="text"
                      {...register("lastName", {
                        required: true,
                        maxLength: 10,
                      })} // Enregistrement avec validation requise
                      className="duration-150 focus:shadow-[0_0_32px_0_rgba(99,60,255,.25)] w-full px-4 py-2 outline outline-[2px] outline-gray-200 rounded-sm focus:outline-2 focus:outline-[#633cff]"
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-600">
                        Last name is required and it must contains 10 characters
                        max.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span>Email</span>
                  <div className="flex flex-col w-3/4 gap-1 ">
                    <input
                      placeholder="e.g. email@example.com"
                      type="text"
                      {...register("email", { pattern: /^\S+@\S+$/i })} // Validation du format email
                      className=" duration-150  focus:shadow-[0_0_32px_0_rgba(99,60,255,.25)] text-sm px-4 py-2 outline outline-[2px] outline-gray-200 rounded-sm focus:outline-2 focus:outline-[#633cff]"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600">
                        Invalid email address.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={addLink}
                className="mt-8 border-2 w-full duration-150 hover:bg-[#EFEBFF] border-[#633cff] text-[#633cff] font-semibold px-5 py-3 rounded-lg "
              >
                + Add new url
              </button>
              {links.map((url, index) => (
                <div
                  key={index}
                  className="p-5 bg-[#fafafa] rounded-lg flex flex-col  "
                >
                  <div className="w-full flex justify-between items-center">
                    <span className="font-semibold">Link #{index + 1}</span>
                    <button onClick={() => handleRemoveLink(index)}>
                      Remove
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 mt-5">
                    <span className="text-sm">Platform</span>

                    <select
                      className="px-4 py-2 duration-150  focus:shadow-[0_0_32px_0_rgba(99,60,255,.25)]  outline outline-[2px] outline-gray-200 rounded-sm focus:outline-2 focus:outline-[#633cff]"
                      {...register(`links[${index}].name`)}
                      required={true}
                      onChange={(e) => {
                        // Mettez à jour le nom du lien lorsque le sélecteur est modifié
                        const updatedLinks = [...links];
                        updatedLinks[index].name = e.target.value;
                        setLinks(updatedLinks);
                      }}
                    >
                      {listPossibiltyLinks.map((option, i) => (
                        <option key={i} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 mt-5">
                    <span className="text-sm">Link</span>
                    <div className="relative">
                      <img
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        src="icons/icon-link.svg"
                        alt=""
                      />
                      <input
                        className="w-full duration-150  focus:shadow-[0_0_32px_0_rgba(99,60,255,.25)] pl-10 pr-4 py-2 outline outline-[2px] outline-gray-200 rounded-sm focus:outline-2 focus:outline-[#633cff]"
                        type="text"
                        required={true}
                        {...register(`links[${index}].url`, {
                          pattern: {
                            value: findRegex(url) || "",
                            message: `Veuillez entrer une URL valide pour ${url.name}`,
                          },
                        })}
                      />
                    </div>
                    {errors.links &&
                      errors.links[index] &&
                      errors.links[index].url && (
                        <p className="text-xs text-red-700">
                          {errors.links[index].url.message}
                        </p>
                      )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 w-full flex flex-col">
              <button
                type="submit"
                className="bg-[#633cff] duration-150 hover:bg-[#beadff] hover:shadow-[0_0_32px_0_rgba(99,60,255,.25)] rounded-lg text-white px-7 font-semibold py-3 self-end"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
