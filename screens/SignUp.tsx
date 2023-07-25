import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useState } from "react";

const SignUp: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [createUserWithEmailAndPassword, user, loading, fbError] = useCreateUserWithEmailAndPassword(auth);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        name="email"
        placeholder="email"
        type="email"
        onChange={handleChange}
      />
      <input
        required
        name="password"
        placeholder="password"
        type="password"
        onChange={handleChange}
      />
      <input
        required
        name="confirmPassword"
        placeholder="Confirm password"
        type="password"
        onChange={handleChange}
      />

      <input type="submit">Sign Up</input>
    </form>
  );
};

export default SignUp;
