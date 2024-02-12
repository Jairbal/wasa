import styles from "../../styles/messages/index.module.css";

export const InputMessage = ({placeholder, messageContent, name, setMessageContent, handleOnPress}) => {
  return (
    <textarea
      type="text"
      placeholder={placeholder}
      className={styles.footer_input}
      value={messageContent}
      name={name}
      onKeyDown={handleOnPress}
      onChange={(e) => {setMessageContent(e.target.value)}}
      autoFocus
    />
  );
};
