import { useState } from "react";
import styles from "../../styles/messages/Footer.module.css";
import SmileySvg from "../svg/Smiley";
import ClipSvg from "../svg/Clip";
import MicrophoneSvg from "../svg/Microphone";
import SendSvg from "../svg/Send";

export const FooterMessages = () => {
  const [message, setSmessage] = useState("");

  return (
    <div className={styles.footer}>
      <span className={styles.footer_message_options}>
        <SmileySvg />
      </span>
      <span className={styles.footer_message_options}>
        <ClipSvg />
      </span>

      <input
        type="text"
        placeholder="Escribe un mensaje aquí"
        className={styles.footer_input}
        value={message}
        onChange={(e) => setSmessage(e.target.value)}
      />
      <span className={styles.footer_message_options}>
        {message.toString().length > 0 ? <SendSvg /> : <MicrophoneSvg />}
      </span>
    </div>
  );
};
