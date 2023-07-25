import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useState } from "react";
import Link from "next/link";

const SignIn: React.FC = () => {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const [signInWithEmailAndPassword, user, loading, fbError] =
    useSignInWithEmailAndPassword(auth);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(signInForm.email, signInForm.password);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          required
          name="email"
          placeholder="email"
          type="Your email..."
          onChange={handleChange}
        />
        <input
          required
          name="password"
          placeholder="password"
          type="Choose a strong password..."
          onChange={handleChange}
        />

        {fbError && <p>fbError.message</p>}

        <input type="submit">Sign In</input>
      </form>
      <Link href="/signup"> No account?</Link>
    </div>
  );
};

export default SignIn;
