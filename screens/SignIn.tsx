"use client";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    <div>
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <input
          required
          name="email"
          placeholder="email"
          type="Your email..."
          onChange={handleChange}
        />
        <br />
        <input
          required
          name="password"
          placeholder="password"
          type="Choose a strong password..."
          onChange={handleChange}
        />
        <br />

        {fbError && <p>{fbError.message}</p>}

        <input type="submit" />
      </form>
      <Link href="/signup">
        <button> No account?</button>
      </Link>
    </div>
  );
};

export default SignIn;
