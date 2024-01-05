import { removeUserFromStore } from "@/reducers/user";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Account() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const userReducer = useSelector((state) => state.user.value);

  const handleLogout = () => {
    dispatch(removeUserFromStore());
    router.push("/");
  };

  const handleFetchUserData = () => {
    axios
      .get(`http://localhost:3000/users/${userReducer.id}`)
      .then((response) => {
        if (response.data.result === true) {
          setUsername(response.data.data.username);
          setEmail(response.data.data.email);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour des données :", error);
      });
  };

  useEffect(() => {
    handleFetchUserData();
  }, []);

  return (
    <div className="w-full h-fit bg-neutral-50 shadow-md flex flex-col gap-8 py-10 px-8 rounded-lg mr-10">
      <span className="text-3xl text-darkPurple font-bold ">My account</span>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-8 md:w-2/4">
          <div className="flex flex-col gap-2">
            <span className="text-xl text-darkPurple">Username</span>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="input_connexion"
              type="text"
              placeholder="cr7_13"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl text-darkPurple">Email</span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              minLength={1}
              className="input_connexion"
              type="email"
              placeholder="Email@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl text-darkPurple">Password</span>
            <input
              onChange={(e) => setPw(e.target.value)}
              value={pw}
              className="input_connexion"
              type="password"
            />
          </div>
          <button className="text-lg md:text-xl font-bold text-white bg-bluePurple px-8 py-3 md:px-10 md:py-5 rounded-xl">
            Update
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <button
            onClick={() => handleLogout()}
            className="rounded-lg text-lg  text-bluePurple px-14 font-semibold py-4 self-start duration-150 hover:scale-[101%] border-2 border-bluePurple"
          >
            Logout
          </button>
          <button className="text-red-500 text-left px-6 py-3 text-lg ">
            Delete my account
          </button>
        </div>
      </div>
    </div>
  );
}
