import { useAppContext } from "../../context/AppContext";
import { Contact } from "./Contact";

import styles from "../../styles/Home.module.css";


export const ChatsList = () => {
  const { state, dispatch } = useAppContext();
  const {chats} = state;
  return (
    <div className={styles.chatsList}>
      {chats.map((chat) => (
        <Contact contact={chat} />
      ))}
    </div>
  );
};
