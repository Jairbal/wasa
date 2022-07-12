import Image from "next/image";
import { useAppContext } from "../../context/AppContext";
import styles from "../../styles/Profile/index.module.css";
import { Input } from "./Input";


export const Info = () => {
  const { state } = useAppContext();
  const { user } = state;

  const handleChange = () => {};

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
      <Input
        label="Tu nombre"
        name="username"
        value={user.user_username}
        onChange={handleChange}
      />
      <div className={styles.info_info}>
        <p>
          Este no es tu nombre de usuario ni un PIN. Este nombre será visible
          para tus contactos de wasa
        </p>
      </div>
      <Input
        label="Info."
        name="stt"
        value={user.user_state}
        onChange={handleChange}
      />
    </div>
  );
};
