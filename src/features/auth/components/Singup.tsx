import React, { useState } from "react";
import postUser from "../api/users";
import { useNavigate } from "react-router-dom";

export const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await postUser("/signup", {
        email: email,
        password: password,
      });
      
      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.error || "Request failed");
      }

      navigate("/verify", { state: { email } });

      console.log("Success signing up!", res);
    } catch (err: any) {
      console.error("Signup failed:", err.message);
      setEmailErr(err.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) =>  {
            setEmailErr("")
            setEmail(e.target.value)
          }}
          required
        />
        {emailErr && <span>{emailErr}</span>}
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

      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};
