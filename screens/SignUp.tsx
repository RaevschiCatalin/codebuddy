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
    <div className="flex justify-center items-center p-24">
  <form
    onSubmit={handleSubmit}
    className="flex flex-col gray_gradient_bg justify-center items-center text-center border-solid rounded-lg p-10 border-2 border-black mt-6 w-1/2"
  >
    <h1 className="text-3xl font-extrabold  text-black my-6">Register</h1>
    <div className="p-4 rounded-lg ">
      <input
        className="form_input w-full mb-4"
        required
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
      />
      <input
        required
        className="form_input mb-4"
        name="username"
        placeholder="Username"
        type="text"
        onChange={handleChange}
      />
      <input
        className="form_input mb-4"
        required
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />
      <input
        className="form_input mb-4"
        required
        name="confirmPassword"
        placeholder="Confirm password"
        type="password"
        onChange={handleChange}
      />
    </div>

    <input type="submit" className="black_btn mt-4" />
  </form>

  {(error || fbError) && <p>{error || fbError?.message}</p>}
</div>

  );
};

export default SignUp;
