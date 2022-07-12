import Image from "next/image";
import { DateTime } from "luxon";
import styles from "../../styles/chats/Contact.module.css";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import { useEffect, useState } from "react";
import MsgDoubleCheck from "../svg/MsgDoubleCheck";

export const Contact = ({ contact, type, lastMesagge, notRead }) => {
  const { dispatch, state } = useAppContext();
  const { chats, user } = state;
  const [hour, setHour] = useState("");
  useEffect(() => {
    if (type === "chat") {
      setHour(DateTime.fromISO(lastMesagge.mess_hourSend).toFormat("hh:mm a"));
    }
  }, [lastMesagge]);

  const handleOnClickChat = async () => {
    const chatExisted = chats.find(
      (c) =>
        c.chat.chat_user_id_1 === contact.cont_user_id ||
        c.chat.chat_user_id_2 === contact.cont_user_id ||
        c.chat.chat_user_id_2 === contact.user_id ||
        c.chat.chat_user_id_1 === contact.user_id
    );
    if (chatExisted) {
      dispatch({ type: "set_chatActive", value: chatExisted });
    } else if (!chatExisted) {
      const chat = await axios({
        url: "api/chats",
        method: "POST",
        data: {
          chat: {
            chat_user_id_1: user.user_id,
            chat_user_id_2: contact.cont_user_id,
          },
        },
      });
      dispatch({ type: "set_chatActive", value: chat.data.chat });
    }

    if (type === "contact") {
      dispatch({ type: "show_newChat" });
      dispatch({ type: "change_option_active", value: null });
    }
  };

  return (
    <div className={styles.chat} onClick={handleOnClickChat}>
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
          <h2 className={styles.chat_head_name}>
            {contact.cont_displayName || contact.user_phone}
          </h2>
          {type === "chat" && (
            <p
              className={`${styles.chat_head_hour} ${
                notRead > 0 ? styles.chat_color_green : styles.chat_color_gray
              }`}
            >
              {hour}
            </p>
          )}
        </div>
        <div className={styles.chat_content}>
          {type === "contact" && (
            <p className={styles.contact_state}>{contact.user_state}</p>
          )}
          {type === "chat" && (
            <>
              <div className={styles.chat_content_message}>
                {lastMesagge.mess_user_id_sent === user.user_id && (
                  <span>
                    <MsgDoubleCheck
                      color={
                        lastMesagge.mess_viewed
                          ? "#53bdeb"
                          : "hsla(0,0%,100%,0.6)"
                      }
                    />
                  </span>
                )}
                <p className={styles.chat_body_message}>
                  {lastMesagge.mess_message}
                </p>
              </div>
              {notRead > 0 && (
                <div className={styles.chat_content_notRead}>
                  <span>{notRead}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
