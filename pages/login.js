import LoginSection from "@/components/auth/LoginSection";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function login() {
  const router = useRouter();
  const userReducer = useSelector((state) => state.user.value);

  useEffect(() => {
    if (userReducer.id) {
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex lg:justify-center lg:items-center">
      {!userReducer.id && <LoginSection />}
    </div>
  );
}
