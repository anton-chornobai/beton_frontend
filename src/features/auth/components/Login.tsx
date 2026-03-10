import React, { useState } from "react";
import postUser from "../api/users";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    setEmailError("");
    setPasswordError("");
  
    try {
      const res = await postUser("/login", { email, password });
  
      const data = await res.json();
  
      if (res.status === 403) {
        navigate("/verify", { state: { email } });
        return;
      }
  
      if (res.status === 401) {
        setEmailError(data.error || "Invalid credentials");
        return;
      }
  
      if (!res.ok) {
        setEmailError(data.error || "Login failed");
        return;
      }
  
      // Success
      navigate("/profile");
  
    } catch (err) {
      setEmailError("Network error");
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
