import React from "react";
import styles from "./AreYouSure.module.scss";

type Props = {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const AreYouSure: React.FC<Props> = ({ text, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.text}>{text}</p>

        <div className={styles.actions}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Так
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            Ні
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSure;
