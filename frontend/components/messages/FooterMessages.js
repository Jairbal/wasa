import { useState } from "react";
import { DateTime } from "luxon";
import styles from "../../styles/messages/index.module.css";
import SmileySvg from "../svg/Smiley";
import ClipSvg from "../svg/Clip";
import MicrophoneSvg from "../svg/Microphone";
import SendSvg from "../svg/Send";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import { InputMessage } from "./InputMessage";

export const FooterMessages = () => {
  const { state, dispatch } = useAppContext();
  const { user, chatActive, socket, chats, optionActive } = state;
  const [messageContent, setMessageContent] = useState([]);

  const handleShowAttach = () => {
    if (optionActive === "attach") {
      dispatch({ type: "change_option_active", value: null });
    } else {
      dispatch({ type: "change_option_active", value: "attach" });
    }
    dispatch({ type: "show_attach" });
  };

  const sendMessage = () => {
    if (messageContent.length > 0) {
      const message = {
        mess_message: messageContent,
        mess_hourSend: DateTime.now().toString(),
        mess_isMedia: false,
        mess_chat_id: chatActive.chat.chat_id,
        mess_user_id_sent: user.user_id,
      };
      socket.emit("message:send", message, async (response) => {
        const existedChat = chats.find(
          (chat) => chat.chat.chat_id == response.message.mess_chat_id
        );
        if (existedChat) {
          dispatch({ type: "set_chatActive", value: existedChat });
          dispatch({ type: "sent_message", value: response.message });
        } else {
          const chat = await axios({
            url: `api/chats/${response.message.mess_chat_id}`,
            method: "GET",
          });
          dispatch({ type: "chat_new", value: chat.data.chat });
          dispatch({ type: "set_chatActive", value: chat.data.chat });
        }
      });
      setMessageContent("");
    }
  };

  const handleOnPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={styles.footer}>
      <span className={styles.footer_message_options}>
        <SmileySvg />
      </span>
      <span
        className={styles.footer_message_options}
        onClick={handleShowAttach}
      >
        <ClipSvg />
      </span>

      <InputMessage
        placeholder="Escribe un mensaje aquí"
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        handleOnPress={handleOnPress}
      />
      <span className={styles.footer_message_options} onClick={sendMessage}>
        {messageContent.toString().length > 0 ? <SendSvg /> : <MicrophoneSvg />}
      </span>
    </div>
  );
};
