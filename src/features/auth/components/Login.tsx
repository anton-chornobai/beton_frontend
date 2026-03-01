import React, { useState } from "react";
import postUser from "../api/users";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    setEmailError("");
    setPasswordError("");
  
    try {
      await postUser("/login", { email, password });
      navigate("/profile");
    } catch (err: any) {
      setEmailError(err.message || "Login failed");
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
