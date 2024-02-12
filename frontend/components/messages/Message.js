import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { ulrApi } from "../../helpers";
import { useElementObserver } from "../../hooks/useElementObserver";
import styles from "../../styles/messages/index.module.css";
import MsgDoubleCheck from "../svg/MsgDoubleCheck";
import TailOutSvg from "../svg/TailOut";

export const Message = ({ message, isFirst }) => {
  const { state } = useAppContext();
  const { user, socket } = state;
  const [hour, setHour] = useState("");

  const isSent = message.mess_user_id_sent === user.user_id;

  useEffect(() => {
    setHour(DateTime.fromISO(message.mess_hourSend).toFormat("hh:mm a"));
  }, [message]);

  const [messageRef, isVisible] = useElementObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0.75,
  });

  useEffect(() => {
    if (
      isVisible &&
      message.mess_user_id_sent !== user.user_id &&
      !message.mess_viewed
    ) {
      socket.emit("message:viewed", {
        mess_id: message.mess_id,
        mess_chat_id: message.mess_chat_id,
      });
    }
  }, [isVisible, message]);

  return (
    <div
      className={`${styles.message_container} ${isFirst && styles.separation}`}
    >
      {!isSent && isFirst && (
        <span className={styles.message_tailOut_left}>
          <TailOutSvg color="#202c33" />
        </span>
      )}
      <div
        className={`${
          isSent ? styles.message_align_right : styles.message_align_left
        }`}
      >
        <div
          className={`${styles.message_content} ${
            isSent ? styles.message_send : styles.message_received
          } ${
            isSent && isFirst
              ? styles.radius_right
              : !isSent && isFirst
              ? styles.radius_left
              : styles.radius_complete
          }`}
          style={{
            maxWidth: message.mess_isMedia ? 330 : 510,
          }}
          ref={messageRef}
        >
          {message.mess_isMedia && (
            <div className={styles.message_content_media}>
              <img
                className={styles.message_content_media_img}
                src={ulrApi + message.mess_urlMedia}
              />
              {message.mess_message.length === 0 && (
                <div className={styles.message_content_shadow}></div>
              )}
            </div>
          )}
          {message.mess_message.length > 0 && (
            <div className={styles.message_content_container}>
              <p className={styles.message_content_text}>
                {message.mess_message}
              </p>
            </div>
          )}
          <div className={styles.message_content_metadata}>
            <p>{hour}</p>
            {isSent && (
              <span className={styles.message_content_icon}>
                <MsgDoubleCheck
                  color={
                    message.mess_viewed ? "#53bdeb" : "hsla(0,0%,100%,0.6)"
                  }
                />
              </span>
            )}
          </div>
        </div>
      </div>
      {isSent && isFirst && (
        <span className={styles.message_tailOut_right}>
          <TailOutSvg color="#005c4b" />
        </span>
      )}
    </div>
  );
};
