import { HeadMessages } from "./HeadMessages";
import { BodyMessages } from "./BodyMessages";
import { FooterMessages } from "./FooterMessages";
import styles from "../../styles/Home.module.css";
import { useAppContext } from "../../context/AppContext";
import { BackgroundMessages } from "./BackgroundMessages";
import { useEffect } from "react";
import { PreviewSendImage } from "./PreviewSendImage";

export const Messages = () => {
  const { state, dispatch } = useAppContext();
  const { chatActive, socket, attachImages } = state;

  useEffect(() => {
    if (chatActive) {
      socket.emit("suscribe", chatActive.contact.cont_user_id);

      socket.on(`user_${chatActive.contact.cont_user_id}:online`, (data) => {
        dispatch({
          type: "contact_online",
          value: {
            cont_user_id: data.user_id,
            user_lastConnection: data.user_lastConnection,
          },
        });
      });
      socket.on(`user_${chatActive.contact.cont_user_id}:offline`, (data) => {
        dispatch({
          type: "contact_offline",
          value: {
            cont_user_id: data.user_id,
            user_lastConnection: data.user_lastConnection,
          },
        });
      });
    }
  }, [chatActive]);

  return (
    <div className={styles.messages}>
      {chatActive && (
        <>
          <BackgroundMessages />
          <HeadMessages />
          {attachImages?.images.length > 0 && <PreviewSendImage />}
          <BodyMessages />
          <FooterMessages />
        </>
      )}
    </div>
  );
};
