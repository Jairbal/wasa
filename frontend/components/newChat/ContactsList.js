import { useAppContext } from "../../context/AppContext";
import styles from "../../styles/NewChat/ListContacts.module.css";
import { Contact } from "../chats/Contact";

export const ContactsList = () => {
  const { state } = useAppContext();
  const { contacts } = state;
  return (
    <div className={styles.ListContacts}>
      {contacts.map((contact) => (
        <Contact contact={contact} type="contact" key={contact.cont_id}/>
      ))}
    </div>
  );
};
