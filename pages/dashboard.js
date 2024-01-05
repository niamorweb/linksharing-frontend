import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Account from "@/components/profile/Account";
import AddPhotos from "@/components/profile/AddPhotos";
import DashboardSection from "@/components/profile/DashboardSection";
import GalleryPhotos from "@/components/profile/GalleryPhotos";
import PersonnalInformations from "@/components/profile/PersonnalInformations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const router = useRouter();
  const [displayPopupAddPhoto, setDisplayPopupAddPhoto] = useState(false);
  const [sectionSelected, setSectionSelected] = useState("Dashboard");
  const userReducer = useSelector((state) => state.user.value);

  const navItems = ["Dashboard", "My informations", "My photos", "My account"];

  useEffect(() => {
    if (!userReducer.id) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Head>
        <title>My Dashboard</title>
      </Head>
      <div className="min-h-screen bg-white">
        <Header />
        {userReducer.id ? (
          <main className="my-10 md:py-4 min-h-[90%]">
            {displayPopupAddPhoto && (
              <AddPhotos setDisplayPopupAddPhoto={setDisplayPopupAddPhoto} />
            )}
            <div className="mx-auto px-3 md:px-0 flex flex-col md:flex-row gap-10">
              <div className="w-1/6 hidden md:flex md:flex-col items-start text-sm md:text-base mt-8">
                {navItems.map((x) => (
                  <button
                    onClick={() => setSectionSelected(x)}
                    className={`w-full py-4 px-6 lg:px-10 duration-150 rounded-br-full rounded-tr-full text-left ${
                      sectionSelected === x
                        ? "  bg-bluePurple text-white "
                        : " hover:bg-bluePurpleWeakOpacity"
                    } `}
                  >
                    <span>{x}</span>
                  </button>
                ))}
              </div>
              <select
                onChange={(e) => setSectionSelected(e.target.value)}
                className="md:hidden w-full py-3 md:py-4 px-3 text-left bg-bluePurple text-white "
                name=""
                id=""
              >
                {navItems.map((x) => (
                  <option
                    className="w-full py-3 md:py-4 px-3 text-left bg-white text-black "
                    value={x}
                  >
                    {x}
                  </option>
                ))}
              </select>
              {sectionSelected === "My photos" && (
                <GalleryPhotos
                  displayPopupAddPhoto={displayPopupAddPhoto}
                  setDisplayPopupAddPhoto={setDisplayPopupAddPhoto}
                />
              )}

              {sectionSelected === "My informations" && (
                <PersonnalInformations />
              )}

              {sectionSelected === "My account" && <Account />}
              {sectionSelected === "Dashboard" && <DashboardSection />}
            </div>
          </main>
        ) : null}

        <Footer />
      </div>
    </>
  );
}
