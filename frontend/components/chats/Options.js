import styles from "../../styles/chats/Options.module.css";
import { useAppContext } from "../../context/AppContext";

export const Options = () => {
  const { dispatch } = useAppContext();

  return (
    <div className={styles.options}>
      <ul className={styles.options_list}>
        <li
          onClick={() => {
            dispatch({ type: "modal", value: "AddContact" });
          }}
        >
          Agregar Contacto
        </li>
        <li>Nuevo Grupo</li>
        <li>Archivados</li>
        <li>Mensajes destacados</li>
        <li>Cerrar Sesión</li>
      </ul>
    </div>
  );
};
