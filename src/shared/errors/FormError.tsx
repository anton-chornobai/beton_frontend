import React from "react";
import styles from "./FormError.module.scss";

type FormErrorProps = {
  message?: string;
};

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return <span className={styles.error}>{message}</span>;
};

export default FormError;