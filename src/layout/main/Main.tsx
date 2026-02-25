import React, { JSX } from "react";

type Props = {
  children: JSX.Element
}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <main className="main">
      <div className="main-container">
        {children}
      </div>
    </main>
  );
}

export default Main;
