import Image from "next/image";
import HistorySvg from "../svg/History";
import NewChatSvg from "../svg/NewChat";
import OptionsSvg from "../svg/Options";
import { Search } from "./Search";

import styles from "../../styles/chats/Head.module.css";
import userIcon from "../../public/user-icon.png";

import { useAppContext } from "../../context/AppContext";

export const HeadChats = () => {
  const { state, dispatch } = useAppContext();
  const { user, dataOk, optionActive } = state;

  const handleShowOptions = (option) => {
    if (optionActive === option) {
      dispatch({ type: "change_option_active", value: null });
    } else {
      dispatch({ type: "change_option_active", value: option });
    }
    switch (option) {
      case "options": {
        dispatch({ type: "show_options" });
        break;
      }
      case "newChat": {
        dispatch({ type: "show_newChat" });
        break;
      }
    }
  };

  return (
    <>
      <div className={styles.chats_head}>
        <div
          className={styles.chats_head_photo}
          onClick={() => dispatch({ type: "show_profile" })}
        >
          <Image
            src={(dataOk && user?.user_urlPhoto) || userIcon}
            width={40}
            height={40}
            style={{ borderRadius: 100 }}
          />
        </div>
        <div className={styles.chats_head_options}>
          <span className={styles.chats_head_option}>
            <HistorySvg />
          </span>
          <span
            className={`${styles.chats_head_option} ${
              optionActive === "newChat" && styles.chats_head_option_active
            }`}
            onClick={() => {
              handleShowOptions("newChat");
            }}
          >
            <NewChatSvg />
          </span>
          <span
            onClick={() => {
              handleShowOptions("options");
            }}
            className={`${styles.chats_head_option} ${
              optionActive === "options" && styles.chats_head_option_active
            }`}
          >
            <OptionsSvg />
          </span>
        </div>
      </div>
      <Search placeholder="Busca un chat o inicia uno nuevo" />
    </>
  );
};
