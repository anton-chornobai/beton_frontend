import React, { useState } from "react";
import postUser from "../api/users";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await postUser("/auth/login");
      const data = await res.json();

      if (!res.ok) {
        setEmailError(data.message || "An error occurred");
        return;
      }
    } catch (error) {
        setEmailError("Network error, please try again");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <label htmlFor="">Email</label>
        <input
          value={email}
          onChange={(e) => {
            setEmailError("");
            setEmail(e.target.value);
          }}
          type="email"
          required
        />
        {emailError && <p className="email-error">{emailError}</p>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
