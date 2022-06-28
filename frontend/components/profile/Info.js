import styles from "../../styles/Profile/index.module.css";
import { useAppContext } from "../../context/AppContext";
import Image from "next/image";
import PencilSvg from "../svg/Pencil";

export const Info = () => {
  const { state } = useAppContext();
  const { user } = state;
  return (
    <div className={styles.info}>
      <div className={styles.info_photo}>
        <Image
          src={user.user_urlPhoto}
          width={200}
          height={200}
          style={{ borderRadius: 100 }}
        />
      </div>
      <div className={styles.info_username}>
        <p>Tu nombre</p>
        <div className={styles.info_edit_username}>
          <p>{user.user_username}</p>
          <span>
            <PencilSvg />
          </span>
        </div>
      </div>
      <div className={styles.info_info}>
        <p>Este no es tu nombre de usuario ni un PIN. Este nombre será visible para tus contactos de wasa</p>
      </div>
      <div className={styles.info_state}>
        <p>Info.</p>
        <div className={styles.info_edit_state}>
          <p>{user.user_state}</p>
          <span>
            <PencilSvg />
          </span>
        </div>
      </div>
    </div>
  );
};
