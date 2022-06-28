import React from "react";
import { GeneralHead } from "../chats/GeneralHead";
import { useAppContext } from "../../context/AppContext";
import styles from "../../styles/Profile/index.module.css";
import { Info } from "./Info";

export const Profile = () => {
  const { dispatch } = useAppContext();

  const back = () => {
    dispatch({ type: "show_profile" });
  };

  return (
    <div className={styles.profile}>
      <GeneralHead text="Perfil" back={back}/>
      <Info/>
    </div>
  );
};
