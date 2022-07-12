import PencilSvg from "../svg/Pencil";
import SmileySvg from "../svg/Smiley";
import CheckSvg from "../svg/Check";
import styles from "../../styles/Profile/index.module.css";
import { useState } from "react";
import dynamic from "next/dynamic";

const DynamicEmojiPicker = dynamic(
  () => import("../emojis/Picker").then((mod) => mod.EmojiPicker),
  {
    ssr: false,
  }
);

export const Input = ({ label, value, onChange, name }) => {
  const [active, setActive] = useState(null);
  const [focus, setFocus] = useState(false);
  const [emoji, setEmoji] = useState(false);

  return (
    <div className={styles.info_username}>
      <p>{label}</p>
      <div
        className={`${styles.info_edit_username} ${
          active === name && styles.info_edit_active
        }`}
      >
        <input
          name={name}
          type="text"
          id={name}
          value={value}
          autoFocus={focus}
          className={styles.info_edit_input}
          onClick={() => setActive(name)}
          onFocus={() => setFocus(name)}
          onBlur={() => setFocus(null)}
          onChange={onChange}
        />
        <div className={styles.info_icons}>
          {active === name ? (
            <>
              <label
                htmlFor={name}
                className={styles.info_icon_smiley}
                onClick={() => setEmoji(!emoji)}
              >
                <SmileySvg />
                {emoji && <DynamicEmojiPicker />}
              </label>
              <span className={styles.info_icon_edit}>
                <CheckSvg />
              </span>
            </>
          ) : (
            <label
              className={styles.info_icon_edit}
              htmlFor={name}
              onClick={() => setActive(name)}
            >
              <PencilSvg />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};
