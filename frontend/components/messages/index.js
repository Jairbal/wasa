import { HeadMessages } from "./HeadMessages";
import { BodyMessages } from "./BodyMessages";
import { FooterMessages } from "./FooterMessages";
import styles from "../../styles/Home.module.css";
import { useAppContext } from "../../context/AppContext";

export const Messages = () => {
  const { state } = useAppContext();
  const { chatActive } = state;

  return (
    <div className={styles.messages}>
      {chatActive && (
        <>
          <HeadMessages />
          <BodyMessages />
          <FooterMessages />
        </>
      )}
    </div>
  );
};
