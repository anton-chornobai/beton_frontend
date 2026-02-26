import React, { useState } from "react";
import { SignupForm } from "./components/Singup";
import { LoginForm } from "./components/Login";
import styles from "./AuthPanes.module.scss";

export const AuthPanel = () => {
  const [authMethod, setAuthMethod] = useState<"signup" | "login">("signup");

  return (
    <div className={styles.wrapper}>
      <div className="panel">
        <div>
          <button type="button" onClick={() => setAuthMethod("signup")}>
            Signup
          </button>
          <button type="button" onClick={() => setAuthMethod("login")}>
            Login
          </button>
        </div>

        {authMethod === "signup" ? <SignupForm /> : <LoginForm />}
      </div>
    </div>
  );
};
