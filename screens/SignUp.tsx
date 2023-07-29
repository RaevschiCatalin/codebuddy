"use client";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addNewUser } from "../firebase";
import Image from "next/image";
import Link from "next/link";

const SignUp: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [createUserWithEmailAndPassword, user, loading, fbError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error) setError("");

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
      .then((resp) => {
        if (resp?.user) {
            addNewUser(signUpForm.email, signUpForm.username)
          router.replace("/profile");
        }
      })
      .catch((error) => alert(error));
  };

  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen">
    <div className="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-xl">
    <div className="mb-6 flex justify-center">
        <Image src="/assets/logo_removed.png" alt="" width={64} height={64} className="w-24 mt-6" />
      </div>
      <form onSubmit={handleSubmit} className="w-80 flex flex-col rounded-xl justify-center items-center">
        <h1 className="text-3xl font-extrabold text-center text-black my-6">Register</h1>
        <div className="p-4 rounded-lg flex flex-col justify-center">
          <input
            className="mb-5 rounded-lg border p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
            required
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
          />
          <input
            required
            className="mb-5 rounded-lg border p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
            name="username"
            placeholder="Username"
            type="text"
            onChange={handleChange}
          />
          <input
            className="mb-5 rounded-lg border p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
            required
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />
          <input
            className="mb-5 rounded-lg border p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
            required
            name="confirmPassword"
            placeholder="Confirm password"
            type="password"
            onChange={handleChange}
          />
        </div>
        <input type="submit" className="black_btn w-36 mt-4 mb-6 cursor-pointer" />
      </form>
      <div className="mt-5 p-4 flex justify-between text-sm text-gray-600">
        <Link href="/signin">Already have an account? <span className="text-md lilac_gradient px-3">Sign In</span></Link>
      </div>
      {(error || fbError) && <p>{error || fbError?.message}</p>}
    </div>
  </div>
  
  );
};

export default SignUp;


