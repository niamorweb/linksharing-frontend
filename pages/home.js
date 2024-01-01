import React, { useEffect, useState } from "react";
import ProfileDetails from "../components/home/ProfileDetails";
import { addLinksToStore } from "../reducers/links";
import { useDispatch, useSelector } from "react-redux";
import Form from "@/components/home/Form";
import CreationLink from "@/components/home/CreationLink";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import Discover from "@/components/home/Discover";
import { listPossibiltyLinks } from "@/data/listPossibityLinks";
import Header from "@/components/home/Header";

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
      .catch((error) => {});
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
    <div className="bg-neutral-50 min-h-screen p-4 md:p-10 flex flex-col">
      <Header
        sectionActive={sectionActive}
        setSectionActive={setSectionActive}
        linkId={linkId}
      />
      {isConnected &&
        (sectionActive === "mylink" ? (
          <CreationLink
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
