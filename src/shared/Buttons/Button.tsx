import styles from "./Button.module.scss";

type Props = {
  title: string;
};

const Button: React.FC<Props> = ({ title }) => {
  return <button className={styles.custom_button1}>{title}</button>;
};

export default Button;
