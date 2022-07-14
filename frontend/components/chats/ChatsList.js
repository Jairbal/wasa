import { useAppContext } from "../../context/AppContext";
import { Contact } from "./Contact";

import styles from "../../styles/Home.module.css";

export const ChatsList = () => {
  const { state } = useAppContext();
  const { chats } = state;
  if (chats.length === 0) {
    return null;
  }


  return (
    <div className={styles.chatsList}>
      {chats.map((chat) => {
        if (chat.messages.length > 0) {
          const lastMesagge = chat.messages[chat.messages.length-1];
          return <Contact contact={chat.contact} key={chat.chat.chat_id} type="chat" lastMesagge={lastMesagge} notRead={chat.notRead}/>;
        }
      })}
    </div>
  );
};
