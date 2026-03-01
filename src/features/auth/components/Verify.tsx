import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getVerifyCode from "../api/verify";

const Verify = () => {
  const [code, setCode] = useState("");
  const [codeErr, setCodeErr] = useState("");
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await getVerifyCode("/verify", {
        email,
        code,
      });
      console.log("Verified!");
      navigate("/");
    } catch (err) {
      console.error("Verification failed");
    }
  };

  return (
    <form onSubmit={handleVerify} className="verification">
      <h3 className="verification__title">Верифікація</h3>
      <div>
        Забезпечення вашої безпеки – це те, чим ми займаємося. Ми надіслали
        електронного листа з кодом підтвердження на адресу (не ви?) Введіть його
        нижче, щоб підтвердити свою електронну адресу.
      </div>
      <label>Верифікаційний код:</label>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      {codeErr && <span>{codeErr}</span>}

      <button type="submit">Пітвердити</button>
    </form>
  );
};

export default Verify;
