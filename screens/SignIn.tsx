"use client";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";


const SignIn: React.FC = () => {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const [signInWithEmailAndPassword, user, loading, fbError] =
    useSignInWithEmailAndPassword(auth);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(signInForm.email, signInForm.password)
      .then((resp) => {
        if (resp?.user) {
          router.replace("/profile");
        }
      })
      .catch((error) => alert(error));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-xl">
        <div className="mb-6 flex justify-center">
          <Image src="/assets/logo_removed.png" alt="" width={64} height={64} className="w-24 mt-6" />
        </div>
        <p className="text-3xl font-extrabold text-center text-black  mt-6">Log In</p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center p-24">
          <input
            required
            name="email"
            placeholder="Your email"
            type="email"
            onChange={handleChange}
            className="rounded-lg my-6 border  p-3 hover:outline-none focus:outline-none hover:border-yellow-500 m-2"
          />
          <input
            required
            name="password"
            placeholder="Enter your password"
            type="password"
            onChange={handleChange}
            className="rounded-lg border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 my-6"
          />
          {fbError && <p>{fbError.message}</p>}
          <input
            type="submit"
            className="black_btn my-6 w-24 cursor-pointer"
          />
        </form>
        <Link href="/signup">
          <button className=" justify-end lilac_gradient">
            No account?
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
