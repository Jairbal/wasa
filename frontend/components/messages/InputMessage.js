import { useState } from "react";
import styles from "../../styles/messages/index.module.css";

export const InputMessage = ({placeholder, messageContent, setSmessageContent, handleOnPress}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={styles.footer_input}
      value={messageContent}
      onKeyDown={handleOnPress}
      onChange={(e) => setSmessageContent(e.target.value)}
      autoFocus
    />
  );
};
