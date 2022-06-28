import styles from "../styles/Home.module.css";
import axios from "axios";

import contactPhoto from "../public/contact.jpg";
import { HeadChats } from "../components/chats/HeadChats";
import { ChatsList } from "../components/chats/ChatsList";
import { Login } from "../components/login/Login";
import { AddUserPhone } from "../components/login/addUserPhone";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { AddContact } from "../components/contacts/AddContact";
import { Options } from "../components/chats/Options";
import { NewChat } from "../components/newChat";
import { Messages } from "../components/messages";
import { Profile } from "../components/profile";

export default function Home(props) {
  const { state, dispatch } = useAppContext();
  const { user, dataOk, modal, showOptions, optionActive, showNewChat, showProfile } = state;

  useEffect(() => {
    if (props.user !== null) {
      dispatch({ type: "fetch_user", value: props.user });
    }
    dispatch({ type: "dataOk", value: true });
  }, []);

  return (
    <>
      <div
        className={styles.container}
        onClick={() => {
          if (optionActive === "options") {
            dispatch({ type: "close_allOptions" });
          }
        }}
      >
        <div className={styles.chats}>
          <HeadChats />
          <ChatsList />
          {showOptions && <Options />}
          {showNewChat && <NewChat />}
          {showProfile && <Profile />}
        </div>
        <Messages />
      </div>
      <div id="modal"></div>
      {dataOk && !user && <Login />}
      {user && user.user_phone === null && <AddUserPhone />}
      {modal === "AddContact" && <AddContact />}
    </>
  );
}

export async function getServerSideProps(context) {
  const { user_id, ws_fi } = context.req.cookies;

  try {
    const { data } = await axios({
      url: `${process.env.API_URL}/users/${user_id}`,
      headers: { Authorization: `Bearer ${ws_fi}` },
      method: "get",
    });
    return {
      props: data,
    };
  } catch (err) {
    return {
      props: {
        user: null,
      },
    };
  }
}
