import Image from "next/image";
import styles from "../../styles/chats/Contact.module.css";
import { useAppContext } from "../../context/AppContext";

export const Contact = ({ contact, type }) => {
  const { dispatch } = useAppContext();
  return (
    <div
      className={styles.chat}
      onClick={() => {
        dispatch({ type: "set_chatActive", value: contact });
        dispatch({ type: "show_newChat" });
        dispatch({ type: "change_option_active", value: null });
      }}
    >
      <div className={styles.chat_photo}>
        <Image
          src={contact.user_urlPhoto}
          width={49}
          height={49}
          style={{ borderRadius: 100 }}
        />
      </div>
      <div className={styles.chat_body}>
        <div className={styles.chat_body_head}>
          <h2 className={styles.chat_head_name}>{contact.cont_displayName}</h2>
          {type === "chat" && (
            <p className={styles.chat_head_hour}>10:16 p.m.</p>
          )}
        </div>
        <div className={styles.chat_content}>
          {type === "contact" && (
            <p className={styles.contact_state}>{contact.user_state}</p>
          )}
          {type === "chat" && (
            <p className={styles.chat_body_message}>{contact.lastMesagge}</p>
          )}
        </div>
      </div>
    </div>
  );
};
