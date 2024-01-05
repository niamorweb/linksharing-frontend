import React, { useState } from "react";
import style from "../styles/tarifs.module.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import TableComparaison from "@/components/upgrade/TableComparaison";
import ListOffers from "@/components/upgrade/ListOffers";
import Intro from "@/components/upgrade/Intro";

export default function Upgrade() {
  return (
    <>
      <Head>
        <title>Zoka - Upgrade</title>
      </Head>
      <div className="bg-white min-h-screen">
        <Header />
        <div className="bg-white max-w-[1200px] mx-auto">
          <Intro />
          <ListOffers />
          <TableComparaison />
        </div>

        <Footer />
      </div>{" "}
    </>
  );
}
