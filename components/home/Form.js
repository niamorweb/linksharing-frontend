import { addLinksToStore } from "@/reducers/links";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function Form({ links, setLinks, listPossibiltyLinks }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(listPossibiltyLinks);
  }, []);
  const dispatch = useDispatch();

  const addLink = () => {
    const newLink = {
      link: "",
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

  const onSubmit = (data) => {
    console.log(data);

    dispatch(addLinksToStore(data.links));
  };

  return (
    <form className="flex flex-col gap-10  " onSubmit={handleSubmit(onSubmit)}>
      <button
        type="button"
        onClick={addLink}
        className="mt-8 border border-[#633cff] text-[#633cff] font-semibold px-5 py-3 rounded-lg"
      >
        + Add new link
      </button>
      {links.map((link, index) => (
        <div
          key={index}
          className="p-5 bg-[#fafafa] rounded-lg flex flex-col  "
        >
          <div className="w-full flex justify-between items-center">
            <span className="font-semibold">Link #{index + 1}</span>
            <button onClick={() => handleRemoveLink(index)}>Remove</button>
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <span className="text-sm">Platform</span>

            <select
              className="px-4 py-2  outline outline-[2px] outline-gray-200 rounded-sm focus:outline-2 focus:outline-[#633cff]"
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
            <input
              className="px-4 py-2 outline outline-[2px] outline-gray-200 rounded-sm focus:outline-2 focus:outline-[#633cff]"
              type="text"
              required={true}
              {...register(`links[${index}].link`, {
                pattern: {
                  value: findRegex(link) || "",
                  message: `Veuillez entrer une URL valide pour ${link.name}`,
                },
              })}
            />
            {errors.links && errors.links[index] && (
              <p className="text-xs text-red-700">
                {errors.links[index].link.message}
              </p>
            )}
          </div>
        </div>
      ))}

      {!links.length > 0 && (
        <div className="bg-[#fafafa] p-16 gap-6 flex flex-col justify-center items-center  ">
          <img src="/images/illustration-empty.svg" alt="" />
          <span className="font-bold text-xl">Let's get you started</span>
          <span className="text-gray-600 text-center">
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We’re here to help you
            share your profiles with everyone!
          </span>
        </div>
      )}

      <button
        type="submit"
        onClick={() => handleSubmit()}
        className="bg-[#633cff] rounded-lg text-white px-7 font-semibold py-3 self-end"
      >
        Save
      </button>
    </form>
  );
}
