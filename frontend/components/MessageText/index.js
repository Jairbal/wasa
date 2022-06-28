import styles from "../../styles/MessageText/MessageText.module.css";

export const MessageText = ({ message, type }) => {
  return (
    <div
      className={
        type === "error"
          ? styles.error
          : type === "success"
          ? styles.success
          : styles.warning
      }
    >
      {message}
    </div>
  );
};
