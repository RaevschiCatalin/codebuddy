"use client";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addNewUser } from "../firebase";

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
    <div>
      <p>Register</p>
      <form onSubmit={handleSubmit}>
        <input
          required
          name="email"
          placeholder="email"
          type="email"
          onChange={handleChange}
        />
        <br />
        <input
          required
          name="username"
          placeholder="username"
          type="text"
          onChange={handleChange}
        />
        <br />
        <input
          required
          name="password"
          placeholder="password"
          type="password"
          onChange={handleChange}
        />
        <br />
        <input
          required
          name="confirmPassword"
          placeholder="Confirm password"
          type="password"
          onChange={handleChange}
        />
        <br />

        <input type="submit" />
      </form>

      {(error || fbError) && <p>{error || fbError?.message}</p>}
    </div>
  );
};

export default SignUp;
