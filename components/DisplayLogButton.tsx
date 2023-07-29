"use client";
import { auth } from "@firebase";
import { onAuthStateChanged } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import Link from "next/link";


function DisplayLogButton() {
  const [isUserLoggedIn, setIsLogged] = useState(!!auth.name);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  });
  return (
    <div>
      {isUserLoggedIn ? (
        <div className="flex gap-3 md:gap-5">
          <Link href="/find-buddy" className="black_btn font-extrabold  h-20 w-72 mt-4">
            <h1 className="text-2xl">
            Find Cool People
            </h1>
          </Link>
        </div>
      ) : (
        <div className="flex gap-3 md:gap-5">
          <Link href="/signup">
          <button className="black_btn h-20 w-72 mt-4">
            <h1 className="text-4xl font-extrabold">Explore</h1>
          </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default DisplayLogButton;
