import React, { useEffect, useState } from "react";
import ProfileDetails from "../components/home/ProfileDetails";
import { addLinksToStore } from "../reducers/links";
import { useDispatch, useSelector } from "react-redux";
import Form from "@/components/home/Form";
import Test from "@/components/home/Test";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import Discover from "@/components/home/Discover";
import { listPossibiltyLinks } from "@/data/listPossibityLinks";

export default function Home() {
  const router = useRouter();

  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user.value);
  const [links, setLinks] = useState([]);

  const [sectionActive, setSectionActive] = useState("mylink");
  const [isConnected, setIsConnected] = useState(false);
  const [linkId, setLinkId] = useState(null);

  useEffect(() => {
    handleFetchExitingLink();
  }, []);

  const handleFetchExitingLink = () => {
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
        if (data.success && data.data[0]) {
          setLinkId(data.data[0]._id);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const adaptColorBgLink = (linkName) => {
    let color = "#24292e";
    listPossibiltyLinks.map((x) => {
      if (linkName === x.name) {
        color = x.color;
      }
    });
    return color;
  };

  useEffect(() => {
    if (!userReducer.id || !userReducer.username) {
      setIsConnected(false);
      router.push("/auth");
    } else {
      setIsConnected(true);
    }
  });

  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-10 flex flex-col gap-6">
      <div className="bg-white p-6 flex justify-between items-center rounded-xl ">
        <span className="font-bold text-xl">devlinks</span>
        <div className="flex">
          <button
            onClick={() => setSectionActive("mylink")}
            style={
              sectionActive === "mylink"
                ? { backgroundColor: "#EFEBFF", color: "#633cff" }
                : null
            }
            className="py-3 px-4 hover:bg-[#EFEBFF] duration-150 rounded-lg border-none font-semibold flex gap-1 items-center"
          >
            <img src="/icons/icon-links-header.svg" alt="" />
            <span>My link page</span>
          </button>
          <button
            onClick={() => setSectionActive("discover")}
            style={
              sectionActive === "discover"
                ? { backgroundColor: "#EFEBFF", color: "#633cff" }
                : null
            }
            className="py-3 hover:bg-[#EFEBFF] duration-150 px-4 rounded-lg border-none font-semibold flex gap-1 items-center"
          >
            <img src="/icons/icon-profile-details-header.svg" alt="" />
            <span>Discover</span>
          </button>{" "}
        </div>

        <button
          disabled={!linkId}
          onClick={() => router.push(`/preview/${linkId}`)}
          className=" border border-[#633cff] text-[#633cff] font-semibold px-5 py-3 rounded-lg"
        >
          Preview
        </button>
      </div>
      {isConnected &&
        (sectionActive === "mylink" ? (
          <Test
            handleFetchExitingLink={handleFetchExitingLink}
            listPossibiltyLinks={listPossibiltyLinks}
            links={links}
            setLinks={setLinks}
            adaptColorBgLink={adaptColorBgLink}
          />
        ) : (
          <Discover adaptColorBgLink={adaptColorBgLink} />
        ))}
    </div>
  );
}
