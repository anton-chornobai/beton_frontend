import React, { useState } from "react";

import postUser from "../features/auth/api/users";
import { prepareNumber } from "../utils/numberValidation";
import { redirect, useNavigate } from "react-router";

enum AuthMethod {
  NUMBER = "number",
  GMAIL = "gmail",
}

const AuthPopUp = () => {
  const [authMethod, setAuthMethod] = useState(AuthMethod.NUMBER);
  const [number, setNumber] = useState("+38 ");
  const [phoneErrorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();


  function validNumberChar(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;

    if (!value.startsWith("+38 ")) {
      value = "+38 ";
    }

    let digits = value.slice(4).replace(/\D/g, "");

    if (digits.length > 10) {
      digits = digits.slice(0, 10);
    }

    setNumber("+38 " + digits);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const url = import.meta.env.VITE_API_URL + "/auth"

    const preparedNumber = prepareNumber(number);

    if (preparedNumber.length < 12) {
      setErrorMsg("The phone number should contain at least 12 symbols");
      return;
    }

    try {
      const res = await postUser(url, { number: preparedNumber });
      navigate(-1)
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong");
    }

  }

  return (
    <div id="modal">
      <form className="modal__window" onSubmit={handleSubmit}>
        <div className="modal__window-top">
          <h3>Register </h3>
          <button type="button" onClick={() => navigate(-1)}>
            Close
          </button>
        </div>

        <div className="modal_info">
          <label htmlFor="numberInput">Number</label>
          <input
            id="numberInput"
            type="text"
            value={number}
            onChange={validNumberChar}
          />
          {phoneErrorMsg !== "" && (
            <label htmlFor="numberInput">{phoneErrorMsg}</label>
          )}
        </div>
        <p>Other</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AuthPopUp;
