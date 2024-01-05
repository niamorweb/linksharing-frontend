import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="px-6 md:px-10 flex justify-center bg-neutral-100 ">
      <div className="w-full py-10 flex flex-col lg:flex-row gap-8 justify-between lg:items-center ">
        <div className="flex text-lg items-center gap-8 font-medium text-gray">
          <Link
            className="hover:underline underline-offset-2 duration-150"
            href="/"
          >
            Home
          </Link>
          <Link
            className="hover:underline underline-offset-2 duration-150"
            href="/about"
          >
            About
          </Link>
          <Link
            className="hover:underline underline-offset-2 duration-150"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
        </div>
        <span className=" text-base lg:text-lg font-medium">
          ZOKA © 2023 - Created by niamorweb
        </span>
      </div>{" "}
    </footer>
  );
}
