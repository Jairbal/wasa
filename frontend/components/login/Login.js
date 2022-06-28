import { useState } from "react";
import Modal from "react-modal";
import GoogleIconSvg from "../svg/GoogleIcon";

const customStyles = {
  overlay: {
    backgroundColor: "#202c33",
    opacity: 0.8,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#111b21",
    color: "#aebac1",
    opacity: 1,
    border: "none",
  },
};

Modal.setAppElement("#modal");

export const Login = () => {
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={false}
      >
        <a
          href="http://localhost:3000/api/auth/login"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Inicia sesión con Google</h2>
          <GoogleIconSvg />
        </a>
      </Modal>
    </div>
  );
};
