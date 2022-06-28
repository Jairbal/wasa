import styles from "../../styles/NewChat/NewChat.module.css";
import { GeneralHead } from "../chats/GeneralHead";
import { ContactsList } from "./ContactsList";
import { useAppContext } from "../../context/AppContext";
import { Search } from "../chats/Search";
import { useEffect } from "react";
import axios from "axios";


export const NewChat = () => {
  const { state, dispatch } = useAppContext();
  const { contacts } = state;

  const back = () => {
    dispatch({ type: "show_newChat" });
    dispatch({ type: "change_option_active", value: null });
  };

  useEffect(() => {
    const fetchContacts = async () => {
      if (contacts.length === 0) {
        const getContacts = await axios({
          url: "api/contacts/",
          method: "GET",
        });

        dispatch({ type: "fetch_contacts", value: getContacts.data.contacts });
      }
    };
    fetchContacts();
  }, []);

  return <div className={styles.newChat}>
    <GeneralHead text="Nuevo Chat" back={back}/>
    <Search focus={true} placeholder="Buscar contactos" />
    <ContactsList/>
  </div>;
};
