import { useState, useRef } from "react";
import styles from "../../styles/chats/Search.module.css";
import SearchSvg from "../svg/Search";
import ArrowSvg from "../svg/Arrow";
import XSvg from "../svg/X";

export const Search = ({focus = false, placeholder}) => {
  const input = useRef(null);
  const [isFocussed, setIsFocussed] = useState(focus);
  const [value, setValue] = useState("");

  const cleanInput = () => {
    setValue("");
    input.current.focus();
  }

  return (
    <div className={styles.search}>
      <button className={styles.search_icon}>
        {!isFocussed && value.length == 0 ? <SearchSvg /> : <ArrowSvg color="#00A884" onClick={() => setValue("")}/>}
      </button>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.search_input}
        autoFocus={isFocussed}
        onFocus={() => setIsFocussed(true)}
        onBlur={() => setIsFocussed(false)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={input}
      />
      <button className={styles.close_icon}>
      {value.length > 0 ? <XSvg onClick={cleanInput}/> : null}
      </button>
    </div>
  );
};
