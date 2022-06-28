import Image from "next/image";

import styles from "../../styles/messages/Head.module.css";
import OptionsSvg from "../svg/Options";
import Search2Svg from "../svg/Search2";
import { useAppContext } from "../../context/AppContext";

export const HeadMessages = () => {
  const { dispatch, state } = useAppContext();
  const { chatActive } = state;
  return (
    <div className={styles.messages_head}>
      <div className={styles.messages_display}>
        <Image
          src={chatActive.user_urlPhoto}
          width={40}
          height={40}
          style={{ borderRadius: 100 }}
        />
        <div className={styles.messages_head_info}>
          <h2 className={styles.messages_head_name}>
            {chatActive.cont_displayName}
          </h2>
          <p className={styles.messages_head_connection}>{chatActive.user_lastConnection}</p>
        </div>
      </div>
      <div>
        <span className={styles.messages_head_options}>
          <Search2Svg />
        </span>
        <span className={styles.messages_head_options}>
          <OptionsSvg />
        </span>
      </div>
    </div>
  );
};
