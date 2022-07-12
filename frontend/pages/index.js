import { useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useAppContext } from "../context/AppContext";
import { HeadChats } from "../components/chats/HeadChats";
import { ChatsList } from "../components/chats/ChatsList";
import { Login } from "../components/login/Login";
import { AddUserPhone } from "../components/login/addUserPhone";
import { AddContact } from "../components/contacts/AddContact";
import { Options } from "../components/chats/Options";
import { NewChat } from "../components/newChat";
import { Messages } from "../components/messages";
import { Profile } from "../components/profile";
import styles from "../styles/Home.module.css";

export default function Home(props) {
  const { state, dispatch } = useAppContext();
  const {
    user,
    dataOk,
    modal,
    showOptions,
    optionActive,
    showNewChat,
    showProfile,
    chats,
  } = state;

  useEffect(() => {
    if (props.user !== null) {
      dispatch({ type: "fetch_user", value: props.user });
      dispatch({ type: "fetch_chats", value: props.chats });
    }
    dispatch({ type: "dataOk", value: true });
  }, []);

  useEffect(() => {
    if (user !== null) {
      const socket = io("http://localhost:3001", {
        extraHeaders: {
          user_id: user.user_id,
        },
      });
      dispatch({ type: "socket", value: socket });
      socket.emit("online");

      socket.on("message:receive", async (data) => {
        // si es nuevo chat, cargar el chat completo
        const existedChat = chats.find(chat => chat.chat.chat_id === data.message.mess_chat_id);
        if(existedChat) {
          dispatch({ type: "message_receive", value: data.message });
        } else {
          const chat = await axios({
            url: `api/chats/${data.message.mess_chat_id}`,
          method: "GET",
          });
          dispatch({type: "chat_new", value: chat.data.chat})
        }
      });

      socket.on("message:viewed", (data) => {
        console.log("se ha visto el mensaje", data)
        dispatch({
          type: "viewed_message",
          value: data,
        });
      });
    }
  }, [user]);

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
    const user = await axios({
      url: `${process.env.API_URL}/users/${user_id}`,
      headers: { Authorization: `Bearer ${ws_fi}` },
      method: "get",
    });
    const chats = await axios({
      url: `${process.env.API_URL}/chats/${user_id}`,
      headers: { Authorization: `Bearer ${ws_fi}` },
      method: "get",
    });
    return {
      props: {
        user: user.data.user,
        chats: chats.data.chats,
      },
    };
  } catch (err) {
    return {
      props: {
        user: null,
        chats: [],
      },
    };
  }
}
