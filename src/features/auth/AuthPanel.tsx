import React, { useState } from "react";
import { SignupForm } from "./components/Singup";
import { LoginForm } from "./components/Login";
import styles from "./AuthPanel.module.scss";
import { useNavigate } from "react-router-dom";

export const AuthPanel = () => {
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState<"signup" | "login">("signup");

  const selectSignupMethod = () => {
    navigate("/auth/signup");
    setAuthMethod("signup");
  };

  const selectLoginMethod = () => {
    navigate("/auth/login");
    setAuthMethod("login");
  };

  return (
    <div className={styles.wrapper}>
      <div className="panel">
        <div className="buttons-wrapper">
          <button type="button" onClick={selectSignupMethod}>
            Signup
          </button>
          <button type="button" onClick={selectLoginMethod}>
            Login
          </button>
        </div>

        {authMethod === "signup" ? <SignupForm /> : <LoginForm />}
      </div>
    </div>
  );
};
