import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const userReducer = useSelector((state) => state.user.value);

  return (
    <header className="flex w-full justify-center px-6 md:px-16  relative z-10">
      <div className="w-full flex items-center justify-between py-6">
        <Link href="/" className="text-2xl md:text-4xl font-bold">
          ZOKA
        </Link>
        {userReducer.id ? (
          <div className="flex text-sm md:text-base items-center gap-2 md:gap-6 text-gray font-medium">
            <Link
              className="duration-150 underline-offset-2 hover:underline"
              href="/upgrade"
            >
              Upgrade +
            </Link>
            <Link
              href="/dashboard"
              className="px-3 md:px-4 py-1 md:py-2 border-2  rounded-md md:rounded-lg bg-bluePurple text-white duration-150 hover:text-white hover:bg-bluePurple hover:border-white hover:scale-105 "
            >
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex text-sm md:text-base items-center gap-2 md:gap-6 text-gray font-medium">
            <Link
              className="duration-150 underline-offset-2 hover:underline"
              href="/login"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-3 md:px-4 py-1 md:py-2 border-2  rounded-md md:rounded-lg bg-bluePurple text-white duration-150 hover:text-white hover:bg-bluePurple hover:border-white hover:scale-105 "
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
