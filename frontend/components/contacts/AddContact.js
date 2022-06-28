import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import PhoneInput, {
  isValidPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import { useAppContext } from "../../context/AppContext";
import es from "react-phone-number-input/locale/es";
import SendSvg from "../svg/Send";
import styles from "../../styles/contacts/AddContact.module.css";
import { MessageText } from "../MessageText";
import { ModalStyles } from "../../helpers/ModalStyles";

Modal.setAppElement("#modal");

export const AddContact = () => {
  const { state, dispatch } = useAppContext();
  const { user, system_message } = state;
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState("");
  const [displayName, setDisplayName] = useState("");

  const closeModal = () => {
    setIsOpen(false);
    dispatch({ type: "modal", value: "" });
  };

  const sendData = async () => {
    if (isValidPhoneNumber(value)) {
      const phone = formatPhoneNumberIntl(value);
      try {
        const resp = await axios({
          url: "api/contacts/",
          method: "POST",
          data: {
            contact: {
              phone,
              cont_displayName: displayName,
              cont_owner_user_id: user.user_id,
            },
          },
        });
        dispatch({
          type: "system_message",
          value: {
            type: "success",
            location: "AddContact",
            message: "Contacto agregado correctamente",
          },
        });
        setTimeout(() => {
          dispatch({ type: "modal", value: "" });
          dispatch({
            type: "system_message",
            value: {
              type: null,
              location: null,
              message: null,
            },
          });
        }, 600);

        //dispatch({ type: "load_user", value: resp.data.user });
      } catch (err) {
        if (err.response.data.message === "Unregistered number") {
          dispatch({
            type: "system_message",
            value: {
              type: "error",
              location: "AddContact",
              message: "Este número no se encuentra registrado",
            },
          });
        }
      }
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={ModalStyles}
        contentLabel="Example Modal"
      >
        <h2>Ingresa la información del contacto</h2>
        <div className={styles.container}>
          <input
            type="text"
            placeholder="Nombres"
            className={styles.input}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <div className={styles.addPhone}>
            <PhoneInput
              international
              defaultCountry="EC"
              placeholder="Enter phone number"
              labels={es}
              value={value}
              onChange={setValue}
            />
            <button onClick={sendData} className={styles.addPhone_send}>
              <SendSvg />
            </button>
          </div>
          {system_message.location === "AddContact" && (
            <MessageText
              message={system_message.message}
              type={system_message.type}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};
