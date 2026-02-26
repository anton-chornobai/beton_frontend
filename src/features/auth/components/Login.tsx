import React, { useState } from "react";

export const LoginForm: React.FC = () => {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO: use api
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="">Email</label>
        <input
          value={email}
          onChange={(e) => setEamil(e.target.value)}
          type="email"
          required
        />
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
