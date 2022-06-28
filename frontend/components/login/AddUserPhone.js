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

import styles from "../../styles/AddUserPhone.module.css";
import { MessageText } from "../MessageText";
import { ModalStyles } from "../../helpers/ModalStyles";

Modal.setAppElement("#modal");

export const AddUserPhone = () => {
  const { state, dispatch } = useAppContext();
  const { user, system_message } = state;
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState("");

  const closeModal = () => {
    setIsOpen(false);
  };

  const sendData = async () => {
    if (isValidPhoneNumber(value)) {
      const user_phone = formatPhoneNumberIntl(value);
      try {
        const resp = await axios({
          url: `api/users/${user.user_id}`,
          method: "PUT",
          data: { user: { ...user, user_phone }, user_id: user.user_id },
        });
        dispatch({ type: "load_user", value: resp.data.user });
        dispatch({
          type: "system_message",
          value: {
            type: "success",
            location: "AddUserPhone",
            message: "Número agregado correctamente",
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
      } catch (err) {
        if (err.response.data.message === "Phone duplicated") {
          dispatch({
            type: "system_message",
            value: {
              type: "error",
              location: "AddUserPhone",
              message: "Este número ya está asociado a otra cuenta",
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
        shouldCloseOnOverlayClick={false}
      >
        <h2>Ingresa tú número de telefono</h2>
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
        {system_message.location === "AddUserPhone" && (
          <MessageText
            message={system_message.message}
            type={system_message.type}
          />
        )}
      </Modal>
    </div>
  );
};
