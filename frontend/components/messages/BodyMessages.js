import { Message } from "./message";
import { useAppContext } from "../../context/AppContext";
import styles from "../../styles/messages/index.module.css";
import { Attach } from "./Attach";

export const BodyMessages = () => {
  const { state } = useAppContext();
  const { showAttach } = state;
  const { messages } = state.chatActive;
  let anterior = null;
  let actual = null;
  let isFirst = true;

  return (
    <>
      <div className={styles.body_container}>
        <div className={styles.body_messages}>
          {messages.map((message, index) => {
            actual = message.mess_user_id_sent;
            if (actual !== anterior) {
              isFirst = true;
            } else {
              isFirst = false;
            }
            anterior = actual;
            return (
              <Message
                message={message}
                key={message.mess_id}
                isFirst={isFirst}
              />
            );
          })}
        </div>
        {showAttach && <Attach />}
      </div>
    </>
  );
};
