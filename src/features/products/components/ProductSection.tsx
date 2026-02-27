import React, { ReactElement } from "react";

import { ProductList } from "./ProductList";

type Props = {
  title: string;
  children: ReactElement <typeof ProductList>;
};

export const ProductSection: React.FC<Props> = ({ title, children }) => {
  return (
    <React.Fragment>
      <h2>{title}</h2>
      <section>{children}</section>
    </React.Fragment>
  );
};
