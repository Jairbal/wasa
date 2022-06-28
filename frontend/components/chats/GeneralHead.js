import styles from "../../styles/newChat/Head.module.css";
import ArrowSvg from "../svg/Arrow";

export const GeneralHead = ({text, back}) => {

  return (
    <>
      <div className={styles.head_newChat}>
        <div className={styles.head_content}>
          <button className={styles.head_back} onClick={back}>
            <ArrowSvg color="#aebac1" />
          </button>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};
