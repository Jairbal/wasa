import Image from "next/image";
import { DateTime } from "luxon";

import styles from "../../styles/messages/index.module.css";
import OptionsSvg from "../svg/Options";
import Search2Svg from "../svg/Search2";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";

export const HeadMessages = () => {
  const { state } = useAppContext();
  const [lastConnection, setLastConnection] = useState("");

  const { contact } = state.chatActive;

  useEffect(() => {
    if (contact.user_lastConnection !== "en línea") {
      const du = DateTime.fromISO(contact.user_lastConnection);
      const now = DateTime.now();
      if (du.day === now.day) {
        const format = du.toFormat("hh:mm a");
        setLastConnection(`últ. vez hoy a la(s)  ${format}`);
      } else if (now.day - du.day === 1) {
        const format = du.toFormat("hh:mm a");
        setLastConnection(`últ. vez ayer a la(s)  ${format}`);
      } else {
        const format = du.setLocale("es").toFormat("dd MMM. hh:mm a");
        setLastConnection(`últ. vez ${format}`);
      }
    } else {
      setLastConnection(contact.user_lastConnection);
    }
  }, [contact.user_lastConnection]);

  return (
    <div className={styles.head}>
      <div className={styles.display}>
        <Image
          src={contact.user_urlPhoto}
          width={40}
          height={40}
          style={{ borderRadius: 100 }}
        />
        <div className={styles.head_info}>
          <h2 className={styles.head_name}>{contact.cont_displayName || contact.user_phone}</h2>
          <p className={styles.head_connection}>{lastConnection}</p>
        </div>
      </div>
      <div>
        <span className={styles.head_options}>
          <Search2Svg />
        </span>
        <span className={styles.head_options}>
          <OptionsSvg />
        </span>
      </div>
    </div>
  );
};
