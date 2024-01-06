import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function LinksForm() {
  const [links, setLinks] = useState([{ name: "", url: "" }]);
  const userReducer = useSelector((state) => state.user.value);

  const isValidURL = (url) => {
    const urlPattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    return urlPattern.test(url);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newLinks = [...links];
    newLinks[index][name] = value;
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    const emptyFields = links.some(
      (link) => link.name === "" || link.url === ""
    );
    const invalidURL = links.some((link) => !isValidURL(link.url));

    if (!emptyFields && !invalidURL) {
      setLinks([...links, { name: "", url: "" }]);
    } else {
      alert(
        "Veuillez remplir les champs existants avant d'ajouter de nouveaux champs."
      );
    }
  };

  const handleRemoveLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const emptyFields = links.some(
      (link) => link.name === "" || link.url === ""
    );
    const invalidURL = links.some((link) => !isValidURL(link.url));

    if (emptyFields) {
      alert(
        "Veuillez remplir tous les champs avant de soumettre le formulaire."
      );
    } else if (invalidURL) {
      alert(
        "Veuillez saisir des URL valides avant de soumettre le formulaire."
      );
    } else {
      axios
        .put(
          `https://linksharing-backend.vercel.app/users/${userReducer.id}/updateLinks`,
          { links: links }
        )
        .then((response) => {
          console.log("Données mises à jour avec succès :", response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour des données :", error);
        });
    }
  };

  return (
    <form className="flex flex-col gap-7 py-20" onSubmit={handleSubmit}>
      <span className="text-xl ">My links</span>
      <div className="flex flex-col gap-3">
        {links.map((link, index) => (
          <div className="flex items-center gap-3" key={index}>
            <div className=" w-1/3 flex flex-col gap-2">
              <span>Link name</span>
              <input
                type="text"
                placeholder="My youtube channel"
                className="input_connexion"
                name="name"
                value={link.name}
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
            <div className=" w-1/3 flex flex-col gap-2">
              <span>Link URL</span>
              <input
                type="text"
                placeholder="https://www.youtube.com"
                className="input_connexion"
                name="url"
                value={link.url}
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
            {index !== 0 && (
              <button type="button" onClick={() => handleRemoveLink(index)}>
                Supprimer
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {links.every((link) => link.name !== "" && link.url !== "") && (
          <button
            className="px-3 md:px-4 py-1 md:py-2  text-bluePurple rounded-md md:rounded-lg  border-2 border-bluePurple duration-150 "
            type="button"
            onClick={handleAddLink}
          >
            Add a link
          </button>
        )}
        <button
          className="px-3 md:px-4 py-1 md:py-2 border-2  rounded-md md:rounded-lg bg-bluePurple text-white duration-150 hover:text-white hover:bg-bluePurple hover:border-white hover:scale-105 "
          type="submit"
        >
          Update my links
        </button>
      </div>
    </form>
  );
}
